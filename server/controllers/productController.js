import Product from "../models/Product.js";    

const getAll = async (req, res) => {
   const products = await Product.find();
   res.send(products);
}

export {
  getAll
}
