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
      name: null,
      availabilityIds: [],
      availabilityTimes: [],
      bookings: []
    };
    this.onNameChange = this.onNameChange.bind(this);
    this.bookTime = this.bookTime.bind(this);
  }

  onNameChange(e) {
    this.setState({
      name: e.target.value
    });
  }

  bookTime(id, time, index1, index2) {
    if (!this.state.name) {
      alert('Please enter your name before booking.');
    } else {
      let booking = [id, this.state.name, time];
      axios.post("http://localhost:4433/booking", {booking: booking});
      let availabilities = this.state.availabilityTimes;
      availabilities[index1].splice(index2, 1);
      let bookings = this.state.bookings;
      bookings.push(booking);
      this.setState({
        availabilityTimes: availabilities,
        bookings: bookings
      });
    }
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

    let bookingsPromise = axios.get("http://localhost:4433/booking")
      .catch((err) => {
        console.error("Failed to fetch 'bookings' data", err);
      });

    Promise.all([todayPromise, availablilitiesPromise, bookingsPromise])
      .then((results) => {
        this.setState({
          today: results[0].data.today,
          availabilityIds: results[1].data.ids,
          availabilityTimes: results[1].data.times,
          bookings: results[2].data
        });
      })
      .catch((err) => {
        console.error("Promises failed to resolve", err);
      });
  }

  render() {
    return (
      <div className="App container">
        <BookTime today={this.state.today} onNameChange={this.onNameChange}/>
        <Availabilities ids={this.state.availabilityIds} times={this.state.availabilityTimes} bookTime={this.bookTime}/>
        <Bookings bookings={this.state.bookings}/>
      </div>
    );
  }
}

export default App;
