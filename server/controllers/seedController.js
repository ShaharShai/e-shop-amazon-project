import Product from "../models/Product.js";
import User from "../models/User.js";
import data from "../data/data.js";

const seedData = async (req, res) => {
    await Product.deleteMany();
    await Product.create(data.products);

    await User.deleteMany();
    await User.create(data.users);

    res.send({"Products": data.products , "Users": data.users});
};

export default seedData;