import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './../entities/company.entity';
import { User } from './../entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST || 'localhost',
      port: parseInt(process.env.MYSQL_PORT, 10) || 3306,
      username: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || '',
      database: process.env.MYSQL_DATABASE || 'contact_center_app',
      entities: [Company, User],
      synchronize: true // DO NOT USE IN PRODUCTION
    }),
    TypeOrmModule.forFeature([Company, User])
  ],
  exports: [TypeOrmModule]
})
export class DbModule {}
