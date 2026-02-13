use('ecommerce')

// db.products.find();

// db.products.find().pretty()

// db.products.find({ category: "Electronics" })


// db.products.find({ price: { $gt: 1000 } });

// db.products.find({ $or: [{ category: "Electronics" }, { stock: { $lt: 50 } }] })

// db.products.find({ $and: [{ category: "Electronics" }, { stock: { $lt: 50 } }] })

// db.products.find({}, { name: 1, price: 1, _id: 0 })

// db.products.find().sort({ price:-1 }).limit(2)

db.products.find().sort({ price:-1 }).skip(1).limit(2)