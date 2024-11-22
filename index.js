const express = require('express');
const cors = require("cors");
const routes = require('./routes/routes.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());
app.use("/api", routes);

app.get('/', (req, res) => {
  res.send('Welcome to the JKT48 News API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});