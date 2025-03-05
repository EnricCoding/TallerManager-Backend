// src/seed/seed.ts

import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

// Import models (agregando la extensión .js en las rutas)
import User from "../models/User.js";
import Workshop from "../models/Workshop.js";
import Client from "../models/Client.js";
import Appointment from "../models/Appointment.js";
import Service from "../models/Service.js";
import Invoice from "../models/Invoice.js";
import Product from "../models/Product.js";
import Stock from "../models/Stock.js";
import Transaction from "../models/Transaction.js";
import Supplier from "../models/Supplier.js";

// Load environment variables from .env file
dotenv.config();

const seedDatabase = async (): Promise<void> => {
  try {
    // Connect to MongoDB using URI from environment variables or default value
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/TallerManager",
      {}
    );
    console.log("Connected to MongoDB for seeding");

    // Clean up all collections before seeding new data
    await Promise.all([
      User.deleteMany({}),
      Workshop.deleteMany({}),
      Client.deleteMany({}),
      Appointment.deleteMany({}),
      Service.deleteMany({}),
      Invoice.deleteMany({}),
      Product.deleteMany({}),
      Stock.deleteMany({}),
      Transaction.deleteMany({}),
      Supplier.deleteMany({}),
    ]);
    console.log("Existing data cleared");

    // Create a workshop (taller)
    const workshop = await Workshop.create({
      name: "Taller Central",
      address: "Calle Principal 123",
      contact: "555-1234",
      owner: null, // This will be updated after creating the superadmin
    });
    console.log("Workshop created");

    // Hash the superadmin password (using best practices)
    const superAdminPassword = await bcrypt.hash("SuperSecurePassword!", 10);

    // Create a superadmin user
    const superAdmin = await User.create({
      name: "Administrador Principal",
      email: "admin@tallercentral.com",
      role: "superadmin",
      password: superAdminPassword,
      workshop: workshop._id,
    });
    console.log("Superadmin created");

    workshop.owner = superAdmin._id as mongoose.Types.ObjectId;
    await workshop.save();

    // Create a client
    const client = await Client.create({
      name: "Juan Pérez",
      email: "juan.perez@ejemplo.com",
      phone: "555-6789",
      serviceHistory: [],
    });
    console.log("Client created");

    // Create a service
    const service1 = await Service.create({
      name: "Cambio de neumáticos",
      price: 120,
      estimatedDuration: 60,
      workshop: workshop._id,
    });
    console.log("Service created");

    // Create an appointment for the client with the superadmin as mechanic
    const appointment = await Appointment.create({
      client: client._id,
      workshop: workshop._id,
      service: service1._id,
      mechanic: superAdmin._id,
      date: new Date(),
      status: "pending",
      notes: "Cita de prueba para cambio de neumáticos",
    });
    console.log("Appointment created");

    // Update the client service history
    client.serviceHistory.push(
      appointment._id as mongoose.Schema.Types.ObjectId
    );
    await client.save();

    // Create a supplier
    const supplier = await Supplier.create({
      name: "Proveedor de Neumáticos S.A.",
      contact: "proveedor@ejemplo.com",
      suppliedProducts: [],
      commercialTerms: "Pago a 30 días",
    });
    console.log("Supplier created");

    // Create a product (e.g., a tire)
    const product = await Product.create({
      name: "Neumático Modelo X",
      description: "Neumático de alto rendimiento para vehículos compactos",
      dimensions: "205/55 R16",
      brand: "GoodYear",
      compatibility: "Vehículos compactos",
      supplier: supplier._id,
      photoUrl: "http://example.com/neumatico.jpg",
    });
    console.log("Product created");

    // Update the supplier with the new product reference
    supplier.suppliedProducts.push(
      product._id as mongoose.Schema.Types.ObjectId
    );
    await supplier.save();

    // Create a stock entry for the product in the workshop
    await Stock.create({
      workshop: workshop._id,
      product: product._id,
      quantity: 20,
      supplier: supplier._id,
      lastUpdated: new Date(),
      status: "disponible",
    });
    console.log("Stock entry created");

    // Create an invoice for the client
    await Invoice.create({
      client: client._id,
      workshop: workshop._id,
      total: 120,
      date: new Date(),
      paymentStatus: "pending",
    });
    console.log("Invoice created");

    // Log a financial transaction for the service
    await Transaction.create({
      workshop: workshop._id,
      type: "income",
      amount: 120,
      date: new Date(),
      description: "Pago por servicio de cambio de neumáticos",
    });
    console.log("Transaction logged");

    console.log("Database seeding complete");
    process.exit(0);
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  }
};

seedDatabase();
