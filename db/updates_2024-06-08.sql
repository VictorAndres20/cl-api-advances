CREATE TABLE ks.bank(
    cod VARCHAR(5) NOT NULL,
    name VARCHAR(50) NOT NULL
);
ALTER TABLE ks.bank ADD CONSTRAINT pk_bank PRIMARY KEY(cod);

CREATE TABLE ks.bank_supported(
    cod VARCHAR(5) NOT NULL,
    bank VARCHAR(5) NOT NULL
);
ALTER TABLE ks.bank_supported ADD CONSTRAINT pk_bank_supported PRIMARY KEY(cod);

ALTER TABLE ks.employee ADD bank VARCHAR(5) DEFAULT 'DAVI' NOT null;

insert into ks.bank VALUES('BOGO', 'Banco de Bogotá');
insert into ks.bank VALUES('SOCI', 'Banco Caja Social');
insert into ks.bank VALUES('COLO', 'Bancolombia');
insert into ks.bank VALUES('BBVA', 'BBVA');
insert into ks.bank VALUES('DAVI', 'Davivienda');
insert into ks.bank VALUES('SCOT', 'Scotiabank Colpatria');

insert into ks.bank_supported values('BOGO', 'BOGO');
insert into ks.bank_supported values('DAVI', 'DAVI');

-- New

create table ks.bank_account_type(
	cod varchar(5) not null,
	name varchar(100) not null
);
alter table ks.bank_account_type add constraint pk_bank_account_type primary key(cod);

insert into ks.bank_account_type values('AHOR', 'Cuenta de ahorros');
insert into ks.bank_account_type values('CORR', 'Cuenta corriente');

create table ks.fintech(
	cod varchar(5) not null,
	name varchar(200) not null
);
alter table ks.fintech add constraint pk_fintech primary key(cod);

insert into ks.fintech values('NEQU', 'Nequi');

alter table ks.advance add use_fintech integer default 0;

alter table ks.employee add bank_account_type varchar(5) default 'AHOR';
alter table ks.employee add bank_account_number varchar(20);
alter table ks.employee add fintech varchar(5);
alter table ks.employee add fintech_account_number varchar(13);

create table ks.messages(
cod varchar(5) not null,
message varchar(800)
);

alter table ks.messages add constraint pk_messages primary key(cod);

insert into ks.messages 
values('ADVA', 'En caso de retiro, la Empresa también se entenderá expresa e irrevocablemente autorizada para descontar dicha suma de los salarios, prestaciones sociales, vacaciones, indemnizaciones, beneficios o auxilios legales o extralegales y cualquier otra acreencia laboral que tuvieras a tu favor.');

create table ks.bank_messages(
cod varchar(5) not null,
message varchar(800),
bank varchar(5)
);

alter table ks.bank_messages add constraint pk_bank_messages primary key(cod);

insert into ks.bank_messages
values('HDAVI', 'Para transferencias a Davivienda', 'DAVI');

insert into ks.bank_messages
values('HBOGO', 'Para transferencias a Banco de Bogotá', 'BOGO');

insert into ks.bank_messages
values('HSCOT', 'Para transferencias a Scotiabank', 'SCOT');

insert into ks.bank_messages
values('HSOCI', 'Para transferencias a Banco Caja Social', 'SOCI');

insert into ks.bank_messages
values('HCOLO', 'Para transferencias a Bancolombia', 'COLO');

update ks."range" r set enterprise = 2 where id = '1TEMP';
update ks."range" r set enterprise = 2 where id = 'MinTe';
alter table ks."range" alter column id type varchar(100);
alter table ks.enterprise add nit varchar(20);
update ks.enterprise r set nit = '8600728108' where id = 1;
update ks.enterprise r set nit = '9010079011' where id = 2;

-- AV villas and Daviplata added
insert into ks.bank VALUES('AVVI', 'Banco AV Villas');
insert into ks.bank_supported values('AVVI', 'AVVI');

insert into ks.bank_messages
values('HAVVI', 'Para transferencias a Banco AV Villas', 'AVVI');

insert into ks.fintech values('DAVIP', 'Daviplata');