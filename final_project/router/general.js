const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const axios = require('axios');

const getBooksList = (url) => {
    const req = axios.get(url)
    console.log(req);
    req.then(resp => {
        console.log("Books get");
        console.log(resp.data);
    })

    .catch(err => {
        console.log("Rejected for url " + url);
        console.log(err.toString());
        
    })   
}

// getBooksList("https://echia0921-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/");

const getBookDetails = (url) => {
    const req = axios.get(url)
    console.log(req);
    req.then(resp => {
        console.log("Book detail get");
        console.log(resp.data);
    })

    .catch(err => {
        console.log("Rejected for url " + url);
        console.log(err.toString());
        
    })
    
}

// getBookDetails("https://echia0921-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/isbn/1");

const getBooksByAuthor = (url) => {
    const req = axios.get(url)
    console.log(req);
    req.then(resp => {
        console.log("Book detail get");
        console.log(resp.data);
    })

    .catch(err => {
        console.log("Rejected for url " + url);
        console.log(err.toString());
        
    })
    
}

// getBooksByAuthor("https://echia0921-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/author/Dante Alighieri/");

const getBooksByTitle = (url) => {
    const req = axios.get(url)
    console.log(req);
    req.then(resp => {
        console.log("Book detail get");
        console.log(resp.data);
    })

    .catch(err => {
        console.log("Rejected for url " + url);
        console.log(err.toString());
        
    })
    
}

getBooksByTitle("https://echia0921-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/title/The Divine Comedy/");

public_users.post("/register", (req,res) => {
  const username = req.body.username
  const password = req.body.password

  if (username && password) {
    if (!isValid(username)) {
      users.push({ "username": username, "password": password });
      return res.status(200).json({ message: "User successfully registered. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({ message: "Unable to register user." });
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  let found_books = {}
  for (let book in books) {
    if (books[book].author == author){
        found_books[book] = books[book];
    }
  }
  res.send(JSON.stringify(found_books, null, 4));
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    let found_books = {}
    for (let book in books) {
      if (books[book].title == title){
          found_books[book] = books[book];
      }
    }
    res.send(JSON.stringify(found_books, null, 4));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn].reviews);
});

module.exports.general = public_users;
