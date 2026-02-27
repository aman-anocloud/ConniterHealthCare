import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum UserRole {
    INDIVIDUAL = 'INDIVIDUAL',
    ORGANISATION = 'ORGANISATION',
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty() id: string;

    @Column({ unique: true })
    @ApiProperty() phone: string;

    @Column({ nullable: true })
    @ApiProperty() name: string;

    @Column({ nullable: true })
    @ApiProperty() email: string;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.INDIVIDUAL })
    @ApiProperty() role: UserRole;

    @Column({ nullable: true })
    @ApiProperty() orgName: string;

    @Column({ nullable: true })
    @ApiProperty() city: string;

    @CreateDateColumn()
    @ApiProperty() createdAt: Date;
}
