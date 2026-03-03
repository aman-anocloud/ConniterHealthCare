import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        // In a real app, you would have an explicit ADMIN role.
        // For Conninter, we'll assume ORGANISATION roles or a specific admin flag is required.
        // If we want a strict ADMIN role, we must add it to the UserRole enum.
        if (user && user.role === 'ADMIN') {
            return true;
        }

        throw new ForbiddenException('You do not have permission to perform this action.');
    }
}
