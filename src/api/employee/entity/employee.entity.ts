import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Range } from 'src/api/range/entity/range.entity'
import { Advance } from 'src/api/advance/entity/advance.entity'

@Entity({name:'employee'})
export class Employee{

    @PrimaryGeneratedColumn()
    uuid: string;

    @Column()
    name: string;

    @Column()
    id: string;

    @Column()
    phone: string;

    @Column()
    salary: Number;

    @Column()
    password: string;

    @Column()
    state: Number;

    @ManyToOne(() => Range, e => e.employees, {
        onDelete: "CASCADE",
        eager: true,
    })
    @JoinColumn({ name: "range" })
    range: Range;

    @OneToMany(() => Advance, e => e.employee)
    advances: Advance[];

}

/** Generated by https://github.com/VictorAndres20 code generator for database, NestJS, React */