const MongoClient = require('mongodb');
const MONGODB_URI = 'mongodb+srv://damien:U46oRccVeWWwOIK7@cluster0.mzkea.mongodb.net/clearfashion?retryWrites=true&w=majority';
const MONGODB_DB_NAME = 'clearfashion';

async function test(){
	const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
	const db =  client.db(MONGODB_DB_NAME);
}
test();
