// Required Modules
const client = require('mongodb')
const express = require('express')

// Express configuration
const app = express()
const port = 3000
app.use(express.json())

// MongoDB configuration

// Routing with express
app.route('/')
  .get(async (req, res) => {     // Read
    res.header({'Content-Type': 'application/json'})
    res.sendStatus(200)
}).post(async (req, res) => {    // Create 
    try {
    console.log(req.body)
    res.sendStatus(201)
    } catch (err) {
        res.sendStatus(500)
        console.log(err.message)
    }
}).put(async (req, res) => {     // Update
    res.sendStatus(200)
}).delete(async (req, res) => {  // Delete
    res.sendStatus(200)
})

// Run server
app.listen(port, () => {console.log(`Server is running on port ${port}...`)})