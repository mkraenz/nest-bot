import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    public canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const rolesInDecorator = this.reflector.get<string[]>(
            'roles',
            context.getHandler(),
        );
        if (!rolesInDecorator) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const cookies = request.cookies;
        const hasRole = () => rolesInDecorator.includes(cookies.userrole);
        return cookies.userrole && hasRole();
    }
}
