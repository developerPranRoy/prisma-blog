
import app from "./app"
import { prisma } from "./lib/prisma";
import "dotenv/config";
import config from "./config";


const port = config.port;


async function main() {
    try {
        await prisma.$connect();
        console.log("Connected Database Succesfull");
        app.listen(port, () => {
            console.log(`Server is running on ${port}`);
        })

    } catch (error) {
        console.error("Error to starting server", error);
        await prisma.$disconnect();
        process.exit(1);

    }
}

main();