const express = require('express');
const app = express();
const port = 4000;

// Setup mongoose
const dbSetup = require('./database/setup');
const bookRoutes = require('./routes/bookRoutes')

app.use(express.json());
dbSetup();

app.use(bookRoutes);

app.listen(port, () => { console.log(`App is listening on port ${port}`)});