const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Essentials Middleware

// Allows requests from the frontend (React)
app.use(cors());

// Allows reading JSON data from req.body
app.use(express.json());

// In-memory temporary database (for testing)
const users = [
    {
        username: "admin",
        password: "Password1!"
    }
];

// Registration route (for the newAccount form)
app.post("/api/auth/signup", (req, res) => {
    const { username, password } = req.body;

    const existingUser = users.find((u) => u.username === username);
    if (existingUser) {
        return res.status(400).json({ message: "Acest nume exista deja!" })
    }

    users.push({ username, password });
    console.log("Utilizatori inregistrati:", users);
    res.status(201).json({ message: "Cont creat cu succes!" });
});

// Authentication route (used by SignInForm)
app.post("/api/auth/signin", (req, res) => {
    const { username, password } = req.body;

    const user = users.find(
        (u) => u.username === username && u.password === password
    );

    if (!user) {
        return res.status(401).json({ message: "Username sau parola incorecta!" });
    }

    // We send a dummy token and a success message.
    res.status(200).json({
        message: "Autentificare reusita!",
        token: "fake-jwt-12345",
        username: user.username,
    });
});

// Server start 
app.listen(PORT, () => {
    console.log(`Serverul ruleaza pe http://localhost:${PORT}`)
});