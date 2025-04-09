import { IsString, IsEmail, IsOptional, Length, IsIn } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @Length(3, 255)
  companyName: string;

  @IsOptional()
  @IsString()
  address?: string;

  // Primary Contact Details
  @IsString()
  @Length(3, 255)
  primaryContactName: string;

  @IsEmail()
  primaryContactEmail: string;

  @IsString()
  @Length(6, 20)
  password: string;

  @IsOptional()
  @IsString()
  @Length(10, 15)
  primaryContactPhone?: string;

  // Billing Details
  @IsOptional()
  @IsString()
  @Length(3, 255)
  billingContactName?: string;

  @IsOptional()
  @IsEmail()
  billingContactEmail?: string;

  @IsOptional()
  @IsString()
  @Length(10, 15)
  billingContactPhone?: string;

  @IsOptional()
  @IsIn(['Active', 'Inactive'])
  status?: 'Active' | 'Inactive';
}
