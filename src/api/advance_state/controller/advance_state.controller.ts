import { Controller, Get, Post, Body, HttpException, Param, UseGuards } from '@nestjs/common';
import { HttpResponse } from '../../../commons/responses/http_response';
import { BasicRestController } from '../../../commons/controllers/rest.controller';
import { AuthGuard } from '@nestjs/passport';
import { AdvanceState } from '../entity/advance_state.entity';
import { AdvanceStateDTO } from '../entity/advance_state.dto';
import { AdvanceStateService } from '../service/advance_state.service';

@Controller('advance-state')
@UseGuards(AuthGuard('jwt'))
export class AdvanceStateController extends BasicRestController<AdvanceState, string, AdvanceStateDTO>{

    constructor(protected service: AdvanceStateService){super();}

}

/** Generated by https://github.com/VictorAndres20 code generator for database, NestJS, React */