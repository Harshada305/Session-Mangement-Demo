const express = require('express');
const session = require('express-session');

const app = express();

// Middleware setup for session management
app.use(session({
  secret: 'my-secret',  // A secret string used to sign the session ID cookie
  resave: false,  // Don't save session if unmodified
  saveUninitialized: false  // Don't create session until something stored
}));

// Route for the homepage
app.get('/', (req, res) => {
  // Check if the 'views' property exists in the session
  if (req.session.views) {
    req.session.views++;  // Increment the 'views' count for the current session
    res.setHeader('Content-Type', 'text/html');
    // Display the number of views and session expiration time
    res.write('<h1>Session Demo</h1>');
    res.write('<p>You have visited this page ' + req.session.views + ' times.</p>');
    res.write('<p>Session ID: ' + req.session.id + '</p>');
    res.write('<p>Session Expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>');
    res.write('<p><a href="/reset">Reset Session</a></p>'); // Add a link to reset session
    res.end();
  } else {
    // Initialize the 'views' property in the session if it doesn't exist
    req.session.views = 1;
    res.setHeader('Content-Type', 'text/html');
    // Display a welcome message for the first-time visitor
    res.write('<h1>Session Demo</h1>');
    res.write('<p>Welcome to the session demo. Refresh the page!</p>');
    res.write('<p>Session ID: ' + req.session.id + '</p>');
    res.end();
  }
});

// Route to reset the session
app.get('/reset', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
    } else {
      console.log('Session destroyed.');
      res.redirect('/');
    }
  });
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
