import { Controller, Get, Post, Body, HttpException, Param, UseGuards } from '@nestjs/common';
import { HttpResponse } from '../../../commons/responses/http_response';
import { BasicRestController } from '../../../commons/controllers/rest.controller';
import { AuthGuard } from '@nestjs/passport';
import { UserRol } from '../entity/user_rol.entity';
import { UserRolDTO } from '../entity/user_rol.dto';
import { UserRolService } from '../service/user_rol.service';

@Controller('user-rol')
@UseGuards(AuthGuard('jwt'))
export class UserRolController extends BasicRestController<UserRol, string, UserRolDTO>{

    constructor(protected service: UserRolService){super();}

}

/** Generated by https://github.com/VictorAndres20 code generator for database, NestJS, React */