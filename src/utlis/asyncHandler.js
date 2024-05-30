// by promise
const asyncHandler = (fn) => { return (req,res,next) => {
   Promise.resolve(fn(req,res,next)).catch((error)=>{next(error)})
}}

// try-catch and async-await
// const asyncHandler = (fn) => {async(req,res,next)=>{
//     try {
//         await fn(req,res,next)
//     } catch (error) {
//         res.status(error.status || 500).json({
//             success : false,
//             message: error.message
//         })
//     }
// }}

export { asyncHandler };
