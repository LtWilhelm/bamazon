const mysql = require('mysql');
const inquirer = require('inquirer');
const Table = require('cli-table');

const table = new Table({
    head: ['ID', 'Name', 'Price', 'Quantity']
})
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'bamazon_db'
});

let products = [];

function queryDB () {
    connection.connect();
    connection.query('select * from products', function(err, res){
        if (err) throw err;
    
        // console.log(res);
        res.forEach(element => {
            products.push(element.product_name);
            table.push([element.item_id, element.product_name, '$' + parseFloat(element.price).toFixed(2), element.stock_quantity]);
        });
        console.log(table.toString());
        inquirer.prompt([
            {
                name: 'select',
                message: 'What product would you like to buy today?',
                type: 'list',
                choices: products
            },
            {
                name: 'quantity',
                message: 'How many would you like to buy?',
                type: 'number'
            }
        ]).then(function(answers){
            updateDB(answers.select, answers.quantity);
        });
    });
}

function updateDB (item, count) {
    connection.query('select stock_quantity, price from products where product_name = ?', item, function(err, res){
        if (err) throw err;

        if (res[0].stock_quantity <= 0) {
            console.log('Sorry, that item is out of stock');
        } else if (res[0].stock_quantity < count) {
            console.log('Sorry, there is not enough stock of this item. Please enter a lower number');
        } else {
            connection.query('update products set stock_quantity = stock_quantity - ? where product_name = ?;', [count, item], function(error, result){
                if (error) throw error;
                console.log('Here is your order of ' + count + ' ' + item);
                console.log('Your total comes to $' + (count * parseFloat(res[0].price)).toFixed(2));
                console.log('Thank you for shopping at Bamazon!');
            });
        }
        connection.end();
    });
}

queryDB();
