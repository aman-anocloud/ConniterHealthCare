import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hospital } from './hospital.entity';
import { Slot } from './slot.entity';

@Injectable()
export class HospitalsService {
    constructor(
        @InjectRepository(Hospital) private readonly hospitalsRepo: Repository<Hospital>,
        @InjectRepository(Slot) private readonly slotsRepo: Repository<Slot>,
    ) { }

    findAll(city?: string) {
        if (city) return this.hospitalsRepo.find({ where: { city } });
        return this.hospitalsRepo.find();
    }

    findOne(id: string) {
        return this.hospitalsRepo.findOne({ where: { id } });
    }

    getSlotsForHospital(hospitalId: string, date?: string, type?: string) {
        const qb = this.slotsRepo.createQueryBuilder('slot')
            .leftJoinAndSelect('slot.hospital', 'hospital')
            .where('hospital.id = :hospitalId', { hospitalId });
        if (date) qb.andWhere('slot.date = :date', { date });
        if (type) qb.andWhere('slot.type = :type', { type });
        return qb.getMany();
    }
}
