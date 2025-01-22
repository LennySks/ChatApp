// backend/src/seeds/fakeUser.seed.ts
import {config} from "dotenv";
import {connectDB} from "../utils/db";
import {User} from "../models/user.model";
import {faker} from "@faker-js/faker";

config();

const seedFakeUsers = async () => {
    try {
        await connectDB();

        const fakeUsers = [];
        for (let i = 0; i < 20; i++) {
            fakeUsers.push({
                email: faker.internet.email(),
                fullName: faker.name.fullName(),
                password: faker.internet.password(),
                profilePic: faker.image.avatar(),
            });
        }

        await User.insertMany(fakeUsers);
        console.log("Database seeded with fake users successfully");
    } catch (error) {
        console.error("Error seeding database with fake users:", error);
    }
};

// Call the function
seedFakeUsers();