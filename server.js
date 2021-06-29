'use strict';

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.get('/', (request, response) => {
  response.send('helllllloooo!');
});

app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));
