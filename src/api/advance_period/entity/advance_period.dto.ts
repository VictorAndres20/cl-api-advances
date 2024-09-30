export class AdvancePeriodDTO {
    readonly uuid: string;
    name: string;
    created_date: Date;
    finished_date: Date;
    enterprise_id: number;
    period_to_finish: string;
}