import { Controller, Get, Post, Body, HttpException, Param, UseGuards } from '@nestjs/common';
import { HttpResponse } from '../../../commons/responses/http_response';
import { BasicRestController } from '../../../commons/controllers/rest.controller';
import { AuthGuard } from '@nestjs/passport';
import { Fintech } from '../entity/fintech.entity';
import { FintechDTO } from '../entity/fintech.dto';
import { FintechService } from '../service/fintech.service';

@Controller('fintech')
@UseGuards(AuthGuard('jwt'))
export class FintechController extends BasicRestController<Fintech, string, FintechDTO>{

    constructor(protected service: FintechService){super();}

}

/** Generated by https://github.com/VictorAndres20 code generator for database, NestJS, React */