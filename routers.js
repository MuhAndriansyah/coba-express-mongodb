const express = require("express");
const routers = express.Router();
const client = require("./mongodb");
const ObjectId = require("mongodb").ObjectId;

routers.get("/products", async (req, res) => {
  if (client.isConnected()) {
    const db = client.db("ecommerce");

    const products = await db.collection("products").find().toArray();

    if (products.length > 1) {
      res.send({
        status: "success",
        message: "list-products",
        data: products,
      });
    } else {
      res.send({
        status: "success",
        message: "Tidak ada data",
      });
    }
  } else {
    res.send({
      status: "error",
      message: "database connection error",
    });
  }
});

routers.get("/product/:id", async (req, res) => {
  if (client.isConnected()) {
    const db = client.db("ecommerce");
    const id = req.params.id;
    const _id = ObjectId.isValid(id) ? ObjectId(id) : id;

    const product = await db.collection("products").findOne({
      _id: _id,
    });
    res.send({
      status: "success",
      message: "single product",
      data: product,
    });
  } else {
    res.send({
      status: "error",
      message: "koneksi database gagal",
    });
  }
});

routers.post("/product", async (req, res) => {
  if (client.isConnected()) {
    const { name, price } = req.body;

    const db = client.db("ecommerce");
    const product = await db.collection("products").insertOne({
      name,
      price,
    });

    if (product.insertedCount == 1) {
      res.send({
        status: "success",
        message: "tambah product success",
      });
    } else {
      res.send({
        status: "warning",
        message: "tambah product gagal",
      });
    }

    res.send("create product");
  } else {
    res.send("Error create product");
  }
});

routers.put("/product/:id", async (req, res) => {
  if (client.isConnected()) {
    const { name, price } = req.body;
    const db = client.db("ecommerce");
    const id = req.params.id;
    const _id = ObjectId.isValid(id) ? ObjectId(id) : id;

    const product = await db.collection("products").updateOne(
      {
        _id: _id,
      },
      {
        $set: {
          name,
          price,
        },
      },
    );

    if (product.matchedCount == 1) {
      res.send({
        status: "success",
        message: "update product success",
      });
    } else {
      res.send({
        status: "warning",
        message: "update product gagal",
      });
    }

    res.send("update product");
  } else {
    res.send("Error update product");
  }
});

routers.delete("/product/:id", async (req, res) => {
  if (client.isConnected()) {
    const db = client.db("ecommerce");
    const id = req.params.id;
    const _id = ObjectId.isValid(id) ? ObjectId(id) : id;

    const product = await db.collection("products").deleteOne({
      _id: _id,
    });

    if (product.deletedCount == 1) {
      res.send({
        status: "success",
        message: "delete product success",
      });
    } else {
      res.send({
        status: "warning",
        message: "delete product gagal",
      });
    }
  } else {
    res.send("Error delete product");
  }
});

module.exports = routers;
