/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sources/dedicatedbrand');
const adresse= require('./sources/adresse');
const mudjeans= require('./sources/mudjeans');
const Readline = require('readline'); // for reading inputs
const fs = require('fs');
const db = require('./db/index');

//https://www.dedicatedbrand.com/en/men/news
//https://adresse.paris/602-nouveautes
//https://mudjeans.eu/collections/men-buy-jeans

// CHoisir quel site puis parcourir tous les url
let AllProducts = [];

async function dedicated () {
  try {

    const pages = await dedicatedbrand.getPages('https://www.dedicatedbrand.com')

    console.log(pages);
    console.log("Nombre de lien:",pages.length);
    let NombreProduit = 0;
    for (var i = 0; i<pages.length; i++){
      console.log(pages[i]);
      const products = await dedicatedbrand.scrape(pages[i]);
      const result = await db.insert(products);
      console.log(products);
      console.log("Nombre de produits dans la page :",products.length)
      NombreProduit+=products.length;
      /*for(var i = 0;i<NombreProduit;i++){
        AllProducts.push(products[i])
      }*/
      //AllProducts.push(products);
    }    

    console.log("Nombre de produit total :",NombreProduit);

    let data = JSON.stringify(AllProducts);
    fs.writeFileSync('dedicated.json', data);
    console.log('done');
  } catch (e) {
    console.error(e);

  }
}

async function mdjeans () {
  try {
    let AllMudJeans = []
    const pages = await mudjeans.getPages('https://www.mudjeans.eu')

    console.log(pages);
    console.log("Nombre de lien:",pages.length);
    let NombreProduit = 0;
    for (var i = 0; i<pages.length; i++){
      console.log(pages[i]);
      const products = await mudjeans.scrape(pages[i]);
      const result = await db.insert(products);
      console.log(products);
      console.log("Nombre de produits dans la page :",products.length)
      NombreProduit+=products.length;
      /*for(var i = 0;i<NombreProduit;i++){
        AllProducts.push(products[i])
        AllMudJeans.push(products[i])
      }*/
      
      
    }
    //console.log(AllMudJeans)
    //const result = await db.insert(AllMudJeans)
    console.log("Nombre de produit total :",NombreProduit);

    let data = JSON.stringify(AllProducts);
    fs.writeFileSync('mdjeans.json', data);
    
    console.log('done');
  } catch (e) {
    console.error(e);
  }
} 

async function adress() {
  try {

    const products = await adresse.scrape('https://adresse.paris/630-toute-la-collection')

    console.log(products);
    /*for(var i = 0;i<products.length;i++){
        AllProducts.push(products[i])
    }*/
    const result = await db.insert(products);

    console.log("Nombre de produit total :",products.length);

    let data = JSON.stringify(products);
    fs.writeFileSync('address.json', data);

    console.log('done');
  } catch (e) {
    console.error(e);
    
  }
}


const [,, eshop] = process.argv;

const rl = Readline.createInterface({ // for reading inputs
    input : process.stdin,
    output : process.stdout,
    terminal : false
})

console.log("Which website do you want to scrap ? 1 - Adresse Paris | 2 - Dedicated Brand | 3 - Mud Jeans | 4 - All");

rl.on('line', (input) => {
  console.log(`Received: ${input}`);
  if(input == 1){
    adress();
  }
  if(input == 2){
    dedicated();
  }
  if(input == 3){
    mdjeans();
  }
  if(input==4)
  {
    adress();
    mdjeans();
    dedicated();
  }
});
