// Required Modules
const mongo = require('mongodb')
const express = require('express')
const bookModule = require('./modules/books')

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
        res.body = await bookModule.getBook(req.body, collection)
        if(res.body == null)
            res.sendStatus(404)
        else
            res.status(200).send(res.body)
    } catch(err) {
        console.log(err.message)
        res.sendStatus(500)
    } finally {
        await client.close()
    }

}).post(async (req, res) => {    // Create 
    try {
        res.header({'Content-Type': 'application/json'})
        await client.connect()
        res.body = await bookModule.postBook(req.body, collection)
        res.status(201).send(res.body)
    } catch (err) {
        if(err.message.includes('dup key'))
            res.status(400).send(`A book with this _id already exists`)
        else {
            res.sendStatus(500)
            console.log(err.message)
        }
    } finally {
        await client.close()
    }
}).delete(async (req, res) => {  // Delete
    try {
        res.header({'Content-Type': 'application/json'})
        await client.connect()
        res.body = await bookModule.deleteBook(req.body, collection)
        if(res.body.deletedCount == 0) {
            throw new Error('Not Found')
        }
        res.status(200).send(res.body)
    } catch (err) {
        if(err.message == 'Not Found')
            res.sendStatus(404)
        else {
            res.sendStatus(500)
            console.log(err.message)
        }
    }finally {
        await client.close()
    }
})
app.put('/:title', async (req, res) => {     // Update
    try {
        const query = { title: req.params.title }
        res.header({'Content-Type': 'application/json'})
        await client.connect()
        res.body = await bookModule.putBook(query, collection, req.body)
        if(res.body.modifiedCount == 0)
            res.sendStatus(404)
        else
            res.status(200).send(res.body)
    } catch (err) {
        res.sendStatus(500)
        console.log(err.message)
    } finally {
        await client.close()
    }
})

// Run server
app.listen(port, () => {console.log(`Server is running on port ${port}...`)})