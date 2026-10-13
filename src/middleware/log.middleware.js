const LogMiddleware = (req,res,next) => {
    console.log("Halo Saya Log Middleware")
    next()
}

export default LogMiddleware