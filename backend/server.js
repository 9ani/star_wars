const express = require('express');
const cors = require('cors');
const swapiRoutes = require('./routes/swapiRoutes');

const app = express();
const port = 5000;

app.use(cors());
app.use('/api', swapiRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
