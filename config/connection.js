const mongoose = require("mongoose");

async function main() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("MongoDB database connected.")
    } catch (error) {
        console.error("There was an error connecting to the database: " + error);

    }
}

main();