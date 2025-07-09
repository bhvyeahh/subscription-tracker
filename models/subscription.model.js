import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema({

    name:{
        type: String,
        required: [true, "Subscription name is required"],
        trim: true,
        minLength: 3,
        maxLength: 50,
    },
    price:{
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price cannot be negative"],
    },
    currency:{
        type: String,
        required: [true, "Currency is required"],
        enum: ["USD", "EUR", "GBP", "INR", "JPY"], // Add more currencies as needed
    },

    frequency:{
        type: String,
        required: [true, "Duration is required"],
        enum: [ "Daily","Weekly","monthly", "yearly"],
    },
    category:{
        type: String,
        required: [true, "Category is required"],
        enum: ['sports', 'news', 'entertainment', 'lifestyle', 'technology', 'finance', 'politics', 'other'], // Add more categories as needed
    },
    paymentMethod:{
        type: String,
        required: [true, "Payment method is required"],
        trim: true,
    },
    status:{
        type: String,
        required: [true, "Status is required"],
        enum: ["active", "expired", "cancelled"],
        default: "active",
    },
    startDate:{
        type: Date,
        required: [true, "Start date is required"],
        validate: {
            validator: function(value) {
                return value <= Date.now();
            },
            message: "Start date cannot be in the future",
        },
    },
    renewalDate:{
        type: Date,
        required: [true, "Start date is required"],
        validate: {
            validator: function(value) {
                return value > this.startDate;
            },
            message: "Renewal date must be after the start date",
        },
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"],
        index: true, // For faster lookups
    }},{timestamps: true});

SubscriptionSchema.pre("save", function(next) {
    if (this.renewalDate) {
       const renewalPeriods = {
            Daily: 1,
            Weekly: 7,
            Monthly: 30,
            Yearly: 365
        };
        this.renewalDate = new Date(this.startDate)
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }
    if (new Date() > this.renewalDate) {
        this.status = "expired";
    }
    next();
});

const Subscription = mongoose.model("Subscription", SubscriptionSchema);   

export default Subscription;