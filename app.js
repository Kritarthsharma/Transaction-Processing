// Modules
const express = require('express');
const path = require('path');
const fs = require('fs');
const compression = require('compression');

// Middleware
//Start express app
const app = express();

// Setting the template engine to render the data on to the client side
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// To always serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Compresses the response sent to the client html or css file
app.use(compression());

// To read file of transaction details of users
const transactions = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/users.json`));

// To render all the users related to transactions
app.get('/', (req, res) => {
	res.status(200).render('index', {
		transactions
	});
});

// To render transactions related to a specific user
app.get('/:id', (req, res) => {
	const id = req.params.id;

	const user = transactions.find((el) => el.name === id);

	res.status(200).render('transactionDetail', {
		user
	});
});

// Start the server
const port = 3000;
app.listen(port, () => {
	console.log(`App running on port ${port}...`);
});
