/**
 * Function that reads a book from the collection
 * @param {*} query The query used to search for a specific book 
 * @param {*} collection The MongoDB collection
 * @param {*} options Query options
 * @returns The result of the find operation
 */
exports.getBook = async function (query, collection, options) {
    return await collection.findOne(query, options)
}

/**
 * Function that inserts a book into the collection 
 * @param {*} query The book to be inserted
 * @param {*} collection The MongoDB collection
 * @param {*} options Query options
 * @returns The result of the insert operation
 */
exports.postBook = async function (query, collection, options) {
    return await collection.insertOne(query, options)
}

/**
 * 
 * @param {*} query The query used to search for the book
 * @param {*} collection The MongoDB collection
 * @param {*} update The book update
 * @param {*} options Query options
 * @returns The result of the update operation
 */
exports.putBook = async function (query, collection, update, options) {
    return await collection.update(query, update, options)
}

/**
 * 
 * @param {*} query The query used to specify the book to delete
 * @param {*} collection The MongoDB collection
 * @returns The result of the delete operation
 */
exports.deleteBook = async function (query, collection) {
    return await collection.deleteOne(query)
}