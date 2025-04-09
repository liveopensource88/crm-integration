import { Controller, Post, Get, Patch, Param, Body } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company } from '../../entities/company.entity';
import { ApiResponse } from '../../type';
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  async create(@Body() createCompanyDto: CreateCompanyDto): Promise<ApiResponse<Partial<Company>>> {
    return this.companiesService.create(createCompanyDto);
  }

  @Get()
  async findAll(): Promise<ApiResponse<Partial<Company>>> {
    return this.companiesService.findAll();
  }

  @Patch(':company_uuid')
  async update(
    @Param('company_uuid') company_uuid: string,
    @Body() updateCompanyDto: Partial<CreateCompanyDto>
  ): Promise<ApiResponse<Partial<Company>>> {
    return this.companiesService.update(company_uuid, updateCompanyDto);
  }
}
