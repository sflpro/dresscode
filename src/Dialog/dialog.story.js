import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { State, Store } from '@sambego/storybook-state';
import { boolean } from '@storybook/addon-knobs';

import { Dialog } from '.';

import { ItemGroup } from '../helpers/ItemGroup';
import { Item } from '../helpers/Item';

import { InfoStoryConfig } from '../configs';

const content = {
  longContent: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece'
    + 'of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin'
    + 'professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words,'
    + 'consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical'
    + 'literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and'
    + '1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,'
    + 'written in 45 BC. This book is a treatise on the theory of ethics, very popular during'
    + 'the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in'
    + 'section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those'
    + 'interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced'
    + 'in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
    + 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical'
    + 'Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at'
    + 'Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a'
    + 'Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the'
    + 'undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"'
    + '(The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory'
    + ' of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor'
    + ' sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s'
    + ' is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum"'
    + ' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914'
    + 'translation by H. Rackham.',
  shortContent: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been'
    + 'the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and'
    + 'scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into'
    + 'electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of'
    + 'Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like'
    + 'Aldus PageMaker including versions of Lorem Ipsum',
};

storiesOf('Dialog', module)
  .add('Examples', () => {
    const store1 = new Store({
      open: false,
      dialogContent: null,
    });

    const toggleDialog1 = (open) => {
      store1.set({
        ...store1.state,
        open,
      });
    };

    const openWithContent1 = (contentType) => {
      const dialogContent = content[contentType] || content.shortContent;
      store1.set({
        ...store1.state,
        dialogContent,
      });
      toggleDialog1(true);
    };

    const confirm1 = () => {
      alert('Confirmed');
      toggleDialog1(false);
    };

    const store2 = new Store({
      open: false,
      dialogContent: null,
    });

    const toggleDialog2 = (toggle) => {
      store2.set({
        ...store2.state,
        open: toggle,
      });
    };

    const openWithContent2 = (contentType) => {
      const dialogContent = content[contentType] || content.shortContent;
      store2.set({
        ...store2.state,
        dialogContent,
      });
      toggleDialog2(true);
    };

    const store3 = new Store({
      open: false,
      dialogContent: null,
    });

    const toggleDialog3 = (toggle) => {
      store3.set({
        ...store3.state,
        open: toggle,
      });
    };

    const openWithContent3 = (contentType) => {
      const dialogContent = content[contentType] || content.shortContent;
      store3.set({
        ...store3.state,
        dialogContent,
      });
      toggleDialog3(true);
    };

    return [
      <State
        store={store1}
        key={1}
      >
        {state => (
          <ItemGroup
            title='With HEADER and FOOTER'
          >
            <Item>
              <button
                onClick={openWithContent1}
                type='button'
              >
                Open Dialog
              </button>
            </Item>
            <Item>
              <button
                onClick={() => openWithContent1('longContent')}
                type='button'
              >
                Open Dialog With Long Content
              </button>
            </Item>
            <Dialog
              onDismiss={() => toggleDialog1(false)}
              open={state.open}
            >
              <Dialog.Header>
                Test Dialog Title
              </Dialog.Header>
              <Dialog.Body>
                {state.dialogContent}
              </Dialog.Body>
              <Dialog.Actions>
                <button
                  onClick={() => toggleDialog1(false)}
                  type='button'
                >
                  Cancel
                </button>
                <button
                  onClick={confirm1}
                  type='button'
                >
                  Action
                </button>
              </Dialog.Actions>
            </Dialog>
          </ItemGroup>
        )}
      </State>,
      <State
        store={store2}
        key={2}
      >
        {state => (
          <ItemGroup
            title='Dialog With HEADER'
          >
            <Item>
              <button
                onClick={openWithContent2}
                type='button'
              >
                Open Dialog
              </button>
            </Item>
            <Item>
              <button
                onClick={() => openWithContent2('longContent')}
                type='button'
              >
                Open Dialog With Long Content
              </button>
            </Item>
            <Dialog
              onDismiss={() => toggleDialog2(false)}
              open={state.open}
            >
              <Dialog.Header>
                Test Dialog Title
              </Dialog.Header>
              <Dialog.Body>
                {state.dialogContent}
              </Dialog.Body>
            </Dialog>
          </ItemGroup>
        )}
      </State>,
      <State
        store={store3}
        key={3}
      >
        {withInfo({ inline: true, header: false })(state => (
          <ItemGroup
            title='Dialog Without HEADER and FOOTER'
          >
            <Item>
              <button
                onClick={openWithContent3}
                type='button'
              >
                Open Dialog
              </button>
            </Item>
            <Item>
              <button
                onClick={() => openWithContent3('longContent')}
                type='button'
              >
                Open Dialog With Long Content
              </button>
            </Item>
            <Dialog
              onDismiss={() => toggleDialog3(false)}
              open={state.open}
            >
              <Dialog.Body>
                {state.dialogContent}
              </Dialog.Body>
            </Dialog>
          </ItemGroup>
        ))}
      </State>,
    ];
  })
  .add('Dialog', () => (
    <Dialog
      open={false}
    >
      <Dialog.Header>
        Test Dialog Title
      </Dialog.Header>
      <Dialog.Body>
        {content.longContent}
      </Dialog.Body>
      <Dialog.Actions>
        <button
          type='button'
        >
          Cancel
        </button>
        <button
          type='button'
        >
          Action
        </button>
      </Dialog.Actions>
    </Dialog>
  ), InfoStoryConfig);
