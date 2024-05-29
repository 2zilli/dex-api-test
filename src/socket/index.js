module.exports = {
    init: (socket, io) => {
        console.log("A user connected");

        // Add your socket.io logic here

        socket.on("disconnect", () => {
            console.log("A user disconnected");
        });
    },
};
