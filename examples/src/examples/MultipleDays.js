import React from 'react';
import DayPicker, { DateUtils } from '../../../src';
import '../../../src/style.css';

export default class MultipleDays extends React.Component {
  constructor(props) {
    super(props);
    this.isDaySelected = this.isDaySelected.bind(this);
    this.handleDayClick = this.handleDayClick.bind(this);
  }
  state = {
    selectedDays: [],
  };
  isDaySelected(day) {
    return this.state.selectedDays.some(selectedDay =>
      DateUtils.isSameDay(selectedDay, day),
    );
  }
  handleDayClick(e, day, { selected }) {
    const { selectedDays } = this.state;
    if (selected) {
      const selectedIndex = selectedDays.findIndex(selectedDay =>
        DateUtils.isSameDay(selectedDay, day),
      );
      selectedDays.splice(selectedIndex, 1);
    } else {
      selectedDays.push(day);
    }
    this.setState({ selectedDays });
  }
  render() {
    return (
      <div>
        <DayPicker
          className="daypicker"
          selectedDays={ this.isDaySelected }
          onDayClick={ this.handleDayClick }
        />
      </div>
    );
  }
}
