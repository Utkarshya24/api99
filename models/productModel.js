import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{ 
        type:String,
        required: true 
    },
    price:{
        type:Number, 
        required: true 
    },
    description:{ 
        type:String, 
        required: true,
    },
    inventoryCount:{
        type:Number, 
        required: true 
    },
    category:{ 
        type:String, 
        required: true,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
    
},{timestamps: true});


export default mongoose.model('product', productSchema);