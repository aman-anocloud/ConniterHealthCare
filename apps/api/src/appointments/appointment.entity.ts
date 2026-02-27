import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/user.entity';
import { Hospital } from '../hospitals/hospital.entity';
import { Slot, SlotType } from '../hospitals/slot.entity';

export enum AppointmentStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
}

@Entity('appointments')
export class Appointment {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty() id: string;

    @ManyToOne(() => User, { eager: true })
    @ApiProperty() user: User;

    @ManyToOne(() => Hospital, { eager: true })
    @ApiProperty() hospital: Hospital;

    @ManyToOne(() => Slot, { eager: true })
    @ApiProperty() slot: Slot;

    @Column({ type: 'enum', enum: SlotType })
    @ApiProperty() type: SlotType;

    @Column({ type: 'enum', enum: AppointmentStatus, default: AppointmentStatus.PENDING })
    @ApiProperty() status: AppointmentStatus;

    @Column({ nullable: true })
    @ApiProperty() notes: string;

    @CreateDateColumn()
    @ApiProperty() createdAt: Date;
}
