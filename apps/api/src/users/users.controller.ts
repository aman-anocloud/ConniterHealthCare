import { Controller, Get, Patch, Body, Request, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt.guard';

@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get('me')
    @ApiOperation({ summary: 'Get current user profile' })
    getMe(@Request() req) { return this.usersService.findOne(req.user.sub); }

    @Patch('me')
    @ApiOperation({ summary: 'Update current user profile' })
    updateMe(@Request() req, @Body() body: any) { return this.usersService.update(req.user.sub, body); }
}
