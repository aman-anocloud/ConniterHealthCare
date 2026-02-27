import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hospital } from './hospital.entity';
import { Slot } from './slot.entity';
import { HospitalsController } from './hospitals.controller';
import { HospitalsService } from './hospitals.service';

@Module({
    imports: [TypeOrmModule.forFeature([Hospital, Slot])],
    controllers: [HospitalsController],
    providers: [HospitalsService],
    exports: [HospitalsService],
})
export class HospitalsModule { }
