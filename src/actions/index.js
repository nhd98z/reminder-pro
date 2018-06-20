import { ADD_REMINDER, DELETE_REMINDER } from '../constants';

export const addReminder = text => {
  const action = {
    type: ADD_REMINDER,
    text
  };
  console.log('adding in actions', action);
  return action;
};

export const deleteReminder = id => {
  const action = {
    type: DELETE_REMINDER,
    id
  };
  console.log('deleteing in actions', action);
  return action;
};
