import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { HospitalsModule } from './hospitals/hospitals.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { BlogModule } from './blog/blog.module';
import { LeadsModule } from './leads/leads.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),

        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                type: 'postgres',
                url: config.get<string>('DATABASE_URL'),
                autoLoadEntities: true,
                synchronize: process.env.NODE_ENV !== 'production', // Use migrations in prod
                logging: process.env.NODE_ENV === 'development',
            }),
        }),

        AuthModule,
        UsersModule,
        HospitalsModule,
        AppointmentsModule,
        BlogModule,
        LeadsModule,
    ],
})
export class AppModule { }
