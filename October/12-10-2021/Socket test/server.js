const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
var path = require("path");

const PORT = process.env.PORT || 3093;

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);

});

app.use(express.static(__dirname + "/public"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

io.on("connection", function(socket) {
    // socket.on("message", (msg) => {
    //     socket.broadcast.emit("message", msg);
    // });

    console.log('New Ws Connection.........');

    socket.emit('Message', 'WelCome To chatApp');

    socket.broadcast.emit('Message', 'A User Has Joined The Chat');

    socket.on('DisConnect', () => {

        io.emit('Message', 'A User Has Left The Chat')
    });
});

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/users", (req, res) => {
    res.render("index");
});