React-Month-Picker-Calendar
====================

[![codeship status](https://app.codeship.com/projects/acaafd10-6adf-0136-e048-5a63a4ca7788/status?branch=master "codeship status")](https://www.codeship.io/projects/298115)

A month picker input and calendar for React.

## API

| Name | Types | Default | Description |
|---|---|---|---|
| year | number | void | Preselect year in calendar |
| month | number (0..11) | void | Preselect month in calendar. If both year and month are specified then input field will be also prepopulated |
| inputProps | object | empty object | Input field props, only `id` and `name` are supported |
| onChange | Function: (maskedValue: string, year: number, month: number) => any | - | onChange callback, receives `maskedValue`, `year` and `month` (begins with 0) as arguments |
| closeOnSelect | boolean | false | Close calendar on month select |
| onChangeYearUpdate | boolean | true | Handle year update with previous and next |
| rangePicker | boolean | false | Will show the range default of 12 months |
| inputRef | Function: (ref) => any | - | Modification of calendar input |
| isOpen | boolean | - | to open automatically calendar on mount |
| placeholder | string/any | MM/YY | to set a custom placeholder |


## Installation

```
npm install react-month-picker-calendar --save
```

## Usage

React-Month-Picker-Calendar generates a year/month calendar opened on field focus.

```js
var MonthPickerInput = require('react-month-picker-calendar');
require('react-month-picker-input/dist/react-month-picker-calendar.css');

<MonthPickerInput
  value={new Date()}
  onChangeYearUpdate={false}
  onChange={function(selectedYear, selectedMonth) {
    console.log(selectedYear, selectedMonth);
  }}
/>
```

## License

Copyright (c) 2018. [MIT](LICENSE) License.

**Acknowledgement**
This [package](https://github.com/slavakisel/react-month-picker-input) is originally developed by [Viacheslav Kysil](https://github.com/slavakisel)


