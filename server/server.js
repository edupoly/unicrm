const dotenv = require('dotenv');
dotenv.config();

const app = require('./src/app/app');
const sendResponse = require('./src/utils/common/sendResponse');

const { PORT } = process.env;

app.get('/health', (req, res) => {
    sendResponse(res, 200, true, `I'm Healthy!`);
});

app.listen(PORT, () => {
    console.log(`Express server running at ${PORT} PORT!`);
});