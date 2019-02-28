import React from 'react';
import {State, Store} from "@sambego/storybook-state";
import {storiesOf} from '@storybook/react';
import {Checkbox} from '../Checkbox/Checkbox.js';
import {CheckboxGroup} from "./CheckboxGroup";

storiesOf('CheckboxGroup', module).add('Group', () => {
        const store = new Store({
            first: true,
            second: true,
            third: false
        });

        function handler({target}) {
            store.set({...store.state, ...{[target.id]: !store.state[target.id]}});
        }

        return (
            <State store={store}>
                {state => [
                    <CheckboxGroup title='Կուզենայիր աշխատեիր շաբաթ և կիրակի էս Սիսթեմի վրա' key='key'>
                        <Checkbox checked={state.first} onChange={handler} label='Այո' id='first'/>
                        <Checkbox checked={state.second} onChange={handler} label='Ոչ' id='second'/>
                        <Checkbox checked={state.third} onChange={handler} label='Ճարս Ի՞նչ' id='third'/>
                    </CheckboxGroup>
                ]}
            </State>
        );
    }
);
