import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Hospital } from '../hospitals/hospital.entity';

export enum SlotType { VMS = 'VMS', DMS = 'DMS' }
export enum SlotStatus { AVAILABLE = 'AVAILABLE', BOOKED = 'BOOKED', CANCELLED = 'CANCELLED' }

@Entity('slots')
export class Slot {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty() id: string;

    @ManyToOne(() => Hospital, { eager: true })
    @ApiProperty() hospital: Hospital;

    @Column()
    @ApiProperty() date: string;

    @Column()
    @ApiProperty() startTime: string;

    @Column()
    @ApiProperty() endTime: string;

    @Column({ type: 'enum', enum: SlotType })
    @ApiProperty() type: SlotType;

    @Column({ type: 'enum', enum: SlotStatus, default: SlotStatus.AVAILABLE })
    @ApiProperty() status: SlotStatus;

    @Column({ nullable: true })
    @ApiProperty() department: string;
}
