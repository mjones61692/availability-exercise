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
            res.send(reformatAvailabilities(data));
        })
        .catch((err) => {
            console.error(err);
        });
});

function today() {
    return new Date().toLocaleDateString();
}

function reformatAvailabilities(data) {
    // build ids hashtable
    let ids = {};
    for (let date of Object.keys(data)) {
      for (let time of Object.keys(data[date])) {
        let id = data[date][time];
        if (ids[id] === undefined) {
          ids[id] = [];
        }
        ids[id].push(time);
      }
    }
    // sort availabilities by date and time
    let idsArray = Object.keys(ids).slice();
    let availabilities = [];
    for (let id of idsArray) {
      let arr = ids[id].slice();
      arr.sort();
      availabilities.push(arr);
    }
    return {ids: idsArray, times: availabilities};
  }

app.today = today;
module.exports = app;