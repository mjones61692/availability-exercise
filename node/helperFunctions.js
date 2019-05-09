module.exports = {
  closestAvailability: function(data, timeStamp) {
    let timeDifference = Infinity;
    let inputTime = new Date(timeStamp).getTime();
    let availability;
    for (let date of Object.keys(data)) {
      for (let time of Object.keys(data[date])) {
        let currentTime = new Date(time).getTime();
        let currentDifference = Math.abs(currentTime - inputTime);
        if (currentDifference < timeDifference) {
          timeDifference = currentDifference
          availability = {availabilityId: data[date][time], availabilityTime: time};
        }
      }
    }
    return availability;
  },
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
    return {availabilityIds: idsArray, availabilityTimes: availabilities};
  },
  today: function() {
    return new Date().toLocaleDateString();
  }
}