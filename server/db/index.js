require('dotenv').config();
const {MongoClient} = require('mongodb');
const fs = require('fs');

const MONGODB_DB_NAME = 'clearfashion';
const MONGODB_COLLECTION = 'products';
//const MONGODB_URI = 'mongodb+srv://damien:U46oRccVeWWwOIK7@cluster0.mzkea.mongodb.net/clearfashion?retryWrites=true&w=majority';
//mongodb+srv://damien:U46oRccVeWWwOIK7@cluster0.vsvlp.mongodb.net/clearfashion?retryWrites=true&w=majority
// version test mongodb+srv://damien:U46oRccVeWWwOIK7@cluster0.hyehg.mongodb.net/clearfashion?retryWrites=true&w=majority
const MONGODB_URI = 'mongodb+srv://damien:U46oRccVeWWwOIK7@cluster0.v6ojv.mongodb.net/clearfashion?retryWrites=true&w=majority';

let client = null;
let database = null;

/**
 * Get db connection
 * @type {MongoClient}
 */
const getDB = module.exports.getDB = async () => {
  try {
    if (database) {
      console.log('💽  Already Connected');
      return database;
    }

    client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
    database = client.db(MONGODB_DB_NAME);

    console.log('💽  Connected');

    return database;
  } catch (error) {
    console.error('🚨 MongoClient.connect...', error);
    return null;
  }
};

/**
 * Insert list of products
 * @param  {Array}  products
 * @return {Object}
 */
module.exports.insert = async products => {
  try {
    const db = await getDB();
    const collection = db.collection(MONGODB_COLLECTION);
    // More details
    // https://docs.mongodb.com/manual/reference/method/db.collection.insertMany/#insert-several-document-specifying-an-id-field
    const result = await collection.insertMany(products, {'ordered': false});

    return result;
  } catch (error) {
    console.error('🚨 collection.insertMany...', error);
    fs.writeFileSync('products.json', JSON.stringify(products));
    return {
      'insertedCount': error.result.nInserted
    };
  }
};

/**
 * Find products based on query
 * @param  {Array}  query
 * @return {Array}
 */
module.exports.find = async query => {
  try {
    const db = await getDB();
    const collection = db.collection(MONGODB_COLLECTION);
    const result = await collection.find(query).toArray();

    return result;
  } catch (error) {
    console.error('🚨 collection.find...', error);
    return null;
  }
};

//Fonction pour prendre un certain article en fonction de l'id

module.exports.findById = async id => {
  try{
    const db = await getDB();
    const collection = db.collection(MONGODB_COLLECTION);
    const result = await collection.find({'_id':id}).toArray();

    return result;
    }
    catch (error) {
    console.error('🚨 collection.find...', error);
    return null;
  }  
}

module.exports.findByBrand = async (brand,price) => {
  try{
    const db = await getDB();
    const collection = db.collection(MONGODB_COLLECTION);
    const result = await collection.find({'brand':brand, 'price':{$lte:price}}).sort({'price':1}).toArray();

    return result;
    }
    catch (error) {
    console.error('🚨 collection.find...', error);
    return null;
  }  
}
module.exports.findWithoutPrice= async (brand) => {
  try{
    const db = await getDB();
    const collection = db.collection(MONGODB_COLLECTION);
    const result = await collection.find({'brand':brand, "price":{$ne:Number("Nan")}}).sort({'price':1}).toArray();

    return result;
    }
    catch (error) {
    console.error('🚨 collection.find...', error);
    return null;
  }  
}
module.exports.findWithoutBrand= async (price) => {
  try{
    const db = await getDB();
    const collection = db.collection(MONGODB_COLLECTION);
    const result = await collection.find({'price':{$lte:price}}).sort({'price':1}).toArray();

    return result;
    }
    catch (error) {
    console.error('🚨 collection.find...', error);
    return null;
  }  
}
/*module.exports.findWithLimit= async (limit) => {
  try{
    const db = await getDB();
    const collection = db.collection(MONGODB_COLLECTION);
    const result = await collection.find().limit(limit).sort({'price':1}).toArray();

    return result;
    }
    catch (error) {
    console.error('🚨 collection.find...', error);
    return null;
  }  
}
*/
/**
 * Close the connection
 */
module.exports.close = async () => {
  try {
    await client.close();
  } catch (error) {
    console.error('🚨 MongoClient.close...', error);
  }
};

