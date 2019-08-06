drop database if exists bamazon_db;
create database bamazon_db;

use bamazon_db;

create table products (
	item_id int(10) auto_increment not null,
    product_name varchar(255) not null,
    department_name varchar(30) not null,
    price float(10, 2) not null,
    stock_quantity int(10) not null,
    primary key (item_id)
);

insert into products (product_name, department_name, price, stock_quantity)
	values ("Basketballs", "Sports", 12.99, 75),
    ("Bananas", "Grocery", 6.50, 75),
    ("Laptop", "Electronics", 598.99, 35),
    ("Milk", "Grocery", 4.50, 137),
    ("Bamazon Spindle Tablet", "Electronics", 74.99, 150),
    ("Canvas Backpack", "Bags and Backpacks", 24.99, 56),
    ("Architect's desk lamp", "Office", 15.74, 40),
    ("Chess Piece Puzzle", "Toys and Games", 7.99, 100),
    ("Surge Protector Power Strip", "Electronics", 17.88, 60),
    ("Skateboard", "Sports", 23.45, 67);