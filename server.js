require("dotenv").config();

const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Contact = require("./models/Contact");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(express.static(__dirname));

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.log("MongoDB connection failed:", error.message);
    });

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/projects", function(req, res) {
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

app.post("/contact", async function(req, res) {

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

        console.log(error);

        res.status(500).json({
            message: "Failed to send message"
        });

    }

});

app.listen(port, function() {
    console.log("Server running on http://localhost:" + port);
});
