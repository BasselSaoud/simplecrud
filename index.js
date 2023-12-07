// Required Modules
const mongo = require('mongodb')
const express = require('express')

// Express configuration
const app = express()
const port = 3000
app.use(express.json())

// MongoDB configuration
const url = 'mongodb://127.0.0.1:27017'
const dbName = 'simplecrud'
const collectionName = 'books'
const client = new mongo.MongoClient(url)
const collection = client.db(dbName).collection(collectionName)

// Routing with express
app.route('/')
  .get(async (req, res) => {     // Read
    try {
        res.header({'Content-Type': 'application/json'})
        await client.connect()
        res.sendStatus(200)
    } catch(err) {
        console.log(err.message)
        res.sendStatus(500)
    } finally {
        await client.close()
    }

}).post(async (req, res) => {    // Create 
    try {
        await client.connect()
        res.sendStatus(200)
    } catch (err) {
        res.sendStatus(500)
        console.log(err.message)
    } finally {
        await client.close()
    }
}).put(async (req, res) => {     // Update
    try {
        await client.connect()
        res.sendStatus(200)
    } catch (err) {
        res.sendStatus(500)
        console.log(err.message)
    } finally {
        await client.close()
    }
}).delete(async (req, res) => {  // Delete
    try {
        await client.connect()
        res.sendStatus(200)
    } catch (err) {
        res.sendStatus(500)
        console.log(err.message)
    }finally {
        await client.close()
    }
})

// Run server
app.listen(port, () => {console.log(`Server is running on port ${port}...`)})