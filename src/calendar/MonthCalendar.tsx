import React, { Component } from 'react';

import OutsideClickWrapper from '../OutsideClickWrapper';

import Head from './Head';
import { MONTHS_NAMES, VIEW_MONTHS, VIEW_YEARS } from './constants';

export interface IProps {
  year: void|number,
  month: void|number,
  lang: string,
  startYear?: number,
  onChange: (selectedYear: number, selectedMonth: number) => any,
  onOutsideClick: (e: any) => any,
  onChangeYearUpdate?: boolean
}

export interface IState {
  years: Array<number>,
  selectedYear: void|number,
  selectedMonth: void|number,
  currentView: string,
  unRangeMonths: any,
  isActive: boolean
}

class MonthCalendar extends Component<IProps, IState> {
  static defaultProps = {
    onChangeYearUpdate: true
  }

  constructor(props: IProps){
    super(props);

    const { year, month } = this.props;

    const startYear = this.props.startYear || new Date().getFullYear() - 6;

    this.state = {
      years: Array.from({length: 12}, (v, k) => k + startYear),
      selectedYear: year,
      selectedMonth: month,
      currentView: year ? VIEW_MONTHS : VIEW_YEARS,
      unRangeMonths: [],
      isActive: true
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
    this.setState({ selectedMonth, isActive: true });
    this.onChange(this.state.selectedYear, selectedMonth);
  };

  previous = (): void => {
    const parseYear = this.state.years[6] -= 1;
    this.selectYear(parseYear)

    this.setState({isActive: true})

    // this.updateYears(parseYear);
  }

  next = () => {
    const parseYear = this.state.years[6] += 1;
    this.selectYear(parseYear)

    this.setState({isActive: false})

    // this.updateYears(parseYear);
  }

  updateYears = (startYear: number): void => {
    const years = Array.from({length: 12}, (v, k) => k + startYear);

    this.setState({ years, currentView: VIEW_YEARS });
  }

  isYears = (): boolean => {
    return this.state.currentView === VIEW_YEARS;
  }

  renderMonths = (): JSX.Element[] => {
    const { selectedMonth, unRangeMonths, isActive } = this.state;

    return MONTHS_NAMES[this.props.lang].map((month, index) => {
      const selectedKlass = selectedMonth === index ? 'selected_cell' : '';
      const monthsRange = isActive ? unRangeMonths.indexOf(month) < 0 ? 'active' : '' : unRangeMonths.indexOf(month) < 0 ? '' : 'active';

      return (
        <div
          key={index}
          onClick={() => this.selectMonth(index)}
          className={`col_mp span_1_of_3_mp ${selectedKlass} ${monthsRange}`}
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
    let months =  [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];

    const parseMonths = months.splice(0, month);
    this.setState({unRangeMonths: parseMonths});
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
        selectedYear: year,
        selectedMonth: month,
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
