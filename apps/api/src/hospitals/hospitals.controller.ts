import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { HospitalsService } from './hospitals.service';

@ApiTags('Hospitals')
@Controller('hospitals')
export class HospitalsController {
    constructor(private readonly hospitalsService: HospitalsService) { }

    @Get()
    @ApiOperation({ summary: 'List all hospitals, optionally filtered by city' })
    @ApiQuery({ name: 'city', required: false })
    findAll(@Query('city') city?: string) {
        return this.hospitalsService.findAll(city);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get hospital profile by ID' })
    findOne(@Param('id') id: string) {
        return this.hospitalsService.findOne(id);
    }

    @Get(':id/slots')
    @ApiOperation({ summary: 'Get available slots for a hospital (VMS + DMS)' })
    @ApiQuery({ name: 'date', required: false })
    @ApiQuery({ name: 'type', required: false, enum: ['VMS', 'DMS'] })
    getSlots(
        @Param('id') id: string,
        @Query('date') date?: string,
        @Query('type') type?: string,
    ) {
        return this.hospitalsService.getSlotsForHospital(id, date, type);
    }
}
