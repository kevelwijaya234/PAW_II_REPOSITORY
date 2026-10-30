const logMiddleware = (req,res,next) => {
    console.log("Halo Saya Log Middleware")
    next()
}

export default logMiddleware