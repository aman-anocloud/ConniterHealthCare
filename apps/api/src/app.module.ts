import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { HospitalsModule } from './hospitals/hospitals.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { LeadsModule } from './leads/leads.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),

        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => {
                const dbUrl = config.get<string>('DATABASE_URL');
                if (dbUrl) {
                    return {
                        type: 'postgres',
                        url: dbUrl,
                        autoLoadEntities: true,
                        synchronize: true, // Auto-sync schema for fast local dev
                        logging: false,
                    };
                }

                // Fallback to SQLite for zero-config local development
                return {
                    type: 'sqlite',
                    database: 'db.sqlite',
                    autoLoadEntities: true,
                    synchronize: true,
                    logging: false,
                };
            }
        }),

        AuthModule,
        UsersModule,
        HospitalsModule,
        AppointmentsModule,
        LeadsModule,
    ],
})
export class AppModule { }
