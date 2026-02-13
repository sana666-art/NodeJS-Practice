use('ecommerce');

// db.sales.find();

db.sales.getIndexes();

db.products.createIndex({ name: 1 })