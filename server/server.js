const dotenv = require('dotenv');
dotenv.config();

const app = require('./src/app/app');

const { PORT } = process.env;

app.listen(PORT, () => {
    console.log(`Express server running at ${PORT} PORT!`);
});