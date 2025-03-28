import ProductModel from "../models/productModel.js";
import {catchAsynHandler} from "../middleware/catchAsyncError.js"
import productModel from "../models/productModel.js";

export const getProduct = catchAsynHandler(async (req, res, next) => {
    try {
        const page = req.query.page;
        const limit = 10;
        const skip = (page-1) * limit;
        
        
        const product = await ProductModel.find({createdBy:req.user._id}).sort({createdAt:-1}).skip(skip).limit(limit);
        
        const totalProducts = await ProductModel.countDocuments({createdBy:req.user._id});

        
        res.status(200).json({ success: true, product , totalProducts});    
    } catch (error) {
        res.status(500).json({success:false, msg:"some internal error" , error});
    }

});


export const uploadProduct = catchAsynHandler(async (req, res, next) => {

    try {
        const {name, price, description, inventoryCount, category}=req.body;
    
        const product = await productModel.create({
            name,
            price,
            description,
            inventoryCount,
            category,
            createdBy:req.user._id
    
        })
        res.status(200).json({ success: true, product });
    } catch (error) {
        res.status(500).json({success:false, msg:"some internal error" , error});
    }

});
