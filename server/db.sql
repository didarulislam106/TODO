drop database if exists TODO;

create database TODO;

use TODO;

create table task (
    id int primary key auto_increment,
    discription varchar(255) not null,
);

insert into task (discription) values ('My test task');
insert into task (discription) values ('My second test task');
```