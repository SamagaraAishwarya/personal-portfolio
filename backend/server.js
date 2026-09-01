require("dotenv").config();

const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Contact = require("./models/Contact");

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend files from the project root
const frontendPath = path.join(__dirname, "..");

app.use(express.static(frontendPath));

// Home page
app.get("/", function (req, res) {
    res.sendFile(path.join(frontendPath, "index.html"));
});

// Projects API
app.get("/projects", function (req, res) {
    res.json([
        {
            name: "To-Do List Application",
            description: "A task management application built using Python.",
            technologies: "Python"
        },
        {
            name: "Personal Portfolio",
            description: "A full-stack portfolio website with a working contact form and MongoDB database.",
            technologies: "HTML, CSS, JavaScript, Node.js, MongoDB"
        }
    ]);
});

// Contact API
app.post("/contact", async function (req, res) {
    try {
        const { name, email, message } = req.body;

        const newContact = new Contact({
            name: name,
            email: email,
            message: message
        });

        await newContact.save();

        res.json({
            message: "Message sent successfully!"
        });

    } catch (error) {
        console.log("Contact error:", error.message);

        res.status(500).json({
            message: "Failed to send message"
        });
    }
});

// MongoDB connection
if (process.env.MONGO_URI) {
    mongoose.connect(process.env.MONGO_URI)
        .then(function () {
            console.log("MongoDB connected successfully");
        })
        .catch(function (error) {
            console.log("MongoDB connection failed:", error.message);
        });
} else {
    console.log("MONGO_URI is not configured");
}

// Start server
app.listen(PORT, "0.0.0.0", function () {
    console.log("Server running on port " + PORT);
});