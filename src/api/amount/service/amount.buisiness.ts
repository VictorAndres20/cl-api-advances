import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Amount } from '../entity/amount.entity';
import { AmountService } from './amount.service';

@Injectable()
export class AmountBusiness extends AmountService{

    constructor(
        @InjectRepository(Amount)
        protected repo: Repository<Amount>,
    ) {super(repo);}

    async findAllByEmployee(employee: string): Promise<Amount[]>{
        //return this.findMany({ where: { ranges: { range: { employees: { uuid: employee } } } } });
        return this.repo.createQueryBuilder('a')
        .innerJoinAndSelect('a.range', 'r')
        .innerJoin('r.employees', 'e')
        .where('e.uuid = :employee', { employee })
        .orderBy('a.value', 'ASC')
        .getMany();
    }

    async findAllByEnterprise(enterprise: number): Promise<Amount[]> {
        return this.repo.createQueryBuilder('a')
        .innerJoinAndSelect('a.range', 'r')
        .innerJoin('r.enterprise', 'e')
        .where('e.id = :enterprise', { enterprise })
        .orderBy('a.value', 'ASC')
        .getMany();
    }
}

/** Generated by https://github.com/VictorAndres20 code generator for database, NestJS, React */