import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addReminder, deleteReminder, clearReminders } from '../actions';
import moment from 'moment';
import 'moment/locale/vi';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      dueDate: ''
    };
  }

  addReminder() {
    console.log('this.state.dueDate', this.state.dueDate);
    this.props.addReminder(this.state.text, this.state.dueDate);
  }

  deleteReminder(id) {
    this.props.deleteReminder(id);
  }

  renderReminders() {
    const { reminders } = this.props;
    return (
      <ul className="list-group col-sm-4">
        {reminders.map(reminder => {
          return (
            <li key={reminder.id} className="list-group-item">
              <div className="list-item">
                <div>{reminder.text}</div>
                <div>
                  <em>{moment(new Date(reminder.dueDate)).fromNow()}</em>
                </div>
              </div>
              <div className="list-item delete-button" onClick={() => this.deleteReminder(reminder.id)}>
                &#x2715;
              </div>
            </li>
          );
        })}
      </ul>
    );
  }

  render() {
    console.log('this.props', this.props);
    return (
      <div className="App">
        <div className="App-title">Lời nhắc</div>
        <div className="form-inline reminder-form">
          <div
            className="form-group"
            onKeyPress={event => {
              console.log('event.key', event.key);
              if (event.key === 'Enter') this.addReminder();
            }}
          >
            <input className="form-control" placeholder="Mua sữa..." onChange={event => this.setState({ text: event.target.value })} />
            <input className="form-control" type="datetime-local" onChange={event => this.setState({ dueDate: event.target.value })} />
          </div>
          <button type="button" className="btn btn-success text-center" onClick={() => this.addReminder()}>
            Thêm lời nhắc
          </button>
        </div>
        {this.renderReminders()}
        <div
          className="btn btn-danger"
          onClick={() => this.props.clearReminders()}
        >
          Xóa mọi lời nhắc
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    reminders: state
  };
}

export default connect(
  mapStateToProps,
  { addReminder, deleteReminder, clearReminders }
)(App);
