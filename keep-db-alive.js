const { MongoClient } = require('mongodb');

async function pingDatabase() {
  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();
    await client.db().command({ ping: 1 });
    console.log('✅ Database ping successful at', new Date().toISOString());
  } finally {
    await client.close();
  }
}

pingDatabase().catch(console.error);