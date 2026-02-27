import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('hospitals')
export class Hospital {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty() id: string;

    @Column()
    @ApiProperty() name: string;

    @Column()
    @ApiProperty() city: string;

    @Column({ nullable: true })
    @ApiProperty() address: string;

    @Column({ nullable: true })
    @ApiProperty() logoUrl: string;

    @Column('simple-array', { nullable: true })
    @ApiProperty() departments: string[];

    @Column({ type: 'float', default: 4.5 })
    @ApiProperty() rating: number;

    @Column({ nullable: true })
    @ApiProperty() beds: number;

    @Column({ nullable: true })
    @ApiProperty() founded: number;

    @Column({ default: 'Partner' })
    @ApiProperty() tier: string;

    @CreateDateColumn()
    @ApiProperty() createdAt: Date;
}
