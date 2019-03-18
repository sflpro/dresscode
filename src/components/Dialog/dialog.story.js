import React from 'react';
import { State, Store } from '@sambego/storybook-state';
import { storiesOf } from '@storybook/react';

import { Dialog } from './';

import { ItemGroup } from '../../helpers/ItemGroup';
import { Item } from '../../helpers/Item';

storiesOf('Dialog', module)
  .add('Dialog', () => {
    const store = new Store({
      show: {
        defaultDialog: false,
      },
    });

    function openPopUp(popUpType) {
      store.set({
        ...store.state,
        show: {
          ...store.state.show,
          [popUpType]: true,
        },
      });
    }

    function hidePopUp(popUpType) {
      store.set({
        ...store.state,
        show: {
          ...store.state.show,
          [popUpType]: false,
        },
      });
    }

    function confirm() {
      alert('Confirmed');
    }

    return (
      <State
        store={store}
      >
        {state =>
          <ItemGroup
            title='Dialog'
          >
            <Item>
              <button
                onClick={() => openPopUp('defaultDialog')}
                style={{ cursor: 'pointer' }}
              >
                Open Default Dialog
              </button>

              <Dialog.Wrapper
                dismiss={() => hidePopUp('defaultDialog')}
                open={state.show.defaultDialog}
              >
                <Dialog.Header
                  cancel={() => hidePopUp('defaultDialog')}
                >
                  Test Dialog Title
                </Dialog.Header>

                <Dialog.Body>
                  Default Dialog Body
                </Dialog.Body>

                <Dialog.Actions>
                  <button onClick={() => hidePopUp('defaultDialog')}>
                    Cancel
                  </button>
                  <button onClick={confirm}>Action</button>
                </Dialog.Actions>

              </Dialog.Wrapper>
            </Item>

          </ItemGroup>
        }
      </State>
    );
  });
