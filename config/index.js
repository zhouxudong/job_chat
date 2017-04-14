var path = require("path");

module.exports = {
    build: {
        env: require("./prod.env"),
        assetsRoot: path.resolve(__dirname, '../asset'),
        assetsPublic: path.resolve(__dirname, "../public")
    },
    dev: {
        env: require("./dev.env"),
        port: 3000,
        urlPath: "/",
        assetsPublicPath: "/",
        assetsSubDirectory: "static"
    }
}