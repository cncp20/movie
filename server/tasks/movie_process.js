const cp = require("child_process");
const model = require("../db/movie");
const mongoose = require("mongoose");
const {resolve} = require("path");

;(async () => {
    mongoose.connect("mongodb://127.0.0.1:27017/movie")
    const script = resolve(__dirname, "movie.js");
    const child = cp.fork(script, [])
    let invoked = false;
    child.on("error", (err) => {
        if (invoked) {
            return;
        }
        invoked = true;
        console.log(err);
    } );

    child.on("exit", (code) => {
        if (invoked) {
            return;
        }
        invoked = false;
        let err = code === 0 ? 'exit' : new Error(code);
        console.log(err);
    });
    child.on("message", data => {
        let result = data.result;
        result.forEach(item => {
            let it = new model({
                name: item.name,
                poster: item.poster,
                rate: item.rate
            });
            it.save();
        });
    })
})();