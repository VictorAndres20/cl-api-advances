import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { Advance } from '../entity/advance.entity';
import { AdvanceService } from './advance.service';
import { AdvanceState } from 'src/api/advance_state/entity/advance_state.entity';
import { EmployeeService } from 'src/api/employee/service/employee.service';
import { deleteInternalFile, getRandomFileName, readBase64InternalFile } from 'src/_utils/files.util';
import { buildPDFAdvanceDoc } from 'src/_utils/pdf.util';
import * as path from 'path';
import { Employee } from 'src/api/employee/entity/employee.entity';
import { AdvanceDTO } from '../entity/advance.dto';
import { buildISODate } from 'src/_utils/date_format.util';

export interface AdvanceLimitInfo {
    total: number, 
    limit: number
};

@Injectable()
export class AdvanceBusiness extends AdvanceService{

    constructor(
        @InjectRepository(Advance)
        protected repo: Repository<Advance>,
        protected employeeService: EmployeeService,
    ) {super(repo, employeeService);}

    async findAllByEmployeePaged(page: number = 0, limit: number = 4, employee: string): Promise<[Advance[], number]> {
        return await this.repo.findAndCount({ 
            where: { employee: { uuid: employee } }, 
            order: { created_date: 'DESC' }, 
            skip: page * limit, take: limit
        });
    }

    async findAllByEnterprise(enterprise: number): Promise<Advance[]> {
        return await this.findMany({ 
            where: { employee: { range: { enterprise: { id: enterprise } } } }, 
            order: { created_date: 'DESC' }, 
            relations: { employee: { range: true } }
        });
    }

    async findAllPending(): Promise<Advance[]> {
        return await this.findMany({ 
            where: { state: { cod: 'PEND' } }, 
            order: { created_date: 'DESC' }, 
            relations: { employee: { range: true } }
        });
    }

    async findAllByEnterprisePending(enterprise: number): Promise<Advance[]> {
        return await this.findMany({ 
            where: { state: { cod: 'PEND' }, employee: { range: { enterprise: { id: enterprise } } } }, 
            order: { created_date: 'DESC' }, 
            relations: { employee: { range: true } }
        });
    }

    async create(dto: AdvanceDTO): Promise<Advance> {
        if(!dto.employee) throw new Error('No employee to create advance');

        const limit = await this.getEmloyeeAdvanceLimitValue(dto.employee);

        if(Number(dto.value) > limit) throw new Error('El valor del anticipo supera el límite establecido');

        return await this.createOne(dto);
    }

    async approve(uuid: string): Promise<Advance> {
        return await this.changeState(uuid, 'APPR');
    }

    async decline(uuid: string): Promise<Advance> {
        return await this.changeState(uuid, 'DECL');
    }

    async changeState(uuid: string, stateCod: string): Promise<Advance> {
        let entity = await this.findById(uuid);
        if(entity == null) throw new Error('Entity not found for edition');
        if(stateCod === 'APPR') entity.approved_date = new Date();
        if(stateCod === 'DECL') entity.declined_date = new Date();
        let state = new AdvanceState();
        state.cod = stateCod;
        entity.state = state;
        return await this.repo.save(entity);
    }

    async buildAdvancePdfById(uuid: string): Promise<string> {
        const advance = await this.findById(uuid);
        const file_path = __dirname;
        const file_name = getRandomFileName();
        await buildPDFAdvanceDoc(path.join(file_path, file_name), advance);
        const bytes = readBase64InternalFile(file_path, file_name);
        deleteInternalFile(file_path, file_name);
        return bytes;
    }

    async getEmployeeAdvanceLimitInfo(employeeId: string): Promise<AdvanceLimitInfo> {
        const employee = await this.repo.manager.getRepository(Employee)
            .createQueryBuilder('employee')
            .innerJoinAndSelect('employee.range', 'range')
            .innerJoinAndSelect('range.enterprise', 'enterprise')
            .where('employee.uuid = :employeeId', {employeeId})
            .getOne();
        
        if(!employee) throw new Error('Employee not found for advance limit info');
        if(!employee.range?.enterprise) throw new Error('Enterprise not found for advance limit info');

        const dateLimit = employee.range?.enterprise?.date_limit;

        if(!dateLimit) throw new Error('Date limit not found for advance limit info');

        /*
        select SUM(advance.value) from ks.advance advance
        inner join ks.advance_period period on period."uuid" = advance."period" 
        inner join ks.employee employee on employee."uuid" = advance.employee 
        inner join ks."range" r on r."uuid" = employee."range" 
        inner join ks.enterprise enterprise on enterprise.id = r.enterprise 
        where advance.declined_date is null
        and (period.finished_date is null or advance.created_date > '2024-10-30 22:00:00.000')
        and enterprise.id = 1
        and employee.id = '0987';

        select * from ks.advance advance
        inner join ks.advance_period period on period."uuid" = advance."period" 
        inner join ks.employee employee on employee."uuid" = advance.employee 
        inner join ks."range" r on r."uuid" = employee."range" 
        inner join ks.enterprise enterprise on enterprise.id = r.enterprise 
        where advance.declined_date is null
        and (period.finished_date is null or advance.created_date > (select e.date_limit from ks.enterprise e where e.id = 1))
        and enterprise.id = 1
        and employee.id = '0987';
        */

        const totalAdvanced = await this.repo
        .createQueryBuilder('advance')
        .select('SUM(advance.value)', 'sum')
        .innerJoin('advance.period', 'period')
        .innerJoin('advance.employee', 'employee')
        .where('advance.declined_date IS NULL')
        .andWhere('employee.uuid = :employeeId', { employeeId })
        .andWhere(
          new Brackets(qb => {
            qb.where('period.finished_date IS NULL')
              .orWhere('advance.created_date >= :createdDate', {
                createdDate: buildISODate(dateLimit),
              });
          }),
        )
        .getRawOne();
            
        if(!totalAdvanced) throw new Error('Total advanced not found for advance limit info')

        return {
            total: totalAdvanced.sum ?? 0,
            limit: employee.range.money_limit
        }
    }

    async getEmloyeeAdvanceLimitValue(employeeId: string): Promise<number> {
        const {total, limit} = await this.getEmployeeAdvanceLimitInfo(employeeId);

        // Look that we are saying in general 5000000 in the top limit
        return limit === -1 ? 5000000 : limit - total;
    }

}

/** Generated by https://github.com/VictorAndres20 code generator for database, NestJS, React */