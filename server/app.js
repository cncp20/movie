const koa = require("koa");
const views = require("koa-views");
const staticServer = require("koa-static");
const router = require("./router");
const {
    resolve
} = require("path");
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/movie");

const app = new koa();
app.use(router.routes()).use(router.allowedMethods());
app.use(staticServer(__dirname + "/views"));
app.use(views(resolve(__dirname, "./tpl"), {
    extension: "ejs"
}));
app.use(async (ctx, next) => {
    await ctx.render("home", {
        arr: [{
            title: "title1",
            desc: "desc1"
        }, {
            title: "title2",
            desc: "desc2"
        }, {
            title: "title3",
            desc: "desc3"
        }]
    });
});
app.listen(2333);