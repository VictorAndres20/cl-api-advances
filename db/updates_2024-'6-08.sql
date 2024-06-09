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