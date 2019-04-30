import React from 'react';

function Bookings(props) {
  return (
    <React.Fragment>
      <h2>Booked Times</h2>
        <table className="bookings table">
          <thead>
            <tr>
              <th>Advisor ID</th>
              <th>Student Name</th>
              <th>Date/Time</th>
            </tr>
          </thead>
          <tbody>
            {props.bookings.map((booking, index) => {
              let date = new Date(booking[2]);
              return (
                <tr key={index}>
                  <td>{booking[0]}</td>
                  <td>{booking[1]}</td>
                  <td>
                    <time dateTime={booking[2]}>{date.toLocaleDateString()} {date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</time>
                  </td>
                </tr>
              )})}
          </tbody>
        </table>
    </React.Fragment>
  );
}

export default Bookings;