class AppError extends Error{
    constructor(msg,code){
        super();
        this.msg = msg;
        this.code = code;
    }
}

const createError = (msg,code)=>{
    return new AppError(msg,code)
}

module.exports = {
    AppError,
    createError
}