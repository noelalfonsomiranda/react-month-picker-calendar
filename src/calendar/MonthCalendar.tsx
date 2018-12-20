import React, { Component } from 'react';

import OutsideClickWrapper from '../OutsideClickWrapper';

import Head from './Head';
import { MONTHS_NAMES, VIEW_MONTHS, VIEW_YEARS } from './constants';
import { rangeCreator } from '../utils'

export interface IProps {
  year: void|number,
  month: void|number,
  lang: string,
  startYear?: number,
  onChange: (selectedYear: number, selectedMonth: number) => any,
  onOutsideClick: (e: any) => any,
  onChangeYearUpdate?: boolean,
  rangePicker?: boolean
}

export interface IState {
  years: Array<number>,
  selectedYear: any|number,
  selectedMonth: void|number,
  currentView: string,
  unRangeMonths: any
}

class MonthCalendar extends Component<IProps, IState> {
  static defaultProps = {
    onChangeYearUpdate: true,
    rangePicker: false
  }

  constructor(props: IProps){
    super(props);

    const { year, month } = this.props;

    const startYear = this.props.startYear || new Date().getFullYear() - 6;
    const selectedYear = year || new Date().getFullYear()
    this.state = {
      years: Array.from({length: 12}, (v, k) => k + startYear),
      selectedYear,
      selectedMonth: month,
      currentView: year ? VIEW_MONTHS : VIEW_YEARS,
      unRangeMonths: []
    };
  }

  onChange = (selectedYear, selectedMonth): void => {
    if (typeof selectedYear == 'number' && typeof selectedMonth == 'number') {
      this.props.onChange(selectedYear, selectedMonth);
    }
  }

  selectYear = (selectedYear: number): void => {
    const { onChangeYearUpdate } = this.props
    this.setState({ selectedYear, currentView: VIEW_MONTHS });
    onChangeYearUpdate && this.onChange(selectedYear, this.state.selectedMonth);
  };

  selectMonth = (selectedMonth: number): void => {
    this.setState({ selectedMonth });
    this.onChange(this.state.selectedYear, selectedMonth);
  };

  previous = () => {
    this.setState(({selectedYear}) => ({
      selectedYear: selectedYear -= 1
    }), () => this.selectYear(this.state.selectedYear))
  }

  next = () => {
    this.setState(({selectedYear}) => ({
      selectedYear: selectedYear += 1
    }), () => this.selectYear(this.state.selectedYear))
  }

  updateYears = (startYear: number): void => {
    const years = Array.from({length: 12}, (v, k) => k + startYear);

    this.setState({ years, currentView: VIEW_YEARS });
  }

  isYears = (): boolean => {
    return this.state.currentView === VIEW_YEARS;
  }

  getDuration = (month: number): any => {
    const { selectedMonth, selectedYear } = this.state
    const { year } = this.props
    let selected = 12
    let duration = 0

    if (year === selectedYear) {
      selected = Number(selectedMonth) || 1
      duration = (12 - selected)
    } else if ((Number(year) + 1) === selectedYear) {
      selected = 0
      duration = Number(selectedMonth)
    }

    return {
      selected,
      duration
    }
  }

  getRange = (month: number): string[] =>{
    const { selected, duration } = this.getDuration(month);
    return rangeCreator(selected, duration)
      .map((month) => MONTHS_NAMES['default'][month]);
  }

  isCurrentActiveRange = (month: number): boolean => {
    const rangeMonth = this.getRange(month);
    return rangeMonth.indexOf(String(month)) > -1;
  }

  shouldShowActiveRange = (month) => {
    if (this.isCurrentActiveRange(month)) {
      return 'active';
    }
 
    return '';
  }

  renderMonths = (): JSX.Element[] => {
    const { selectedMonth, selectedYear } = this.state;
    const { year, rangePicker } = this.props

    return MONTHS_NAMES[this.props.lang].map((month, index) => {
      const selectedKlass = (selectedMonth === index && selectedYear === year)? 'selected_cell active' : '';
      const rangeActive = rangePicker ? this.shouldShowActiveRange(month) : ''
      return (
        <div
          key={index}
          onClick={() => this.selectMonth(index)}
          className={`col_mp span_1_of_3_mp ${selectedKlass} ${rangeActive}`}
        >{month}</div>
      )
    });
  };

  renderYears = (): JSX.Element[] => {
    const { selectedYear } = this.state;

    return this.state.years.map((year, i) => {
      const selectedKlass = selectedYear === year ? 'selected_cell' : '';
      return (
        <div
          key={i}
          onClick={() => this.selectYear(year)}
          className={`col_mp span_1_of_3_mp ${selectedKlass}`}
        >{year}</div>
      );
    });
  }

  handleMonthRange = (month): void => {
    const months = [ ...MONTHS_NAMES['default'] ]
    this.setState({
      unRangeMonths: months.splice(month)
    });
  }

  componentDidMount () {
    this.handleMonthRange(this.props.month)
  }

  componentWillReceiveProps(nextProps) {
    const { year: oldYear, month: oldMonth } = this.props
    const { year, month } = nextProps;

    if (typeof year == 'number' &&
      typeof month == 'number' &&
      (year !== oldYear || month !== oldMonth)
    ) {
      this.setState({
        selectedYear: year || new Date().getFullYear(),
        selectedMonth: month || new Date().getMonth(),
        currentView: VIEW_MONTHS
      });
      this.handleMonthRange(month);
    }
  }

  render(): JSX.Element {
    const { selectedYear, selectedMonth } = this.state;
    return (
      <OutsideClickWrapper
        onOutsideClick={this.props.onOutsideClick}
        className="calendar-container"
      >
        <Head
          year={selectedYear}
          month={selectedMonth ? selectedMonth + 1 : undefined}
          lang={this.props.lang}
          onValueClick={() => this.setState({ currentView: VIEW_YEARS })}
          onPrev={this.previous}
          onNext={this.next} />

        {this.isYears() ? this.renderYears() : this.renderMonths()}
      </OutsideClickWrapper>
    );
  }
};

export default MonthCalendar;
