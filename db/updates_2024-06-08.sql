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