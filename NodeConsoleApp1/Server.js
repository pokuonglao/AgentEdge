const express = require('express');
const app = express();

//// Serve static files from the 'public' directory
//app.use(express.static('public'));

// Serve static files from the current directory
app.use(express.static(__dirname));

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
