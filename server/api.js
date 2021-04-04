const cors = require('cors');
const express = require('express');
const helmet = require('helmet');

const db = require('./db/index');

const PORT = 8092;

const app = express();

module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());

app.get('/', (request, response) => {
  response.send({'ack': true});
})

app.get('/products/search', async(request, response) => {
  let limit = request.query.limit;
  let brand = request.query.brand;
  let price = request.query.price;
  if(brand != null && price != null && limit != null)
  {
      limit = parseInt(limit);
      price = parseInt(price);
      const result = await db.findByBrand(brand,price,limit);
      response.send({
          'limit':limit,
          'total':result.length,
          'results':result
          
      });
  }
  else if(brand != null && price != null)
  {
      price = parseInt(price);
      const result = await db.findByBrand(brand,price,10);
      response.send({
          'limit':10,
          'total':result.length,
          'results':result
          
      });
  }
  else if(brand != null && limit != null)
  {
      limit = parseInt(limit);
      const result = await db.findWithoutPrice(brand,limit);
      response.send({
          'limit':limit,
          'total':result.length,
          'results':result
          
      });
  }
  else if(price != null && limit != null)
  {
      price = parseInt(price);
      limit = parseInt(limit);
      const result = await db.findWithoutBrand(price,limit);
      response.send({
          'limit':limit,
          'total':result.length,
          'results':result
          
      });
  }
  else if(price != null)
  {
      price = parseInt(price);
      const result = await db.findWithoutBrand(price,10);
      response.send({
          'limit':10,
          'total':result.length,
          'results':result
          
      });
  }
  else if(brand != null)
  {
      const result = await db.findWithoutPrice(brand,10);
      response.send({
          'limit':10,
          'total':result.length,
          'results':result
          
      });
  }
  else if(limit != null)
  {
      limit = parseInt(limit);
      const result = await db.findWithLimit(limit);
      response.send({
          'limit':limit,
          'total':result.length,
          'results':result
          
      });
  }
  else
  {
    const result = await db.findWithLimit(10);
      response.send({
          'limit':10,
          'total':result.length,
          'results':result
      });
  }

})


app.get('/products/:id', async(request, response) => {
  	response.send(await db.findById(request.params.id));
})



app.get('/products', async (req, res) => {
  let page = parseInt(req.query.page);
  let size = parseInt(req.query.size);
  let start = (size*(page-1));
  
  console.log("start= "+start);
  console.log("end=" +start + size);
  
  let prod = []
  let counter = 0;
  
  let result = await db.find({"price":{$ne:Number("Nan")}})

  let brand = req.query.brand;
  let price = req.query.price;
  if(brand != null && price != null) 
  {
      price = parseInt(price);
      result = await db.findByBrand(brand,price);
      
  }
  else if(price != null)
  {
      price = parseInt(price);
      result = await db.findWithoutBrand(price);

  }
  else if(brand != null)
  {
      result = await db.findWithoutPrice(brand);
      //result = await db.find({'brand':brand, "price":{$ne:Number("Nan")}})

  }

  for(i=start;i<start+size;i++){
      if(result[i] != null){
        console.log(i+' '+result[i].price)
        prod.push(result[i])
        counter++;

      }

    }
  console.log(counter);
  res.send({"success":true,"data":{"result":prod,"meta":{"currentPage":page,"pageCount":Math.round(result.length/size),"pageSize":size,"count":result.length}}});
});



app.listen(PORT);
console.log(`📡 Running on port ${PORT}`);