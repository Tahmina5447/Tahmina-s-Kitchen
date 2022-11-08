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
    const reviewCollection=client.db("TahminasKitchen").collection("Review");
    
    
    // Load 3 items
    app.get('/items',async(req,res)=>{
      const query={};
      const cursor=itemsCollection.find(query);
      const items=await cursor.limit(3).toArray();
      res.send(items);
    })

    // Load all items
    app.get('/allItems',async(req,res)=>{
      const query={};
      const cursor=itemsCollection.find(query);
      const allItems=await cursor.toArray();
      // console.log(allItems)
      res.send(allItems);
    })

    // add item by customer
    app.post('/allItems',async(req,res)=>{
      const review=req.body;
      const result=await itemsCollection.insertOne(review);
      res.send(result);
    })

    // get item details by id
    app.get('/itemDetails/:id',async(req,res)=>{
      const id=req.params.id;
      const query={_id:ObjectId(id)}
      const itemDetails=await itemsCollection.findOne(query);
      res.send(itemDetails);
    })

    // add review on database
    app.post('/review',async(req,res)=>{
      const review=req.body;
      const result=await reviewCollection.insertOne(review);
      res.send(result);
    })

    // get review by id
    app.get('/review',async(req,res)=>{
      let  query={};
      console.log(req.query.email)
      if(req.query.item){
        query={
          item:req.query.item
        }
      }
      
      const cursor=reviewCollection.find(query);
      const review=await cursor.toArray();
      res.send(review);
    })

    // get review by user
    app.get('/userReview',async(req,res)=>{
      let query={};
      if(req.query.email){
        query={
          email:req.query.email
        }
      }
      const cursor=reviewCollection.find(query);
      const reviews=await cursor.toArray();
      res.send(reviews);
    })

  }finally{

  }
}
run().catch(err=>console.log(err));



 app.listen(port, () => {
     console.log(` port ${port}`)
   })
