import { Controller, Get, Post, Body, HttpException, Param, UseGuards, Res, HttpStatus, Put } from '@nestjs/common';
import { HttpResponse } from '../../../commons/responses/http_response';
import { Response } from 'express';
import { BasicRestController } from '../../../commons/controllers/rest.controller';
import { AuthGuard } from '@nestjs/passport';
import { Advance } from '../entity/advance.entity';
import { AdvanceDTO } from '../entity/advance.dto';
import { AdvanceBusiness, AdvanceLimitInfo } from '../service/advance.business';

@Controller('advance')
@UseGuards(AuthGuard('jwt'))
export class AdvanceController extends BasicRestController<Advance, string, AdvanceDTO>{

    constructor(protected service: AdvanceBusiness){super();}

    @Post('create')
    override async createOne(@Res() res: Response, @Body() dto: AdvanceDTO): Promise<void> {
        try{
            let data = await this.service.create(dto);
            res.status(HttpStatus.CREATED).json(new HttpResponse<Advance>().setData(data).build(true));
        } catch(err){
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(new HttpResponse<Advance>().setError(err.message).build(false));
        }
    }

    @Get('all/employee/paged/:page/:limit/:employee')
    async findAllByEmployeePaged(
        @Res() res: Response,
        @Param('page') page: number,
        @Param('limit') limit: number,
        @Param('employee') employee: string,
        ): Promise<void> {
        try{
            let list = await this.service.findAllByEmployeePaged(page, limit, employee);
            res.status(HttpStatus.OK).json(new HttpResponse<Advance>().setPaged(list).build(true));
        } catch(err){
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(new HttpResponse<Advance>().setError(err.message).build(false));
        }
    }

    @Get('all/enterprise/:enterprise')
    async findAllByEnterprise(
        @Res() res: Response,
        @Param('enterprise') enterprise: number,
        ): Promise<void> {
        try{
            let list = await this.service.findAllByEnterprise(enterprise);
            res.status(HttpStatus.OK).json(new HttpResponse<Advance>().setList(list).build(true));
        } catch(err){
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(new HttpResponse<Advance>().setError(err.message).build(false));
        }
    }

    @Get('all/enterprise/pending/:enterprise')
    async findAllByEnterprisePending(
        @Res() res: Response,
        @Param('enterprise') enterprise: number,
        ): Promise<void> {
        try{
            let list = await this.service.findAllByEnterprisePending(enterprise);
            res.status(HttpStatus.OK).json(new HttpResponse<Advance>().setList(list).build(true));
        } catch(err){
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(new HttpResponse<Advance>().setError(err.message).build(false));
        }
    }

    @Put('approve/:id')
    async approve(@Res() res: Response, @Param('id') id: string): Promise<void> {
        try{
            let data = await this.service.approve(id);
            res.status(HttpStatus.OK).json(new HttpResponse<Advance>().setData(data).build(true));
        } catch(err){
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(new HttpResponse<Advance>().setError(err.message).build(false));
        }
    }

    @Put('decline/:id')
    async decline(@Res() res: Response, @Param('id') id: string): Promise<void> {
        try{
            let data = await this.service.decline(id);
            res.status(HttpStatus.OK).json(new HttpResponse<Advance>().setData(data).build(true));
        } catch(err){
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(new HttpResponse<Advance>().setError(err.message).build(false));
        }
    }

    @Get('pdf/:id')
    async buildAdvancePdfById(
        @Res() res: Response,
        @Param('id') id: string,
        ): Promise<void> {
        try{
            let data = await this.service.buildAdvancePdfById(id);
            res.status(HttpStatus.OK).json(new HttpResponse<string>().setData(data).build(true));
        } catch(err){
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(new HttpResponse<string>().setError(err.message).build(false));
        }
    }

    @Get('all/pending')
    async findAllPending(
        @Res() res: Response,
        ): Promise<void> {
        try{
            let list = await this.service.findAllPending();
            res.status(HttpStatus.OK).json(new HttpResponse<Advance>().setList(list).build(true));
        } catch(err){
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(new HttpResponse<Advance>().setError(err.message).build(false));
        }
    }

    @Get('all-period/:period')
    async findAllByPeriod(
        @Res() res: Response,
        @Param('period') period: string,
        ): Promise<void> {
        try{
            let list = await this.service.findAllByPeriod(period);
            res.status(HttpStatus.OK).json(new HttpResponse<Advance>().setList(list).build(true));
        } catch(err){
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(new HttpResponse<Advance>().setError(err.message).build(false));
        }
    }

    @Get('limit-info/employee/:id')
    async getEmployeeLimitInfo(
        @Res() res: Response,
        @Param('id') id: string,
        ): Promise<void> {
        try{
            let data = await this.service.getEmployeeAdvanceLimitInfo(id);
            res.status(HttpStatus.OK).json(new HttpResponse<AdvanceLimitInfo>().setData(data).build(true));
        } catch(err){
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(new HttpResponse<AdvanceLimitInfo>().setError(err.message).build(false));
        }
    }

}

/** Generated by https://github.com/VictorAndres20 code generator for database, NestJS, React */