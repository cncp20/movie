const qiniu = require("qiniu");
const nanoId = require("nanoid");
const config = require("../config");

const bucket = config.qiniu.bucket;
const mac = new qiniu.auth.digest.Mac(config.qiniu.AK, config.qiniu.SK);
const cfg = new qiniu.conf.Config();
const client = new qiniu.rs.BucketManager(mac, cfg);

const upload = async (url, key) => {
    return new Promise((resolve, reject) => {
        client.fetch(url, bucket, key, (err, ret, info) => {
            if (err) {
                reject(err)
            } else {
                resolve({key})
            }
        }) 
    })
}
;(async () => {
    let movie =[{ name: '罗马假日',
    poster: 'http://img1.xmspc.com/uploads/movie-poster/4693.jpg',
    rate: '8.9' }]

    movie.map(async item => {
        if (item.poster && !item.key) {
            var posterData = await upload(item.poster, nanoId() + '.png');
        }
        if (posterData.key) {
            item.key = posterData.key
        }
        console.log(item);
    });



})()