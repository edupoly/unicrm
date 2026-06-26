const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { execSync } = require("child_process");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const envPath = path.join(__dirname, "server", ".env");

function ask(question) {
    return new Promise((resolve) => rl.question(question, resolve));
}

(async () => {
    if (!fs.existsSync(envPath)) {
        const username = await ask("Postgres Username: ");
        const password = await ask("Postgres Password: ");
        const host = await ask("Postgres Host (localhost): ") || "localhost";
        const jwtSecretKey = await ask("JWT Secret Key: ") || "unicrm_edupoly_starterwave";
        const envContent = `
        DATABASE_URL=postgresql://${username}:${password}@${host}:5432/uni_crm?schema=public
        PORT=4444
        NODE_ENV=dev
        JWT_SECRET_KEY=${jwtSecretKey}
        BCRYPT_SALT_ROUNDS=10
        `;

        fs.writeFileSync(envPath, envContent);
        console.log(".env created");
    }

    rl.close();

    console.log("Installing Prisma schema...");
    execSync("npx prisma db push", {
        cwd: path.join(__dirname, "server"),
        stdio: "inherit",
    });

    console.log("Seeding database...");
    execSync("npx prisma db seed", {
        cwd: path.join(__dirname, "server"),
        stdio: "inherit",
    });

    console.log("Setup completed");
})();