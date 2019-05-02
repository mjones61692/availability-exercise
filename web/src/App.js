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
      studentName: null,
      availabilityIds: [],
      availabilityTimes: [],
      bookings: []
    };
    this.onNameChange = this.onNameChange.bind(this);
    this.bookTime = this.bookTime.bind(this);
  }

  onNameChange(e) {
    this.setState({
      studentName: e.target.value
    });
  }

  bookTime(bookingId, bookingTime, index1, index2) {
    if (!this.state.studentName) {
      alert('Please enter your name before booking.');
    } else {
      let booking = {
        bookingId: bookingId, 
        studentName: this.state.studentName, 
        bookingTime: bookingTime
      };
      axios.post("http://localhost:4433/bookings", {booking: booking});
      let availabilityTimes = this.state.availabilityTimes.slice();
      let availabilityIds = this.state.availabilityIds.slice();
      availabilityTimes[index1].splice(index2, 1);
      // remove empty ids
      if (availabilityTimes[index1].length === 0) {
        availabilityIds.splice(index1, 1);
        availabilityTimes.splice(index1, 1);
      }
      let bookings = this.state.bookings.slice();
      bookings.push(booking);
      this.setState({
        availabilityIds: availabilityIds,
        availabilityTimes: availabilityTimes,
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

    let bookingsPromise = axios.get("http://localhost:4433/bookings")
      .catch((err) => {
        console.error("Failed to fetch 'bookings' data", err);
      });

    Promise.all([todayPromise, availablilitiesPromise, bookingsPromise])
      .then((results) => {
        this.setState({
          today: results[0].data.today,
          availabilityIds: results[1].data.availabilityIds,
          availabilityTimes: results[1].data.availabilityTimes,
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
        <BookTime 
          today={this.state.today} 
          onNameChange={this.onNameChange}
        />
        <Availabilities 
          ids={this.state.availabilityIds} 
          times={this.state.availabilityTimes} 
          bookTime={this.bookTime}
        />
        <Bookings 
          bookings={this.state.bookings}
        />
      </div>
    );
  }
}

export default App;
