const { Savings_Products } = require("../models/operatorModel");

exports.getAllSavingsProducts = (req, res) => {

    Savings_Products.findAll({
        include: [
            {
                all: true,
                attributes: { exclude: ["createdAt", "updatedAt"] }
            }
        ]
    })
        .then(savingsProducts => {
            res.json(savingsProducts);
        })
        .catch(err => console.log(err))
}

//Create Savings Products
exports.postAddSavingsProducts = (req, res, next) => {
    const { productName, moneyValue, productDuration } = req.body;
    if (!productName || !moneyValue || !productDuration) {
        res.status(400).json({ msg: 'All fields are required' });
    } else {
        Savings_Products.create({
            productName,
            productDuration,
            moneyValue

        })
            .then((savingsProducts => {
                res.json(savingsProducts);
            }))
            .catch((err) => res.status(400).send({
                msg: "something went wrong",
                Error: err
            }));
    }

}

exports.getSavingsProductById = (req, res) => {
    const productId = req.params.productId;
    Savings_Products.findOne({
        where: {
            productId: productId
        }
    })
        .then(product => {
            if (!product) {
                res.status(404).json({ success: false, msg: "product not Found" });
            } else {
                res.json(product);
            }
        })
        .catch(err =>
            res.status(500).json({
                success: false,
                msg: "Something went wrong while getting the product"
            })
        );
};

exports.postUpdateSavingsProduct = (req, res, next) => {
    const { productName, moneyValue, productDuration } = req.body;
    const productId = req.params.productId;
    Savings_Products.findByPk(productId)
        .then((product) => {
            product.update({
                productName,
                moneyValue,
                productDuration
            })
                .then(product => {
                    res.json(product);
                }).catch((err) => next(err))

        })
        .catch(err =>
            res
                .status(500)
                .json({ msg: "product does not exist", error: err })
        );
};

exports.deleteSavingsProduct = (req, res) => {
    const productId = req.params.productId;
    Savings_Products.findByPk(productId)
        .then(product => {
            product
                .destroy()
                .then(() => {
                    res.json({ success: true });
                })
                .catch(err => res.json({ success: false }));
        }
        )
        .catch(err =>
            res.json({ success: false, msg: "This product doesnt exists" })
        );
};
