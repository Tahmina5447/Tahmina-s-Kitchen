const express=require('express');
const app = express();
const cors = require('cors');
const port =process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.01makvu.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// console.log(uri)


async function run(){
  try{
    const itemsCollection = client.db("TahminasKitchen").collection("items");
    // const orderCollection=client.db("GeniousCarOrder").collection("order");
    

  }finally{

  }
}
run().catch(err=>console.log(err));



 app.listen(port, () => {
     console.log(` port ${port}`)
   })
