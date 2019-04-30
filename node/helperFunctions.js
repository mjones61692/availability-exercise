module.exports = {
  reformatAvailabilities: function(data) {
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
    idsArray.sort();
    let availabilities = [];
    for (let id of idsArray) {
      let arr = ids[id].slice();
      arr.sort();
      availabilities.push(arr);
    }
    return {ids: idsArray, times: availabilities};
  },
  today: function() {
    return new Date().toLocaleDateString();
  }
}