import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "./src/models/User.js";
import connectMongoose from "./src/config/db.js";

// Load environment variables
dotenv.config();

const adminData = {
  name: "Admin",
  username: "admin",
  password: "admin",
  email: "admin@gmail.com",
  phone: "08123456789",
  role: "admin",
};

const seedAdmin = async () => {
  try {
    // Connect to database using existing config
    await connectMongoose();
    console.log("Starting admin seeding process...");

    // Check if admin already exists
    const existingAdmin = await User.findOne({
      $or: [{ username: adminData.username }, { email: adminData.email }],
    });

    if (existingAdmin) {
      console.log("Admin user already exists:");
      console.log(`Username: ${existingAdmin.username}`);
      console.log(`Email: ${existingAdmin.email}`);
      console.log(`Role: ${existingAdmin.role}`);
      return;
    }

    // Hash password
    const passwordHash = await bcrypt.hash(adminData.password, 10);

    // Create admin user
    const adminUser = new User({
      name: adminData.name,
      username: adminData.username,
      email: adminData.email,
      phone: adminData.phone,
      passwordHash: passwordHash,
      role: adminData.role,
    });

    const savedAdmin = await adminUser.save();

    console.log("Admin user created successfully!");
    console.log("User Details:");
    console.log(`ID: ${savedAdmin._id}`);
    console.log(`Name: ${savedAdmin.name}`);
    console.log(`Username: ${savedAdmin.username}`);
    console.log(`Email: ${savedAdmin.email}`);
    console.log(`Phone: ${savedAdmin.phone}`);
    console.log(`Role: ${savedAdmin.role}`);
    console.log("");
    console.log("Login Credentials:");
    console.log(`Username: ${adminData.username}`);
    console.log(`Password: ${adminData.password}`);
  } catch (error) {
    console.error("Error seeding admin user:", error);

    // Handle specific errors
    if (error.code === 11000) {
      console.error(
        "Duplicate key error - user with this username/email already exists"
      );
    }
  } finally {
    // Close database connection
    await mongoose.connection.close();
    console.log("Database connection closed");
    process.exit(0);
  }
};

// Handle process termination
process.on("SIGINT", async () => {
  console.log("\n Seeding process interrupted");
  await mongoose.connection.close();
  process.exit(0);
});

// Run the seed
console.log("Starting admin seed script...");
seedAdmin();
