import React from 'react';

function BookTime(props) {
  return (
    <React.Fragment>
      <h1>Book Time with an Advisor</h1>

      {props.today && <span id="today">Today is {props.today}.</span>}

      <form id="name-form" className="col-md-6">
        <div className="form-group">
          <label htmlFor="name-field">Your Name</label>
          <input type="text" id="name-field" className="form-control" />
        </div>
      </form>
    </React.Fragment>
  );
}

export default BookTime;