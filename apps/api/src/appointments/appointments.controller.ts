import { Controller, Post, Get, Delete, Body, Param, Request, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AppointmentsService } from './appointments.service';
import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt.guard';

export class CreateAppointmentDto {
    @ApiProperty() @IsString() slotId: string;
    @ApiProperty({ required: false }) @IsOptional() @IsString() notes?: string;
}

@ApiTags('Appointments')
@Controller('appointments')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AppointmentsController {
    constructor(private readonly apptService: AppointmentsService) { }

    @Post()
    @ApiOperation({ summary: 'Book a slot (VMS visit or DMS delivery)' })
    create(@Request() req, @Body() dto: CreateAppointmentDto) {
        return this.apptService.create(req.user.sub, dto.slotId, dto.notes);
    }

    @Get('my')
    @ApiOperation({ summary: 'Get all appointments for the current user' })
    findMy(@Request() req) {
        return this.apptService.findByUser(req.user.sub);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Cancel an appointment' })
    cancel(@Param('id') id: string, @Request() req) {
        return this.apptService.cancel(id, req.user.sub);
    }
}
