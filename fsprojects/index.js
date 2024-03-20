const http = require('http');
const fs = require('fs');

// Function to read messages from the file
function readMessages(callback) {
    fs.readFile('messages.txt', 'utf8', (err, data) => {
        if (err) {
            callback([]);
            return;
        }

        // Split messages by newline and filter empty lines
        const messages = data.trim().split('\n').filter(Boolean);
        callback(messages);
    });
}

// Function to add a new message to the file
function addMessage(message, callback) {
    fs.appendFileSync('messages.txt', `${message}\n`);

    // Invoke the callback to signal that the message has been added
    callback();
}

const server = http.createServer((req, res) => {
    const url = req.url;
    if (url === '/') {
        // Read all messages from the file
        readMessages((messages) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('<html>');
            res.write('<head><title>Messages Form</title></head>');
            res.write('<body>');

            // Display the form
            res.write('<h1>Messages Form</h1>');
            res.write('<form action="/add-message" method="POST">');
            res.write('<input type="text" name="message" placeholder="Enter your message">');
            res.write('<button type="submit">Submit</button>');
            res.write('</form>');

            // Display existing messages
            res.write('<h2>Existing Messages</h2>');
            res.write('<ul>');
            messages.forEach(message => {
                res.write(`<li>${message}</li>`);
            });
            res.write('</ul>');

            res.write('</body></html>');
            res.end();
        });
    } else if (url === '/add-message' && req.method === 'POST') {
        let body = [];
        req.on('data', chunk => {
            body.push(chunk);
        });
        req.on('end', () => {
            const message = Buffer.concat(body).toString().split('=')[1];
            // Add the new message to the file
            addMessage(message, () => {
                // Redirect to the homepage after adding the message
                res.writeHead(302, { 'Location': '/' });
                res.end();
            });
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page not found');
    }
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
