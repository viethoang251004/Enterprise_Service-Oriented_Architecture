const app = require("./src/app");

const PORT = process.env.PORT || 3056

const server = app.listen(PORT, () => {
    console.log(`Web Service is Starting with port ${PORT}`);
})