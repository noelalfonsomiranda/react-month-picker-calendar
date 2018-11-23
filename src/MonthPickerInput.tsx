import React, { Component } from 'react';
import InputMask from 'react-input-mask';
import moment from 'moment';
// import { extendMoment } from 'moment-range';

const DATE_FORMAT = {
  "default": 'MM/YY',
  "ja": 'YY/MM'
}

import MonthCalendar from './calendar';
import { valuesToMask, valuesFromMask } from './utils';

import './styles/index.css';

type OnChange = (maskedValue: string, year: number, month: number) => any;

export interface IProps {
  year?: number,
  month?: number,
  lang?: string,
  inputProps?: {
    name?: string,
    id?: string,
  },
  onChange?: OnChange,
  closeOnSelect?: boolean,
  onChangeYearUpdate?: boolean,
  inputRef?: Function,
  rangePicker?:boolean,
  isOpen ?: boolean,
  monthYearFormat ?: string
};

export interface IState {
  year: void|number,
  month: void|number,
  inputValue: string,
  showCalendar: boolean,
};

class MonthPickerInput extends Component<IProps, IState> {
  wrapper: HTMLDivElement;
  input: { input: Element };

  public static defaultProps: Partial<IProps> = {
    inputProps: {},
    closeOnSelect: false,
    rangePicker: false
  };

  constructor(props) {
    super(props);

    this.handleStateInitialize()
  };

  componentDidUpdate(prevProps) {
    this.onCalendarMount(prevProps)
  }

  onCalendarMount = (prevProps): void => {
    const {year, month }  = this.props

    if (prevProps.month !== month && prevProps.year !== year) {
      
      this.handleStateInitialize()
      this.setState({
        year,
        month,
      })
    }
  }

  handleStateInitialize = (): void => {
    const { year, month } = this.props;
    let inputValue = '';

    if (typeof year == 'number' && typeof month == 'number') {
      inputValue = valuesToMask(month, year, this.props.lang);
    }

    this.state = {
      year,
      month,
      inputValue,
      showCalendar: false,
    }
  }

  onCalendarChange = (year, month): void => {
    const inputValue = valuesToMask(month, year, this.props.lang);
    this.setState({
      inputValue,
      year,
      month,
      showCalendar: !this.props.closeOnSelect
    });
    this.onChange(inputValue, year, month);
  };

  onInputChange = (e: { target: { value: string }}): void => {
    const mask = e.target.value;

    if (mask.length && mask.indexOf('_') === -1) {
      const [month, year] = valuesFromMask(mask);
      const inputValue = valuesToMask(month, year, this.props.lang);
      this.setState({ year, month, inputValue });
      this.onChange(inputValue, year, month);
    } else this.setState({ inputValue: mask });
  };

  onChange = (inputValue, year, month) => {
    if (this.props.onChange) {
      this.props.onChange(inputValue, year, month);
    }
    // this.handleDateRange(year, month)
  };

  onInputBlur = (e): void => {
    if (!this.wrapper.contains(e.target)) {
      this.setState({ showCalendar: false })
    }
  };

  onInputFocus = (e): void => {
    if (this.wrapper.contains(e.target)) {
      this.setState({ showCalendar: true });
    }
  };

  onCalendarOutsideClick = (e): void => {
    this.setState({ showCalendar: this.input.input == e.target });
  };

  calendar = (): JSX.Element => {
    const { onChangeYearUpdate, rangePicker } = this.props
    const { year, month } = this.state;
    let lang = this.props.lang ? this.props.lang : 'default';
    return (
      <div style={{ position: 'relative' }}>
        <MonthCalendar
          year={year}
          month={month}
          lang={lang}
          onChange={this.onCalendarChange}
          onOutsideClick={this.onCalendarOutsideClick}
          onChangeYearUpdate={onChangeYearUpdate}
          rangePicker={rangePicker}
        />
      </div>
    )
  };

  inputProps = (): object => {
    const { inputRef } = this.props

    // monthYearFormat: TODO
    let dateFormat = DATE_FORMAT["default"];
    if (this.props.lang == "ja") {
      dateFormat = DATE_FORMAT["ja"];
    }
    return Object.assign({}, {
      ref: (input) => { 
        if(input) 
          this.input = input; 
        
        inputRef && inputRef(input) 
      },
      mask: '99/9999',
      placeholder: dateFormat,
      type: 'text',
      onBlur: this.onInputBlur,
      onFocus: this.onInputFocus,
      onChange: this.onInputChange,
    }, this.props.inputProps)
  };

  handleRenderCalendar = () => {
    if (this.props.isOpen || this.state.showCalendar) {
      return this.calendar()
    }

    return false
  }

  render() {
    return (
      <div ref={wrap => { if(wrap) this.wrapper = wrap; }}>
        <InputMask
          value={this.state.inputValue}
          {...this.inputProps()}
        />
        { this.handleRenderCalendar() }
      </div>
    );
  };
};

export default MonthPickerInput;