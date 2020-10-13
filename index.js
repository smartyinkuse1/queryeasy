const queryEasy = (options) => async (req, res, next) => {
    let query
    let requestQuery
    if (!options.model) {
        const err = new Error("Mongoose Model is required at query-easy")
        console.error(err); 
        // next(new Error("Mongoose Model is required at query-easy"))
        return next(err)  
        
    }
    // Copy req.query and otherQueries
    if (options.customQuery) {
        requestQuery = { ...req.query, ...options.customQuery } 
    } else {
        requestQuery = { ...req.query } 
    }

    // Fields to exclude
    const removeFields = ["select", "sort", "page", "limit"]

    // Loop over removeFields and delelte them from requestQuery
    removeFields.forEach((param) => delete requestQuery[param])

    // Create query string
    let queryString = JSON.stringify(requestQuery)

    // Create operators: gt, gte, lt, lte, in
    queryString = queryString.replace(
        /\b(gt|gte|lt|lte|in)\b/g,
        (match) => `$${match}`
    )

    // Finding resources
    // console.log(queryString);
    query = options.model.find(JSON.parse(queryString))

    if (options.populateFields) {
        options.populateFields.map((populateField) => {
            query = query.populate(populateField)
        })
    }

    // Select Fields
    if (req.query.select) {
        const fields = req.query.select.split(",").join(" ")

        query = query.select(fields)
    }

    // Sort records
    if (req.query.sort) {
        const sortByFields = req.query.sort.split(",").join(" ")

        query = query.sort(sortByFields)
    } else {
        query = query.sort("-createdAt")
    }

    // Pagination
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 25
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const total = await options.model.countDocuments()

    query = query.skip(startIndex).limit(limit)

    // Executing query
    const queryResults = await query

    // Pagination result
    const pagination = {}

    if (endIndex < total) {
        pagination.nextPage = {
            page: page + 1,
            limit,
        }
    }

    if (startIndex > 0) {
        pagination.previousPage = {
            page: page - 1,
            limit,
        }
    }

    res.results = {
        error: false,
        count: queryResults.length,
        pagination,
        data: queryResults,
    }
    next()
}

module.exports.queryEasy = queryEasy