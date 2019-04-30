import React from 'react';

function Availabilities(props) {
  return (
    <React.Fragment>
      <h2>Available Times</h2>
        <table className="advisors table">
          <thead>
            <tr>
              <th>Advisor ID</th>
              <th>Available Times</th>
            </tr>
          </thead>
          <tbody>
            {props.ids.map((id, index) => (
              <tr key={id}>
                <td>{id}</td>
                <td>
                  <ul className="list-unstyled">
                  {props.times[index].map((time, index) => {
                    let date = new Date(time);
                    console.log(date);
                    return (
                      <li key={index}>
                        <time dateTime={time} className="book-time">{date.toLocaleDateString()} {date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</time>
                        <button className="book btn-small btn-primary">Book</button>
                      </li>
                  )})}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </React.Fragment>
  );
}

export default Availabilities;