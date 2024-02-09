insert into ks.user_rol(cod, name) values('ROOT', 'Superadmin');
insert into ks.user_rol(cod, name) values('ADMI', 'Admin');
insert into ks.user_rol(cod, name) values('EMPL', 'Employee');

insert into ks.enterprise(name) values('Cintalast SAS');

insert into ks.user(name, email, login, "password", enterprise, rol)
values('Superadmin', 'example@cintalast.com', 'admin', '$2a$10$mbvYQ/vQPhU31y0Uy/POju44lRm/YTf2wK6HPxsBMLc7JM10aACim', 1, 'ROOT');

insert into ks.advance_state(cod, name) values('PEND', 'Pending');
insert into ks.advance_state(cod, name) values('APPR', 'Approved');
insert into ks.advance_state(cod, name) values('DECL', 'Declined');
