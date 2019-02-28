import React from 'react';
import {State, Store} from "@sambego/storybook-state";
import {storiesOf} from '@storybook/react';
import {Checkbox} from '../Checkbox/Checkbox.js';
import {ControlsGroup} from "./ControlsGroup";

storiesOf('ControlsGroup', module).add('CheckboxGroup', () => {
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
                    <ControlsGroup title='Կուզենայիր աշխատեիր շաբաթ և կիրակի էս Սիսթեմի վրա' key='key'>
                        <Checkbox checked={state.first} onChange={handler} label='Այո' id='first'/>
                        <Checkbox checked={state.second} onChange={handler} label='Ոչ' id='second'/>
                        <Checkbox checked={state.third} onChange={handler} label='Ճարս Ի՞նչ' id='third'/>
                    </ControlsGroup>
                ]}
            </State>
        );
    }
);
