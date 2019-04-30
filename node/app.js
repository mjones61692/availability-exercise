const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/today", (req, res) => {
    res.send({
        today: today()
    });
});

app.get("/availability", (req, res) => {
    axios.get("https://www.thinkful.com/api/advisors/availability")
        .then(({data}) => {
            res.send(data);
        })
        .catch((err) => {
            console.error(err);
        });
});

function today() {
    return new Date().toLocaleDateString();
}

app.today = today;
module.exports = app;