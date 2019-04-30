import React, { Component } from 'react';
import axios from 'axios';
import BookTime from './BookTime.js';
import Availabilities from './Availabilities.js';
import Bookings from './Bookings.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      today: null,
      availabilityIds: [],
      availabilityTimes: []
    };
  }

  componentDidMount() {
    let todayPromise = axios.get("http://localhost:4433/today")
      .catch((err) => {
        console.error("Failed to fetch 'today' data", err);
      });

    let availablilitiesPromise = axios.get("http://localhost:4433/availability")
      .catch((err) => {
        console.error("Failed to fetch 'availabilities' data", err);
      });

    Promise.all([todayPromise, availablilitiesPromise])
      .then((results) => {
        console.log(results);
        this.setState({
          today: results[0].data.today,
          availabilityIds: results[1].data.ids,
          availabilityTimes: results[1].data.times
        })
      })
      .catch((err) => {
        console.error("Promises failed to resolve", err);
      });
  }

  render() {
    return (
      <div className="App container">
        <BookTime today={this.state.today} />
        <Availabilities ids={this.state.availabilityIds} times={this.state.availabilityTimes}/>
        <Bookings />
      </div>
    );
  }
}

export default App;
