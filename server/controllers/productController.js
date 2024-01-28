import Product from "../models/Product.js";

const getAll = async (req, res) => {
  const products = await Product.find();
  res.send(products);
};

const getById = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  res.send(product);
};

const getByToken = async (req, res) => {
  const token = req.params.token;
  const product = await Product.findOne({ token: token });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product was not found" });
  }
};

export { getAll, getById, getByToken };
