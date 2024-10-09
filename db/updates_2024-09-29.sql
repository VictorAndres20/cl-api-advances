-- Advance periods added
create table ks.advance_period(
	uuid VARCHAR(40) default gen_random_uuid(),
	name VARCHAR(200) not null,
	created_date TIMESTAMP not null,
	finished_date TIMESTAMP,
	enterprise_id integer not null
);
alter table ks.advance_period add constraint period_pk primary key(uuid);

alter table ks.advance add period varchar(40);

-- ****** BE CAREFULL ********* 
--
--
--
--
-- For new first time
insert into ks.advance_period(name, created_date, enterprise_id) 
values('Periodo inicial Cintalast', '2024-03-01 01:00:00', 1);

insert into ks.advance_period(name, created_date, enterprise_id) 
values('Periodo inicial Alianza', '2024-06-01 01:00:00', 2);

insert into ks.advance_period(name, created_date, enterprise_id) 
values('Periodo inicial', '2024-09-01 01:00:00', 3);

select * from ks.advance_period ap;

UPDATE ks.advance ad
SET period = 'NEED TO EXECUTE FISRT ABOVE'
FROM ks.employee e
    inner JOIN ks."range" r ON e."range" = r."uuid"
WHERE
    e."uuid" = ad.employee 
    AND r.enterprise = 1;

UPDATE ks.advance ad
SET period = 'NEED TO EXECUTE FISRT ABOVE'
FROM ks.employee e
    inner JOIN ks."range" r ON e."range" = r."uuid"
WHERE
    e."uuid" = ad.employee 
    AND r.enterprise = 2;

UPDATE ks.advance ad
SET period = 'NEED TO EXECUTE FISRT ABOVE'
FROM ks.employee e
    inner JOIN ks."range" r ON e."range" = r."uuid"
WHERE
    e."uuid" = ad.employee 
    AND r.enterprise = 3;

-- Daviplata as bank
insert into ks.bank VALUES('DAVIP', 'Daviplata');

insert into ks.bank_supported values('DAVIP', 'DAVIP');

insert into ks.bank_messages
values('HDAVP', 'Para transferencias a Daviplata', 'DAVIP');
