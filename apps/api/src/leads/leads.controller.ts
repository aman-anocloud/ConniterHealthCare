import { Controller, Post, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { LeadsService } from './leads.service';

@ApiTags('Leads')
@Controller('leads')
export class LeadsController {
    constructor(private readonly leadsService: LeadsService) { }

    @Post()
    @ApiOperation({ summary: 'Submit a lead enquiry from the landing page' })
    create(@Body() body: any) { return this.leadsService.create(body); }

    @Get()
    @ApiOperation({ summary: 'List all leads (Admin)' })
    findAll() { return this.leadsService.findAll(); }
}
