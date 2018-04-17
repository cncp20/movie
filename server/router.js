const koaRouter = require("koa-router");
const Movie = require("./db/movie");
const router = new koaRouter();

router.get("/movies", async (ctx, next) => {
    let movies = await Movie.find({});
    ctx.body = {
        movies
    }
});
router.get("/movie/:id", async (ctx, next) => {
    let movie = await Movie.findOne({
        _id: ctx.params.id
    });
    ctx.body = {
        movie
    }
});
module.exports = router;