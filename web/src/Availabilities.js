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
            {props.ids.map((id, index1) => (
              <tr key={id}>
                <td>{id}</td>
                <td>
                  <ul className="list-unstyled">
                  {props.times[index1].map((time, index2) => {
                    let date = new Date(time);
                    return (
                      <li key={index2}>
                        <time dateTime={time} className="book-time">{date.toLocaleDateString()} {date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</time>
                        <button 
                          className="book btn-small btn-primary" 
                          onClick={() => props.bookTime(id, time, index1, index2)}
                        >Book</button>
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