import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from './lead.entity';

@Injectable()
export class LeadsService {
    constructor(@InjectRepository(Lead) private readonly repo: Repository<Lead>) { }
    create(data: Partial<Lead>) { return this.repo.save(this.repo.create(data)); }
    findAll() { return this.repo.find({ order: { createdAt: 'DESC' } }); }
}
