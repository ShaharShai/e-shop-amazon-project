import Order from "../models/Order.js";

const addOrder = async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body;  

  const newOrder = new Order({
    orderItem: orderItems.map((item) => ({ ...item, product: item._id })),
    shippingAddress: shippingAddress,
    paymentMethod: paymentMethod,
    itemsPrice: itemsPrice,
    shippingPrice: shippingPrice,
    taxPrice: taxPrice,
    totalPrice: totalPrice,
    user: req.user._id,
  });

  const order = await newOrder.save();
  res.status(201).send({message: "Order added successfully! ", order})
};

const getOrderById = async (req, res) => {
    const {_id} = req.params;
    const order = await Order.findById(_id);
    if (order) {
        res.status(200).send({message: "Order found", order})
    } else {
        res.status(404).send({message: "Order not found"});
    }
}

export {
    addOrder, getOrderById
}