import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { EmployeeModule } from '../employee/employee.module';
import { AuthModule } from '../auth/auth.module';
import { LoginController } from './controller/login.controller';
import { LoginService } from './service/login.service';

@Module({
    imports: [
        UserModule,
        EmployeeModule,
        AuthModule,
    ],
    controllers: [
        LoginController
    ],
    providers: [
        LoginService
    ],
    exports: [
        LoginService
    ],
})
export class LoginModule{}

/** Generated by https://github.com/VictorAndres20 code generator for database, NestJS, React */