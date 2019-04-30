import React, { Component } from 'react';
import BookTime from './BookTime.js';
import Availabilities from './Availabilities.js';
import Bookings from './Bookings.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      today: null
    };
    this.fetchToday();
  }

  async fetchToday() {
    try {
      const res = await fetch("http://localhost:4433/today");
      const json = await res.json();
      this.setState({today: json.today});
    } catch (e) {
      console.error("Failed to fetch 'today' data", e);
    }
  }

  render() {
    return (
      <div className="App container">
        <BookTime today={this.state.today} />
        <Availabilities />
        <Bookings />
      </div>
    );
  }
}

export default App;
