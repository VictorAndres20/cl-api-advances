import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdvancePeriod } from './entity/advance_period.entity';
import { AdvancePeriodService } from './service/advance_period.service';
import { AdvancePeriodController } from './controller/advance_period.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([AdvancePeriod]),
    ],
    controllers: [
        AdvancePeriodController,
    ],
    providers: [
        AdvancePeriodService
    ],
    exports: [
        AdvancePeriodService
    ],
})
export class AdvancePeriodModule{}

/** Generated by https://github.com/VictorAndres20 code generator for database, NestJS, React */