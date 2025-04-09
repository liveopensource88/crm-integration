// src/companies/companies.service.ts
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Company } from './../../entities/company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { User } from 'src/entities/user.entity';
import { Messages } from '../../constants/messages';
import { instanceToPlain } from 'class-transformer';
import { ApiResponse } from '../../type';
@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<ApiResponse<Partial<Company>>> {
    // Check if the admin email already exists
    const existingUser = await this.userRepository.findOne({
      where: { email: createCompanyDto.primaryContactEmail }
    });
    if (existingUser) {
      throw new ConflictException(`${Messages.EMAIL_EXISTS}`);
    }

    // Step 1: Create the company
    const company = this.companyRepository.create(createCompanyDto);
    const savedCompany = await this.companyRepository.save(company);
    // Step 2: Create the admin user
    const hashedPassword = await bcrypt.hash(createCompanyDto.password, 10);

    const adminUser = this.userRepository.create({
      name: createCompanyDto.primaryContactName,
      email: createCompanyDto.primaryContactEmail,
      passwordHash: hashedPassword,
      role: 'Admin',
      company: savedCompany
    });

    await this.userRepository.save(adminUser);
    return {
      message: `${Messages.COMPANY.CREATED}`,
      data: instanceToPlain(savedCompany)
    };
  }
  async findAll(): Promise<ApiResponse<Partial<Company>>> {
    const companies = await this.companyRepository.find();
    return {
      message: `${Messages.COMPANY.All}`,
      data: companies.map(company => instanceToPlain(company))
    };
  }

  async findOne(company_uuid: string): Promise<Company> {
    const company = await this.companyRepository.findOne({ where: { companyUUid: company_uuid } });
    if (!company) {
      throw new NotFoundException(`${Messages.COMPANY.NOT_FOUND}`);
    }
    return company;
  }

  async update(
    company_uuid: string,
    updateCompanyDto: Partial<CreateCompanyDto>
  ): Promise<ApiResponse<Partial<Company>>> {
    const company = await this.findOne(company_uuid);
    if (!company) {
      throw new NotFoundException(`${Messages.COMPANY.NOT_FOUND}`);
    }
    Object.assign(company, updateCompanyDto);
    const updatedCompany = await this.companyRepository.save(company);
    return {
      message: `${Messages.COMPANY.UPDATED}`,
      data: instanceToPlain(updatedCompany)
    };
  }
}
