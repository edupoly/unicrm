const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { execSync } = require("child_process");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Targeted directory
const serverPath = path.join(__dirname, "server");
const envPath = path.join(serverPath, ".env");

function ask(question) {
    return new Promise((resolve) => rl.question(question, resolve));
}

(async () => {
    try {
        if (!fs.existsSync(envPath)) {
            // Added .trim() to prevent broken connection strings from accidental spaces
            const username = (await ask("Postgres Username: ")).trim();
            const password = (await ask("Postgres Password: ")).trim();
            const host = (await ask("Postgres Host (default: localhost): ")).trim() || "localhost";
            const dbName = (await ask("Postgres Database Name (default: postgres): ")).trim() || "postgres";
            const jwtSecretKey = (await ask("JWT Secret Key: ")).trim() || "unicrm_edupoly_starterwave";

            const envContent = `DATABASE_URL="postgresql://${username}:${password}@${host}:5432/${dbName}?schema=public"
PORT=4444
NODE_ENV=dev
JWT_SECRET_KEY=${jwtSecretKey}
BCRYPT_SALT_ROUNDS=10
`;

            fs.writeFileSync(envPath, envContent.trim());
            console.log(".env file successfully created in /server");
        }

        console.log("\n1. Pushing Prisma schema to database...");
        execSync("npx prisma db push", {
            cwd: serverPath,
            stdio: "inherit",
        });

        // FIXED: Added generation step so the client is updated before seeding
        console.log("\n2. Generating Prisma Client types...");
        execSync("npx prisma generate", {
            cwd: serverPath,
            stdio: "inherit",
        });

        console.log("\n3. Seeding database...");
        execSync("npx prisma db seed", {
            cwd: serverPath,
            stdio: "inherit",
        });

        console.log("\nSetup completed successfully!");
    } catch (error) {
        console.error("\nSetup failed during execution:", error.message);
    } finally {
        rl.close();
    }
})();
