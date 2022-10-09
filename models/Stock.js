
const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types;
const stockSchema = mongoose.Schema({
    productId: {
        type: ObjectId,
        required: true,
        ref: "Product"
    },
    name: {
        type: String,
        required: [true, "Please provide a name"],
        trim: true,
        lowercase: true,
        // unique: [true, "Name must be unique"],
        minLength: [3, "Name must be at least 3 character"],
        maxLength: [100, "Name is too large"],
    },
    description: {
        type: String,
        required: true,
    },

    unit: {
        type: String,
        required: true,
        enum: {
            values: ["kg", "litre", "pcs", "bag"],
            message: "unit value can't be {VALUE}, must be kg/litre/pcs/bag"
        }
    },
    imageURLs: [{
        type: String,
        required: true,
        validate: [validator.isURL, "wrong url"]
    }],
    price: {
        type: Number,
        required: true,
        min: [0, "Product price can't be negative"]
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, "Product quantity can't be negative"]
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["in-stock", "out-of-stock", "discontinued"],
            message: "{VALUE} is not a valid status"
        }
    },
    store: {
        name: {
            type: String,
            trim: true,
            required: [true, "Please provide a brand name"],
            lowercase: true,
            enum: {
                values: ["dhaka", "khulna", "rajshahi", "barishal", "chattogram", "rangpur", "mymensingh", "sylhet"],
                message: "{VALUE} is not a valid name"
            }
        },
        id: {
            type: ObjectId,
            required: true,
            ref: "Store"
        }
    },
    suppliedBy: {
        name: {
            type: String,
            trim: true,
            required: [true, "Please provide a brand name"],
        },
        id: {
            type: ObjectId,
            ref: "Supplier"
        }
    },
    category: {
        type: String,
        required: true
    },
    brand: {
        name: {
            type: String,
            required: true,
        },
        id: {
            type: ObjectId,
            ref: "Brand",
            required: true
        }
    },
    sellCount: {
        type: Number,
        default: 0,
        min: 0
    }
}, {
    timestamps: true,
})

stockSchema.pre('save', function (next) {
    if (this.quantity == 0) {
        this.status = "out-of-stock"
    }

    console.log("Data inserted successfully before".blue.bold)
    next()
})

const Stock = mongoose.model('Stock', stockSchema)


module.exports = Stock;