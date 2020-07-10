import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from '@sambego/storybook-state';
import { select } from '@storybook/addon-knobs';

import { DateInput } from '.';

import { ImportInstruction } from '../helpers/ImportInstruction';

import { InfoStoryConfig } from '../configs';


const optionsView = [
    'day',
    'month',
    'year',
];

storiesOf('DateInput', module)
    .add('DateInput', () => {
        const store = new Store({
            value: '',
        });

        function handler({ target }) {
            store.set({ value: target.value });
        }

        return (
            <State
                store={store}
            >
                {state => {
                    const view = select('view', optionsView, 'day');

                    return (
                        <DateInput
                            key={view}
                            onChange={handler}
                            value={state.value}
                            view={view}
                        />
                    )
                }}
            </State>
        )
    }, {
        ...InfoStoryConfig,
        info: {
            ...InfoStoryConfig.info,
            text: <ImportInstruction componentName='DateInput' />,
        },
    });
