// routes/userRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const path = require('path');
const { readData, writeData } = require('../utils/fileUtils');

const router = express.Router();
const userDataPath = path.join(__dirname, '..', 'data', 'users.json');

router.get('/register', (req, res) => {
    res.render('register', { title: 'Register' });
});

router.post('/register', async (req, res) => {
    const { name, age, goals, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { id: Date.now().toString(), name, age, goals, password: hashedPassword, entries: [] };
        let users = await readData(userDataPath);
        users.push(newUser);
        await writeData(userDataPath, users);
        res.redirect(`/users/profile/${newUser.id}`);
    } catch (err) {
        res.status(500).send('Error registering new user');
    }
});

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

router.post('/login', async (req, res) => {
    const { name, password } = req.body;
    try {
        const users = await readData(userDataPath);
        const user = users.find(u => u.name === name);
        if (user && await bcrypt.compare(password, user.password)) {
            res.redirect(`/users/profile/${user.id}`);
        } else {
            res.status(400).send('Invalid credentials');
        }
    } catch (err) {
        res.status(500).send('Error logging in');
    }
});

router.get('/profile/:id', async (req, res) => {
    try {
        const users = await readData(userDataPath);
        const user = users.find(u => u.id === req.params.id);
        if (user) {
            res.render('profile', { title: 'Profile', user });
        } else {
            res.status(404).send('User not found');
        }
    } catch (err) {
        res.status(500).send('Error fetching user profile');
    }
});

router.post('/profile/:id/entry', async (req, res) => {
    const { id } = req.params;
    const { date, calories, protein, fat, carbohydrates, exercise } = req.body;
    try {
        let users = await readData(userDataPath);
        const userIndex = users.findIndex(u => u.id === id);
        if (userIndex !== -1) {
            const newEntry = { date, calories, protein, fat, carbohydrates, exercise };
            users[userIndex].entries.push(newEntry);
            await writeData(userDataPath, users);
            res.redirect(`/users/profile/${id}`);
        } else {
            res.status(404).send('User not found');
        }
    } catch (err) {
        res.status(500).send('Error adding nutrition entry');
    }
});

router.get("/logout", async(req, res) => {
    res.render('index');
})

module.exports = router;
