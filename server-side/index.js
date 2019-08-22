var express = require("express");
var app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
const redis = require("redis");

const redisClient = redis.createClient(6379);

let currentID = 0;

// app.use(express.static(__dirname + "/to-do-list"));

// app.get('/react', function(req, res) {
//     res.sendFile(__dirname + "/to-do-list/public/index.html");
// });

redisClient.on("error", err => {
    console.log("Error " + err);
});

app.get("/save", function(req, res) {
    if (!req.query.text) {
        res.send("invalid");
        return;
    }

    currentID += 1;
    redisClient.hset(
        [
            "todoList",
            `todo:${currentID.toString()}`,
            JSON.stringify({
                id: currentID,
                text: req.query.text,
                status: 0
            })
        ],
        redis.print
    );
    io.sockets.emit("onAdd", { id: currentID, text: req.query.text, status: 0 });
    res.send(currentID.toString());
});

app.get("/get", function(req, res) {
    redisClient.hgetall("todoList", function(err, replies) {
        if (!replies) {
            res.json([]);
            return;
        }
        res.header("Access-Control-Allow-Origin", "*");
        res.json(Object.keys(replies).map(key => JSON.parse(replies[key])));
    });
});

app.get("/changeStatus", function(req, res) {
    if (!req.query.id && !req.query.status) {
        res.send("invalid");
        return;
    }

    io.sockets.emit("onStatusChanged", { id: req.query.id, status: req.query.status });
    let record = {};
    redisClient.hget(["todoList", `todo:${req.query.id}`], function(err, reply) {
        record = JSON.parse(reply);
        record.status = req.query.status;
        redisClient.hset(["todoList", `todo:${req.query.id}`, JSON.stringify(record)], redis.print);
        res.json({ message: "ok" });
    });
});

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/Client.html");
});

http.listen(4000, function() {
    console.log("listening on *:4000");
});

// redisClient.quit();
