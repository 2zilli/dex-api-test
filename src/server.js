require("dotenv").config();
const path = require("path");
const express = require("express");
const configureMiddleware = require("./middleware");
const configureRoutes = require("./routes");
const socketio = require("socket.io");
const gameSocket = require("./socket");

const app = express();

configureMiddleware(app);
configureRoutes(app);

const philipApiTest = require("./routes/philipApiTest");
app.use("/api", philipApiTest);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(
        `Server is running in ${process.env.NODE_ENV} mode and is listening on port ${PORT}...`
    );
});

const io = socketio(server);

io.on("connect", (socket) => gameSocket.init(socket, io));

process.on("unhandledRejection", (err) => {
    console.error(`Error: ${err.message}`);
    server.close(() => {
        process.exit(1);
    });
});
