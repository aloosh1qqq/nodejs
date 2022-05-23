const { product } = require("../models/product.model");


async function createProduct(params, callback) {
    if (!params.productName) {
        return callback({
                message: "Prodct Name Required",
            },
            ""
        );
    }

    const productModel = product(params);
    productModel.save().then((response) => {
        return callback(null, response);
    }).catch((err) => {
        return callback(err);
    });
}

async function getProduct(params, callback) {
    const productName = params.productName;
    var condition = productName ? {
        productName: { $regex: new RegExp(productName), $option: "i" },
    } : {};


    product
        .find(condition)
        .then((response) => {
            return callback(null, response);
        }).catch((err) => {
            return callback(err);
        });
}

async function getProductById(params, callback) {
    const productId = params.productId;


    product
        .findById(productId)
        .then((response) => {
            if (!response) callback("product Id invaled")
            else
                return callback(null, response);
        }).catch((err) => {
            return callback(err);
        });
}

async function updateProduct(params, callback) {
    const productId = params.productId;


    product
        .findByIdAndUpdate(productId, params, { useFindAndModify: false })
        .then((response) => {
            if (!response) callback("product Id invaled")
            else return callback(null, response);
        }).catch((err) => {
            return callback(err);
        });
}

async function deleteProduct(params, callback) {
    const productId = params.productId;
    product
        .findByIdAndDelete(productId)
        .then((response) => {
            if (!response) callback("product Id invaled")
            else
                return callback(null, response);
        }).catch((err) => {
            return callback(err);
        });
}


module.exports = {
    createProduct,
    getProduct,
    getProductById,
    updateProduct,
    deleteProduct,
};