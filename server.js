'use strict';

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));
