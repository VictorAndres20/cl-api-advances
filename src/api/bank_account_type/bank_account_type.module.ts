import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankAccountType } from './entity/bank_account_type.entity';
import { BankAccountTypeService } from './service/bank_account_type.service';
import { BankAccountTypeController } from './controller/bank_account_type.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([BankAccountType]),
    ],
    controllers: [
        BankAccountTypeController,
    ],
    providers: [
        BankAccountTypeService,
    ],
    exports: [
        BankAccountTypeService,
    ],
})
export class BankAccountTypeModule{}

/** Generated by https://github.com/VictorAndres20 code generator for database, NestJS, React */