// require 
const express = require('express');
const bodyParser = require('body-parser');
const {PrismaClient} = require('@prisma/client');

// initialize 
const prisma = new PrismaClient();
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Create user
app.post('/user', async (req, res) => {
    const {name, email} = req.body; 

try {
    const user = await prisma.user.create({
        data: {
            name,
            email
        },
    });

    res.json(user);
} catch (error) {  
    res.status(500).json({error: 'Error in Creating user'});
}
});

// Read user
app.get ('/user', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        res.status(500).json({error: 'Error in Reading user'}); 
    }
});

// Update user
app.put('/user/:id', async (req, res) => {
    const userId = parseInt(req.params.id);
    const {name, email} = req.body;
     
    try {
        const updatedUser = await prisma.user.update({
            // require useer id to update
            where: {id: userId},
            data: {
                name,
                email
            }
        });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({error: 'Error in updating User'});
    }
});

// Delete user
app.delete('/user/:id', async (req, res) => {
    const userId = parseInt(req.params.id);

    try {
        const deletedUser = await prisma.user.delete({
            where: {id: userId},
        });

        res.json({message: 'User deleted successfully'});
    } catch (error) {
        res.status(500).json({error: 'Error in deleting User'});
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});