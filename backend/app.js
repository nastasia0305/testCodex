const express = require('express');
const config = require('./config/config');
const artistRouter = require('./routes/artist.routes');
const songRouter = require('./routes/song.routes');

const app = express();
const PORT = process.env.PORT || 3001;

config(app);

app.use('/artist', artistRouter);
app.use('/song', songRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
