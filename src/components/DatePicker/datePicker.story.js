import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from "@sambego/storybook-state";

import {
  MONTHS,
  MONTHS_SHORT,
  WEEKDAYS_LONG,
  WEEKDAYS_SHORT,
  FIRST_DAY,
  formatDay,
  formatMonthTitle,
  formatWeekdayShort,
  formatWeekdayLong,
  getFirstDayOfWeek,
} from './helper';

import { DatePicker } from '../DatePicker';
import { ItemGroup } from '../../helpers/ItemGroup';
import { Item } from '../../helpers/Item';

storiesOf('Date picker', module)
  .add('Date picker', () => {
    const store = new Store({
      datePickerValue: null,
      monthPickerValue: new Date(),
    });
    const localeHy = 'hy';

    const localeUtils = {
      formatDay,
      formatMonthTitle,
      formatWeekdayShort,
      formatWeekdayLong,
      getFirstDayOfWeek,
    };

    function handleDatePickerChange(datePickerValue) {
      store.set({
        datePickerValue,
      });
    }

    function handleMonthPickerChange(monthPickerValue) {
      store.set({
        monthPickerValue,
      });
    }

    return (
      <State
        store={store}
      >
        {state =>
          <>
            <ItemGroup
              title='Date Picker'
            >
              <Item>
                <DatePicker
                  value={state.datePickerValue}
                  onChange={handleDatePickerChange}
                />
              </Item>
            </ItemGroup>
            <ItemGroup
              title='Month Picker'
            >
              <Item>
                <DatePicker
                  value={state.monthPickerValue}
                  onChange={handleMonthPickerChange}
                  view='month'
                />
              </Item>
            </ItemGroup>
            <ItemGroup
              title='Localization'
            >
              <Item>
                <DatePicker
                  value={state.datePickerValue}
                  onChange={handleDatePickerChange}
                  locale={localeHy}
                  months={MONTHS[localeHy]}
                  monthsShort={MONTHS_SHORT[localeHy]}
                  weekdaysLong={WEEKDAYS_LONG[localeHy]}
                  weekdaysShort={WEEKDAYS_SHORT[localeHy]}
                  firstDayOfWeek={FIRST_DAY[localeHy]}
                />
              </Item>
              <Item>
                <DatePicker
                  value={state.datePickerValue}
                  onChange={handleDatePickerChange}
                  locale={localeHy}
                  localeUtils={localeUtils}
                  monthsShort={MONTHS_SHORT[localeHy]}
                />
              </Item>
              <Item>
                <DatePicker
                  value={state.datePickerValue}
                  onChange={handleDatePickerChange}
                  locale={localeHy}
                  monthsShort={MONTHS_SHORT[localeHy]}
                  view='month'
                />
              </Item>
            </ItemGroup>
          </>
        }
      </State>
    );
  });
