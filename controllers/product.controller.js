const productServices = require("../services/product.services");
const upload = require("../middleware/upload");


exports.create = (req, res, next) => {
    upload(req, res, function(err) {
        if (err) {
            next(err);
        } else {
            const url = req.protocol + "://" + req.get("host");
            const path = req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";
            var model = {
                productName: req.body.productName,
                productDescription: req.body.productDescription,
                productPrice: req.body.productPrice,
                productImage: path != "" ? url + "/" + path : ""
            };
        }


        productServices.createProduct(model, (error, result) => {
            if (error) {
                return next(error);
            } else {
                return res.status(200).send({
                    message: "Succes",
                    data: result
                });
            }
        });

    })
};


exports.findAll = (req, res, next) => {
    var model = {
        productName: req.query.productName,

    };
    productServices.getProduct(model, (error, result) => {
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                message: "Succes",
                data: result
            });
        }
    });
};


exports.findOne = (req, res, next) => {
    var model = {
        productId: req.params.Id,

    };
    productServices.getProductById(model, (error, result) => {
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                message: "Succes",
                data: result
            });
        }
    });
};


exports.update = (req, res, next) => {
    upload(req, res, function(err) {
        if (err) {
            next(err);
        } else {
            const url = req.protocol + "://" + req.get("host");
            const path = req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";
            var model = {
                productId: req.params.Id,
                productName: req.body.productName,
                productDescription: req.body.productDescription,
                productPrice: req.body.productPrice,
                productImage: path != "" ? url + "/" + path : ""
            };
        }


        productServices.updateProduct(model, (error, result) => {
            if (error) {
                return next(error);
            } else {
                return res.status(200).send({
                    message: "Succes",
                    data: result
                });
            }
        });

    })
};


exports.delete = (req, res, next) => {
    var model = {
        productId: req.params.Id,

    };
    productServices.deleteProduct(model, (error, result) => {
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                message: "Succes",
                data: result
            });
        }
    });
};