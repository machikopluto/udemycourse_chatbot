// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

const generateBlogRoute = require('./routes/generate-blog');
const processPdfRoute = require('./routes/process-pdf');
const generateResponseRoute = require('./routes/generate-response');

app.use('/api/generate-blog', generateBlogRoute);
app.use('/api/process-pdf', processPdfRoute);
app.use('/api/generate-response', generateResponseRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});