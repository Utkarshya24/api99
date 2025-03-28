
const catchAsynHandler = (asyncFunction)=>(req,res,next)=>{
    
    Promise.resolve(asyncFunction(req,res,next)).catch(next);


} 

export {catchAsynHandler};