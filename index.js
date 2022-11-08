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
    
    // Load all items
    app.get('/items',async(req,res)=>{
      const query={};
      const cursor=itemsCollection.find(query);
      const items=await cursor.limit(3).toArray();
      res.send(items);
    })

    app.get('/allItems',async(req,res)=>{
      const query={};
      const cursor=itemsCollection.find(query);
      const allItems=await cursor.toArray();
      res.send(allItems);
    })

    // get item details
    app.get('/itemDetails/:id',async(req,res)=>{
      const id=req.params.id;
      const query={_id:ObjectId(id)}
      const itemDetails=await itemsCollection.findOne(query);
      res.send(itemDetails);
    })

  }finally{

  }
}
run().catch(err=>console.log(err));



 app.listen(port, () => {
     console.log(` port ${port}`)
   })
