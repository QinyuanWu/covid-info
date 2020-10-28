const path = require("path");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.static('assets'));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});


app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});