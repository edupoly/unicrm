const dotenv = require('dotenv');
dotenv.config();

const { initPermissions } = require('./src/config/permissions');

const sendResponse = require('./src/utils/common/sendResponse');

const { PORT } = process.env;

async function bootstrap() {
    try {
        // 1. We should fetch global permissions first
        await initPermissions();
        console.log("Permissions loaded into global memory.");

        // 2. Now require app.js safely (routes can access global PERMISSIONS)
        const app = require('./src/app/app');

        app.get('/health', (req, res) => {
            sendResponse(res, 200, true, `I'm Healthy!`);
        });

        app.listen(PORT, () => {
            console.log(`Express server running at ${PORT} PORT!`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
}

bootstrap();