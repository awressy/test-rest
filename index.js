const express = require('express');
const app = express();

const port = 3001;

app.listen(port, '0.0.0.0', () => {
  console.log(`Server berjalan di http://0.0.0.0:${port}`);
});