require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const port = process.env.PORT;
const db_url = process.env.DB_URL;
const jwt_secret_key = process.env.JWT_SECRET_KEY;

app.use(express.json());
app.use(cors());

//Database connection with MongoDB
mongoose.connect(db_url);

//API creation
app.get("/", (req, res) => {
  res.send("Express app is running");
});

//Image Storage engine
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
});

//Creating upload endpoint for images
app.use("/images", express.static("upload/images"));
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

// Schema for creating products
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  avilable: {
    type: Boolean,
    default: true,
  },
});

app.post("/addproduct", async (req, res) => {
  let products = await Product.find({}); // get all the products from database in one array
  let id;

  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }
  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });

  console.log(product);

  await product.save();
  console.log("saved");
  res.json({
    success: true,
    name: req.body.name,
  });
});

//Creating API for deleting products
app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({
    id: req.body.id,
  });

  console.log("Removed");
  res.json({
    success: true,
    name: req.body.name,
  });
});

//Creating API for getting all products

app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  console.log("All products fetched");
  res.send(products);
});

// Schema for user model

const Users = mongoose.model("Users", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Creating endpoint for register the user

app.post("/signup", async (req, res) => {
  //check already exist or not
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({
      success: false,
      errors: "Existing user found with same email address",
    });
  }
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }

  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });

  await user.save();

  //jwt authentication

  const data = {
    user: {
      id: user.id,
    },
  };

  //create token
  const token = jwt.sign(data, jwt_secret_key);

  res.json({
    success: true,
    token: token,
  });
});

// Creating endpoint for user login

app.post("/login", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, jwt_secret_key);
      res.json({
        success: true,
        token: token,
      });
    } else {
      res.json({
        success: false,
        errors: "wrong password",
      });
    }
  } else {
    res.json({
      success: false,
      errors: "wrong email id",
    });
  }
});

// Creating endpoint for new smartphones data
app.get("/new", async (req, res) => {
  let products = await Product.find({});
  let newSmartPhones = products.slice(1).slice(-4);
  console.log("New Smartphones fetched");
  res.send(newSmartPhones);
});

// Creating middleware to fetch user
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({
      errors: "Please authenticate using valid token",
    });
  } else {
    try {
      const data = jwt.verify(token, jwt_secret_key);
      req.user = data.user;
      next();
    } catch (error) {
      res.status(401).send({
        errors: "Please authenticate using a valid token",
      });
    }
  }
};

// Creating endpoint for adding products in cartdata
app.post("/addtocart", fetchUser, async (req, res) => {
  console.log("added", req.body.itemId);
  let userData = await Users.findOne({
    _id: req.user.id,
  });

  userData.cartData[req.body.itemId] += 1;

  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send("Added");
});

// Creating endpoint to remove product from cart data
app.post("/removefromcart", fetchUser, async (req, res) => {
  console.log("removed", req.body.itemId);
  let userData = await Users.findOne({
    _id: req.user.id,
  });
  if (userData.cartData[req.body.itemId] > 0) {
    userData.cartData[req.body.itemId] -= 1;

    await Users.findOneAndUpdate(
      { _id: req.user.id },
      { cartData: userData.cartData }
    );
    res.send("Removed");
  }
});

// Creating endpoint to get cartdata
app.post("/getcart", fetchUser, async (req, res) => {
  console.log("GetCart");
  let userData = await Users.findOne({
    _id: req.user.id,
  });

  res.json(userData.cartData);
});

app.listen(port, (error) => {
  if (!error) {
    console.log("Server running on port", port);
  } else {
    console.log("Error :", error);
  }
});
