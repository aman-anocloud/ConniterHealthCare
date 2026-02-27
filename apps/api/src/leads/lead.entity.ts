import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('leads')
export class Lead {
    @PrimaryGeneratedColumn('uuid') id: string;
    @Column() segment: string;
    @Column() name: string;
    @Column() phone: string;
    @Column({ nullable: true }) email: string;
    @Column() org: string;
    @Column() city: string;
    @Column({ nullable: true, type: 'text' }) message: string;
    @CreateDateColumn() createdAt: Date;
}
