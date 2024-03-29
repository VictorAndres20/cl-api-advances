import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Advance } from 'src/api/advance/entity/advance.entity'

@Entity({name:'advance_state'})
export class AdvanceState{

    @PrimaryColumn()
    cod: string;

    @Column()
    name: string;

    @OneToMany(() => Advance, e => e.state)
    advances: Advance[];

}

/** Generated by https://github.com/VictorAndres20 code generator for database, NestJS, React */