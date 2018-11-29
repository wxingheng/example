module.exports = option => {
    return async (ctx, next) => {
        console.log(option.format(ctx.url));
        await next();
    }
}