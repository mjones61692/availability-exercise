import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App.js';
import Availabilities from './Availabilities.js';
import Bookings from './Bookings.js';
import BookTime from './BookTime.js';

const mockAvailabilityIds = ["319369"];
const mockAvailabilityTimes = [["2019-04-30T17:15:00-04:00"]];
const mockBookings = [{
  bookingId: "319369", 
  studentName: "Matt", 
  bookingTime: "2019-05-02T15:00:00-04:00"
}];

configure({adapter: new Adapter()});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('has the 3 children components', () => {
  const app = shallow(<App />);
  expect(app.find(Availabilities).length).toBe(1);
  expect(app.find(Bookings).length).toBe(1);
  expect(app.find(BookTime).length).toBe(1);
});

it('uses props to get today', () => {
  const app = shallow(<BookTime today={'test'} />);
  expect(app.find('#today').text()).toBe('Today is test.');
})

it('uses props to create booking table', () => {
  const app = shallow(<Bookings bookings={mockBookings} />);
  expect(app.find('.booking-advisor-id').text()).toBe('319369');
  expect(app.find('.booking-student-name').text()).toBe('Matt');
});

it('uses props to create availability table', () => {
  const app = shallow(<Availabilities 
    ids={mockAvailabilityIds} 
    times={mockAvailabilityTimes} 
    bookTime={() => {}}
  />);
  expect(app.find('.availability-id').text()).toBe('319369');
});
