const express = require('express');
const config = require('./config/config');
const morgan = require('morgan');
const winston = require('./config/winstonConfig');

const artistRouter = require('./routes/artist.routes');
const songRouter = require('./routes/song.routes');

const app = express();
const PORT = process.env.PORT || 3001;

config(app);

app.use(morgan('combined', { stream: winston.stream }));

app.use('/artist', artistRouter);
app.use('/song', songRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
