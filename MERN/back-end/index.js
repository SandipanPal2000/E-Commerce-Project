const express = require("express");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const PORT = 8080;
const app = express();
const cors = require("cors");
const json = require("body-parser").json;

app.use(cors());
app.use(json());

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    color: { type: String, required: true },
    details: Object,
    image: { type: String, required: true },
  },
  { timestamps: true }
);

const cartSchema = new Schema(
  {
    items: { type: [Object], required: true, default: [] },
    userId: { type: String, default: 1 },
  },
  { timestamps: true }
);

const userSchema = new Schema(
  {
    name: String,
    email: String,
    addresses: { type: [Object], default: [] },
    orders: [Object],
  },
  { timestamps: true }
);

const Product = new mongoose.model("Product", productSchema);
const Cart = new mongoose.model("Cart", cartSchema);
const User = new mongoose.model("User", userSchema);

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
  console.log("Server Connected");
}

/*app.get("/createProduct", (req, res) => {
  let product = new Product({
    name: "Apple Watch (2nd Gen) Water Resistant",
    category: "Smart Watches",
    price: 28899,
    rating: 5,
    color: "black",
    details: {
      product: "",
      warranty: "",
      merchant: "",
    },
    image: "8",
  });
  product
    .save()
    .then((success) => {
      res.send(success);
    })
    .catch((err) => {
      res.send(err);
    });
});*/

// app.get("/createUser", (req, res) => {
//   let user = new User({
//     name: "ABC",
//     email: "abc@example.com",
//     orders: [],
//     addresses: [],
//   });
//   user.save().then((usr) => {
//     return res.send(usr);
//   });
// });

app.get("/user", (req, res) => {
  User.findOne({}).then((result) => {
    return res.send(result);
  });
});

app.get("/product", (req, res) => {
  Product.find({}).then((result) => {
    res.send(result);
  });
});

app.post("/cart", (req, res) => {
  const userId = "6463a642ffeefcc462337baa";
  const item = req.body.item;
  if (!item.quantity) {
    item.quantity = 1;
  }
  Cart.findOne({ userId: userId }).then((result) => {
    if (result) {
      const itemIndex = result.items.findIndex((it) => it._id == item._id);
      if (itemIndex >= 0) {
        result.items.splice(itemIndex, 1, item);
      } else {
        result.items.push(item);
      }
      result.save().then((cart) => {
        return res.send(cart);
      });
    } else {
      let cart = new Cart();
      cart.userId = userId;
      cart.items = [item];
      cart.save().then((cart) => {
        return res.send(cart);
      });
    }
  });
});

app.get("/cart", (req, res) => {
  const userId = "6463a642ffeefcc462337baa";
  Cart.findOne({ userId: userId }).then((result) => {
    if (result) {
      return res.send(result);
    } else {
      return res.send({ userId: 1, items: [] });
    }
  });
});

app.post("/removeItem", (req, res) => {
  const userId = "6463a642ffeefcc462337baa";
  const item = req.body.item;
  Cart.findOne({ userId: userId }).then((result) => {
    const itemIndex = result.items.findIndex((it) => it._id == item._id);
    result.items.splice(itemIndex, 1);
    result.save().then((cart) => {
      return res.send(cart);
    });
  });
});

app.post("/emptyCart", (req, res) => {
  const userId = "6463a642ffeefcc462337baa";
  Cart.findOne({ userId: userId }).then((result) => {
    //const itemIndex = result.items.findIndex((it) => it._id == item._id);
    result.items = [];
    result.save().then((cart) => {
      return res.send(cart);
    });
  });
});

app.post("/updateUserAddress", async (req, res) => {
  const userId = "6463a642ffeefcc462337baa";
  const addresses = req.body.address;
  User.findOne({ _id: userId }).then((user) => {
    console.log(user);
    user.addresses.push(addresses);
    user.save().then((user) => {
      return res.send(user.addresses);
    });
  });
});

app.post("/order", (req, res) => {
  const userId = "6463a642ffeefcc462337baa";
  const order = req.body.order;
  User.findOne({ _id: userId }).then((user) => {
    user.orders.push(order);
    user.save().then((user) => {
      return res.send(order);
    });
  });
});

app.listen(PORT, () => {
  console.log("listen on PORT:", PORT);
});
