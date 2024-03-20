const http = require('http');

// Create an HTTP server
const server = http.createServer((req, res) => {
    // Get the URL path from the request
    const url = req.url;

    // Set the response headers
    res.writeHead(200, { 'Content-Type': 'text/html' });

    // Handle different URLs and send custom responses
    if (url === '/') {
        res.write(`<a href="/home" style="text-decoration: none; "><h3>Home</h3></a>`);
        res.write(`<a href="/about" style="text-decoration: none; "><h3>about us</h3></a>`);
        res.write(`<a href="/node" style="text-decoration: none; "><h3>node project</h3></a>`);
    
        res.end('<h3>click the page where you want to go</h3>');
    }  else if (url === '/home') {
        res.write(`<a href="/" style="text-decoration: none; " ><h3>go back</h3></a>`);
        res.end('<h1>Welcome to Home</h1>');
    } else if (url === '/about') {
        res.write(`<a href="/" style="text-decoration: none; "><h3>go back</h3></a>`);
        res.end('<h1>Welcome to About Us page<h1>');
    } else if (url === '/node') {
        res.write(`<a href="/" style="text-decoration: none; "><h3>go back</h3></a>`);
        res.end('<h1>Welcome to my Node Js project</h1>');
    } else {
        res.write(`<a href="/" style="text-decoration: none; "><h3>go back</h3></a>`);
        res.end('<h1>Page not found</h1>');
    }
});

// Set the port number
const PORT = 3000; // You can choose any port number

// Start the server and listen on the specified port
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

