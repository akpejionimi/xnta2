const db = require("../config/database");
const Sequelize = require("sequelize");
const moment = require("moment");

//Staff Table
class Staff extends Sequelize.Model { }
Staff.init({
    staffId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
    },
    fullName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'FullName'
            }
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
    },
    department: {
        type: Sequelize.ENUM,
        values: ['Operations', 'Sales', 'Administration'],
        defaultValue: 'Operations'
    },
    status: {
        type: Sequelize.ENUM,
        values: ['Active', 'Inactive', 'Pending'],
        defaultValue: 'Active'
    },
    phoneNo: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: 'Enter Phone number'
            }
        }
    },
    status: {
        type: Sequelize.ENUM,
        values: ['Active', 'Inactive', 'Pending'],
        defaultValue: 'Active'
    },
    gender: {
        type: Sequelize.ENUM,
        values: ['Male', 'Female'],
        defaultValue: 'Male'
    },
    dateEmployed: {
        type: Sequelize.DATE,
        allowNull: true
    },
    entryDate: {
        type: Sequelize.DATE,
        allowNull: true

    }
}, {
        sequelize: db,
    });

//Operator Table
class Operators extends Sequelize.Model { }
Operators.init({
    operatorId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: 'Enter username'
            }
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    operatorLevel: {
        type: Sequelize.ENUM,
        values: ['SuperAdmin', 'Inputter', 'Authoriser'],
        defaultValue: 'Inputter'
    }
}, {
        sequelize: db,
    });

//Customer Table
class Customer extends Sequelize.Model { }
Customer.init({
    customerId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fullName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Enter Name'
            }
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
    },
    accountNo: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    phoneNo: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            // min: 0,
            // max: 11,
            notNull: {
                msg: 'Enter Phone number'
            }
        }
    },
    status: {
        type: Sequelize.ENUM,
        values: ['Active', 'Inactive', 'Pending'],
        defaultValue: 'Active'
    },
    gender: {
        type: Sequelize.ENUM,
        values: ['Male', 'Female'],
        defaultValue: 'Male'
    },
    registrationDate: {
        type: Sequelize.DATE,
        allowNull: true
    },
    entryDate: {
        type: Sequelize.DATE,
        allowNull: true
    }
}, {
        sequelize: db,
    });

//Savings Table
class Savings_Products extends Sequelize.Model { }
Savings_Products.init({
    productId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    productName: {
        type: Sequelize.STRING
    },
    moneyValue: {
        type: Sequelize.DOUBLE(11, 2)
    },
    productDuration: {
        type: Sequelize.INTEGER(4).ZEROFILL

    },
    // productLogo: {
    //     type: Sequelize.STRING,
    //     allowNull: true
    // }

}, {
        sequelize: db,
    });

//Product Subscription Table
class ProductSubscription extends Sequelize.Model { }
ProductSubscription.init({
    prodSubId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    signUpDate: {
        type: Sequelize.DATE,
        get() {
            return moment(this.getDataValue('signUpDate')).format('DD-MM-YYYY');
        }
    },
}, {
        sequelize: db,
    });

//Product Payment Table
class Product_Payment extends Sequelize.Model { }
Product_Payment.init({
    paymentId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    paymentValue: {
        type: Sequelize.DOUBLE(11, 2)
    },
    paymentDate: {
        type: Sequelize.DATE
    },
    authorised: {
        type: Sequelize.ENUM,
        values: ['Yes', 'No'],
        defaultValue: 'No'
    },

    // authoriser: {
    //     type: Sequelize.INTEGER,
    //     references: {
    //         model: Operators,
    //         key: 'authoriser'
    //     }
    // },
    // inputterId: {
    //     type: Sequelize.INTEGER,
    //     references: {
    //         model: Operators,
    //         key: 'inputterId'
    //     }
    // }
}, {
        sequelize: db,
    });

//Fiscal Year Table
class Fiscal_Year extends Sequelize.Model { }
Fiscal_Year.init({
    fiscalYearId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    yearName: {
        type: Sequelize.INTEGER,
        validate: {
            min: 0,
            max: 4
        }
    },
    dateCreated: {
        type: Sequelize.DATE
    }
}, {
        sequelize: db,
    });

//Fiscal Month Table
class Fiscal_Month extends Sequelize.Model { }
Fiscal_Month.init({
    fiscalMonthId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    monthName: {
        type: Sequelize.INTEGER,
        validate: {
            min: 0,
            max: 4
        }
    },
    dateCreated: {
        type: Sequelize.DATE
    }
}, {
        sequelize: db,
    });

//Association( realtionship between tables)

//Staff & Operator
Staff.hasOne(Operators, { foreignKey: 'staffId' });

//ProductSubscription & (customer/Products)
ProductSubscription.belongsTo(Customer, { foreignKey: 'customerId' });
ProductSubscription.belongsTo(Savings_Products, { foreignKey: 'productId' });

//Payment & (customer/Products)
// Product_Payment.belongsTo(Customer, { foreignKey: 'customerId' });
// Product_Payment.belongsTo(Savings_Products, { foreignKey: 'productId' });
Product_Payment.belongsTo(ProductSubscription, { foreignKey: 'prodSubId' });

//Fiscal Year & Fiscal Month
Fiscal_Year.belongsTo(Fiscal_Month, { foreignKey: 'fiscalMonthId' })

//Export all tables to controller
module.exports = {
    Operators,
    Staff,
    Customer,
    Savings_Products,
    ProductSubscription,
    Product_Payment,
    Fiscal_Year,
    Fiscal_Month
}