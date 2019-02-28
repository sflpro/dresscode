import React from 'react';
import {State, Store} from "@sambego/storybook-state";
import {storiesOf} from '@storybook/react';
import {Checkbox} from './Checkbox.js';

storiesOf('Checkbox', module)
    .add('Active', () => {
        const store = new Store({checked: true});
        return (
            <State store={store}>
                <Checkbox checked={store.get('checked')} label='Ակտիվ' id='Ակտիվ'
                          onChange={() => store.set({checked: !store.get('checked')})}/>
            </State>
        )
    })
    .add('Hover', () => {
        const store = new Store({checked: false});
        return (
            <State store={store}>
                <Checkbox checked={store.get('checked')} label='Սավառել' id='Սավառել'
                          onChange={() => store.set({checked: !store.get('checked')})}/>
            </State>
        );
    })
    .add('Regular', () => {
        const store = new Store({checked: false});
        return (
            <State store={store}>
                <Checkbox checked={store.get('checked')} label='Սովորական' id='Սովորական'
                          onChange={() => store.set({checked: !store.get('checked')})}/>
            </State>
        )
    })
    .add('Disable', () => (
        <Checkbox checked={false} disabled={true} label='Անաշխատունակ'/>
    ))
    .add('Active Disable', () => (
        <Checkbox checked={true} disabled={true} label='Ակտիվ, սրանից' id='Ակտիվ, սրանից'/>
    ));