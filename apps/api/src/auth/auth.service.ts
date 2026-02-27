import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(User) private readonly usersRepo: Repository<User>,
    ) {
        // Initialize Firebase Admin (only once)
        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.cert({
                    projectId: process.env.FIREBASE_PROJECT_ID,
                    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                    privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
                }),
            });
        }
    }

    async verifyFirebaseToken(idToken: string) {
        let decoded: admin.auth.DecodedIdToken;
        try {
            decoded = await admin.auth().verifyIdToken(idToken);
        } catch {
            throw new UnauthorizedException('Invalid Firebase ID token');
        }

        const phone = decoded.phone_number;
        if (!phone) throw new UnauthorizedException('Phone number not found in token');

        // Upsert user
        let user = await this.usersRepo.findOne({ where: { phone } });
        if (!user) {
            user = this.usersRepo.create({ phone });
            await this.usersRepo.save(user);
        }

        const payload = { sub: user.id, phone: user.phone, role: user.role };
        return {
            accessToken: this.jwtService.sign(payload),
            user: { id: user.id, phone: user.phone, role: user.role, name: user.name },
        };
    }
}
