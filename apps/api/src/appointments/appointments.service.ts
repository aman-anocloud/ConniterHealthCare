import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';
import { Slot, SlotStatus } from '../hospitals/slot.entity';

@Injectable()
export class AppointmentsService {
    constructor(
        @InjectRepository(Appointment) private readonly apptRepo: Repository<Appointment>,
        @InjectRepository(Slot) private readonly slotRepo: Repository<Slot>,
    ) { }

    async create(userId: string, slotId: string, notes?: string) {
        const slot = await this.slotRepo.findOne({ where: { id: slotId } });
        if (!slot) throw new NotFoundException('Slot not found');
        if (slot.status !== SlotStatus.AVAILABLE) throw new BadRequestException('Slot is no longer available');

        slot.status = SlotStatus.BOOKED;
        await this.slotRepo.save(slot);

        const appt = this.apptRepo.create({
            user: { id: userId } as any,
            hospital: slot.hospital,
            slot,
            type: slot.type,
            notes,
        });
        return this.apptRepo.save(appt);
    }

    findByUser(userId: string) {
        return this.apptRepo.find({ where: { user: { id: userId } }, order: { createdAt: 'DESC' } });
    }

    async cancel(apptId: string, userId: string) {
        const appt = await this.apptRepo.findOne({ where: { id: apptId, user: { id: userId } } });
        if (!appt) throw new NotFoundException('Appointment not found');
        appt.status = 'CANCELLED' as any;
        // Free the slot
        await this.slotRepo.update(appt.slot.id, { status: SlotStatus.AVAILABLE });
        return this.apptRepo.save(appt);
    }
}
