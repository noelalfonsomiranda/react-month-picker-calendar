import React from 'react';
import ReactDOM from 'react-dom';

import MonthPickerInput from 'react-month-picker-input';

ReactDOM.render(
  (
    <div>
      <label htmlFor="ex-0">
        Without default value
        <MonthPickerInput inputProps={{id: "ex-0", name: "ex-0"}} />
      </label>

      <label htmlFor="ex-1">
        With only default year
        <MonthPickerInput
          year={new Date().getFullYear()}
          inputProps={{id: "ex-1", name: "ex-1"}} />
      </label>

      <label htmlFor="ex-3">
        Japanese format
        <MonthPickerInput
          year={new Date().getFullYear()}
          month={new Date().getMonth()}
          lang="ja"
          inputProps={{id: "ex-3", name: "ex-3"}} />
      </label>

      <label htmlFor="ex-4">
        Close on month select
        <MonthPickerInput
          closeOnSelect={true}
          inputProps={{id: "ex-3", name: "ex-3"}} />
      </label>

      <label htmlFor="ex-2">
        With default year and month
        <MonthPickerInput
          inputRef={(ref) => {
            this.input = ref
          }}
          year={new Date().getFullYear()}
          month={new Date().getMonth()}
          inputProps={{id: "ex-2", name: "ex-2"}} 
          onChangeYearUpdate={false}
          
        />
          
      </label>

      <div>
        asd
        <input placeholder="Year" id="ex-5-year" type="number"
          onChange={(e) => this.setState({ year: parseInt(e.target.value) || 2018 })} />
        <input placeholder="Month" id="ex-5-month" type="number"
          onChange={(e) => this.setState({ month: parseInt(e.target.value) || 5 })} />

        <MonthPickerInput
          year={new Date().getFullYear()}
          month={new Date().getMonth() -1}
          // i18n={{ dateFormat: { default: 'YYYY/MM' } }}
          inputProps={{id: "ex-5", name: "ex-5"}}
        />
      </div>
    </div>
  ),
  document.getElementById('examples')
);
