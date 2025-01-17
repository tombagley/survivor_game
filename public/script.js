const { response } = require("express");

const API_BASE_URL = 'http://localhost:3000'; // Base URL for API routes


// Add a stock
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('addStockForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('here');
    
    const name = document.getElementById('name').value;
    const symbol = document.getElementById('symbol').value;
    const price = document.getElementById('price').value;

    const response = await fetch(`${API_BASE_URL}/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, symbol, price }),
    });

    if (response.ok) {
      alert('Stock added successfully!');
      fetchStocks(); // Refresh stock list
    } else {
      alert('Error adding stock');
    }
  });
});


//Sign up, add user
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('addUserForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log("In here");

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
      
    
    // You should hash the password before sending it to the server, using bcrypt or a similar library
    console.log(username);
    console.log(password);
    const response = await fetch(`${API_BASE_URL}/add-user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      alert('User added successfully!');
      // Optionally, refresh the user list or redirect to a login page
    } else {
      alert('Error adding user');
    }
  });
});

//Login

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log("In here");

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    if (response.ok) {
        window.location.href = '/welcome';
    } else {
        alert('Error logging in');
    }
  });
});


// Delete a stock
async function deleteStock(symbol) {
    const response = await fetch(`${API_BASE_URL}/delete/${symbol}`, {
      method: 'DELETE',
    });
  
    if (response.ok) {
      alert('Stock deleted successfully!');
      fetchStocks(); // Refresh the stock list after deletion
    } else {
      alert('Error deleting stock');
    }
  }

async function fetchStocks() {
    const response = await fetch(`${API_BASE_URL}/all`);
    const stocks = await response.json();
  
    const stocksList = document.getElementById('stocks');
    stocksList.innerHTML = ''; // Clear existing list
  
    stocks.forEach((stock) => {
      const li = document.createElement('li');
      li.textContent = `${stock.name} (${stock.symbol}): $${stock.price}`;
      
      // Create a delete button for each stock
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', async () => {
        await deleteStock(stock.symbol);  // Call the delete function with the stock's symbol
      });
      
      // Append the button to the list item
      li.appendChild(deleteButton);
      
      // Add the list item to the stocks list
      stocksList.appendChild(li);
    });
  }


// Initial fetch of stocks on page load
fetchStocks();
