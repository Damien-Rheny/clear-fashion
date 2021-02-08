/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sources/dedicatedbrand');
const adresse= require('./sources/adresse');
const mudjeans= require('./sources/mudjeans');
//https://www.dedicatedbrand.com/en/men/news
//https://adresse.paris/602-nouveautes
//https://mudjeans.eu/collections/men-buy-jeans

// CHoisir quel site puis parcourir tous les url
let AllProducts = [];
/*async function sandbox (eshop) {
  try {

    const pages = await dedicatedbrand.getPages('https://www.dedicatedbrand.com')

    console.log(pages);
    console.log("Nombre de lien:",pages.length);
    let NombreProduit = 0;
    for (var i = 0; i<pages.length; i++){
      console.log(pages[i]);
      const products = await dedicatedbrand.scrape(pages[i]);
      console.log(products);
      console.log("Nombre de produits dans la page :",products.length)
      NombreProduit+=products.length;
      AllProducts.push(products);
    }
    
    /*for (var i = 0; i<AllProducts.length; i++){
      NombreProduit+=AllProducts[i].length;
    }*//*
    console.log("Nombre de produit total :",NombreProduit);
    //console.log(:woman_detective:  browsing ${eshop} source;

    //const products = await dedicatedbrand.scrape(eshop);
    /*
    const products = await mudjeans.scrape(eshop);
    console.log(products);
    *//*
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}*/
/*async function sandbox (eshop) {
  try {

    const pages = await mudjeans.getPages('https://www.mudjeans.eu')

    console.log(pages);
    console.log("Nombre de lien:",pages.length);
    let NombreProduit = 0;
    for (var i = 0; i<pages.length; i++){
      console.log(pages[i]);
      const products = await mudjeans.scrape(pages[i]);
      console.log(products);
      console.log("Nombre de produits dans la page :",products.length)
      NombreProduit+=products.length;
      AllProducts.push(products);
    }
    
    /*for (var i = 0; i<AllProducts.length; i++){
      NombreProduit+=AllProducts[i].length;
    }*//*
    console.log("Nombre de produit total :",NombreProduit);
    //console.log(:woman_detective:  browsing ${eshop} source;

    //const products = await dedicatedbrand.scrape(eshop);
    /*
    const products = await mudjeans.scrape(eshop);
    console.log(products);
    *//*
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
*/
async function sandbox (eshop) {
  try {

    const products = await adresse.scrape('https://adresse.paris/630-toute-la-collection')

    console.log(products);

    console.log("Nombre de produit total :",products.length);

    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
const [,, eshop] = process.argv;

sandbox(eshop);
//