const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");
const helper = require("./helperFunctions.js");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const booking = [];

app.get("/today", (req, res) => {
    res.send({
        today: helper.today()
    });
});

app.get("/availability", (req, res) => {
    axios.get("https://www.thinkful.com/api/advisors/availability")
        .then(({data}) => {
            res.send(helper.reformatAvailabilities(data));
        })
        .catch((err) => {
            console.error(err);
        });
});

app.get("/booking", (req, res) => {
    res.send(booking);
});

app.post("/booking", (req, res) => {
    booking.push(req.body.booking);
});

app.today = helper.today;
module.exports = app;