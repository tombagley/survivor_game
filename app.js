const express = require('express');
const mongoose = require('mongoose');
const fileRoutes = require('./routes/fileRoutes');

const app = express(); // Initialize an Express app
const dbURI = 'mongodb+srv://tombagley4242:xoRfH3iPcG2v4Ln4@survivor-stock-game.0vd92.mongodb.net/?retryWrites=true&w=majority&appName=survivor-stock-game';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected to db');
        app.listen(3000, () => console.log('Server running on http://localhost:3000'));
    })
    .catch((err) => console.error('Database connection error:', err));

// Middleware to parse incoming requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files
app.use(express.static('public'));

// Routes
app.use('/', fileRoutes);

// Error Handling Middleware (optional, but good practice)
app.use((req, res, next) => {
    res.status(404).send('Page not found');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});


/*
// Middleware to check if user is logged in as Admin
function checkAdmin(req, res, next) {
    //if (req.session && req.session.user && req.session.user.role === 'admin') {
        return next();
    //}
    //res.status(403).send('You must be an admin to access this page');
}

//Front page
app.get('/', (req, res) => {
    res.send('Hello, welcome to the server!');
});

//Addsurvivorplayers
app.get('/add-players', checkAdmin, (req, res) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Enter the stock name: ', (stockName) => {
        rl.question('Enter the stock symbol: ', (stockSymbol) => {
            rl.question('Enter the stock price: ', (stockPrice) => {
                const stock1 = new Stock({
                    name: stockName,
                    symbol: stockSymbol,
                    price: parseFloat(stockPrice),
                    available: true
                });

                stock1.save()
                    .then((result) => {
                        console.log('Stock saved:', result);
                        res.send('Stock added to the database.');
                    })
                    .catch((err) => {
                        console.error(err);
                        res.status(500).send('Error saving stock.');
                    })
                    .finally(() => rl.close());
            });
        });
    });
});

//AddTransaction
app.get('/add-trans', (req, res) => {
    const stock1 = new Transaction({
        name: 'Tesla Inc.',
        symbol: 'TSLA',
        price: 800,
        available: true
      });
      stock1.save()
        .then((result) => {
            res.send('User added to the database');
            console.log('User saved:', result);
        })
        .catch((err) => {
            res.status(500).send('Error saving user');
            console.error(err);
        });
});


// Define a route to add a user
app.get('/add-user', (req, res) => {
    const user = new User({
        username: 'firstuser',
        passwordHash: '1234test',
        balance: 100,
        portfolio: [
            { stockId: 'Boston Rob', quantity: 5 }
        ]
    });

    user.save()
        .then((result) => {
            res.send('User added to the database');
            console.log('User saved:', result);
        })
        .catch((err) => {
            res.status(500).send('Error saving user');
            console.error(err);
        });
        
});
*/
