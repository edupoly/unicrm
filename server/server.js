import dotenv from 'dotenv';
dotenv.config();

import { initPermissions } from './src/config/permissions.js';

import sendResponse from './src/utils/common/sendResponse.js';

const { PORT } = process.env;

async function bootstrap() {
    try {
        await initPermissions();
        console.log("Permissions loaded into global memory.");

        const { default: app } = await import('./src/app/app.js');

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
