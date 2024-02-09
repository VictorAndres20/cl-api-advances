CREATE TABLE ks.enterprise(
    id SERIAL NOT NULL,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(400)
);
ALTER TABLE ks.enterprise ADD CONSTRAINT pk_enterprise PRIMARY KEY(id);

CREATE TABLE ks.user_rol(
    cod VARCHAR(5) NOT NULL,
    name VARCHAR(50) NOT NULL
);
ALTER TABLE ks.user_rol ADD CONSTRAINT pk_user_rol PRIMARY KEY(cod);

CREATE TABLE ks.user(
    uuid VARCHAR(40) DEFAULT gen_random_uuid() NOT NULL,
    name VARCHAR(80) NOT NULL,
    email VARCHAR(100) NOT NULL,
    login VARCHAR(100) NOT NULL,
    password VARCHAR(200) NOT NULL,
    active INTEGER DEFAULT 1 NOT NULL,
    enterprise INTEGER NOT NULL,
    rol VARCHAR(5) NOT NULL
);
ALTER TABLE ks.user ADD CONSTRAINT pk_user PRIMARY KEY(uuid);

CREATE TABLE ks.range(
    uuid VARCHAR(40) DEFAULT gen_random_uuid() NOT NULL,
    id VARCHAR(5) NOT NULL,
    enterprise INTEGER NOT NULL
);
ALTER TABLE ks.range ADD CONSTRAINT pk_range PRIMARY KEY(uuid);

CREATE TABLE ks.amount(
    uuid VARCHAR(40) DEFAULT gen_random_uuid() NOT NULL,
    value INTEGER NOT NULL,
    cost INTEGER NOT NULL,
    active INTEGER DEFAULT 1 NOT NULL
);
ALTER TABLE ks.amount ADD CONSTRAINT pk_amount PRIMARY KEY(uuid);

CREATE TABLE ks.range_amount(
    uuid VARCHAR(40) DEFAULT gen_random_uuid() NOT NULL,
    amount VARCHAR(40) NOT NULL,
    range VARCHAR(40) NOT NULL
);
ALTER TABLE ks.range_amount ADD CONSTRAINT pk_range_amount PRIMARY KEY(uuid);

CREATE TABLE ks.employee(
    uuid VARCHAR(40) DEFAULT gen_random_uuid() NOT NULL,
    name VARCHAR(90) NOT NULL,
    id VARCHAR(15) NOT NULL,
    phone VARCHAR(15),
    salary INTEGER NOT NULL,
    password VARCHAR(100) NOT NULL,
    state INTEGER DEFAULT 1 NOT NULL,
    range VARCHAR(40) NOT NULL
);
ALTER TABLE ks.employee ADD CONSTRAINT pk_employee PRIMARY KEY(uuid);

CREATE TABLE ks.advance_state(
    cod VARCHAR(5) NOT NULL,
    name VARCHAR(50) NOT NULL
);
ALTER TABLE ks.advance_state ADD CONSTRAINT pk_advance_state PRIMARY KEY(cod);

CREATE TABLE ks.advance(
    uuid VARCHAR(40) DEFAULT gen_random_uuid() NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    approved_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    declined_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    value INTEGER NOT NULL,
    cost INTEGER NOT NULL,
    employee VARCHAR(40) NOT NULL,
    state VARCHAR(5) NOT NULL
);
ALTER TABLE ks.advance ADD CONSTRAINT pk_advance PRIMARY KEY(uuid);


--- Foreign Keys


ALTER TABLE ks.user ADD CONSTRAINT fk_user_enterprise FOREIGN KEY(enterprise) REFERENCES ks.enterprise(id);
ALTER TABLE ks.user ADD CONSTRAINT fk_user_rol FOREIGN KEY(rol) REFERENCES ks.user_rol(cod);

ALTER TABLE ks.range ADD CONSTRAINT fk_range_enterprise FOREIGN KEY(enterprise) REFERENCES ks.enterprise(id);


ALTER TABLE ks.range_amount ADD CONSTRAINT fk_range_amount_amount FOREIGN KEY(amount) REFERENCES ks.amount(uuid);
ALTER TABLE ks.range_amount ADD CONSTRAINT fk_range_amount_range FOREIGN KEY(range) REFERENCES ks.range(uuid);

ALTER TABLE ks.employee ADD CONSTRAINT fk_employee_range FOREIGN KEY(range) REFERENCES ks.range(uuid);


ALTER TABLE ks.advance ADD CONSTRAINT fk_advance_employee FOREIGN KEY(employee) REFERENCES ks.employee(uuid);
ALTER TABLE ks.advance ADD CONSTRAINT fk_advance_state FOREIGN KEY(state) REFERENCES ks.advance_state(cod);