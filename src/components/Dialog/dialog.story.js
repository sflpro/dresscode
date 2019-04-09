import React from 'react';
import { State, Store } from '@sambego/storybook-state';
import { storiesOf } from '@storybook/react';

import { Dialog } from '.';

import { ItemGroup } from '../../helpers/ItemGroup';
import { Item } from '../../helpers/Item';

storiesOf('Dialog', module)
  .add('With HEADER and FOOTER', () => {
    const store = new Store({
      open: false,
      dialogContent: null,
    });

    const content = {
      longContent: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
      shortContent: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
    };

    const toggleDialog = (open) => {
      store.set({
        ...store.state,
        open,
      });
    };

    const openWithContent = (contentType) => {
      const dialogContent = content[contentType] || content.shortContent;
      store.set({
        ...store.state,
        dialogContent,
      });
      toggleDialog(true);
    };

    const confirm = () => {
      alert('Confirmed');
      toggleDialog(false);
    };

    return (
      <State
        store={store}
      >
        {state => (


          <ItemGroup
            title='With HEADER and FOOTER'
          >
            <Item>
              <button onClick={openWithContent}>
                Open Dialog
              </button>
            </Item>
            <Item>
              <button onClick={() => openWithContent('longContent')}>
                Open Dialog With Long Content
              </button>
            </Item>
            {state.open && (
              <Dialog onDismiss={() => toggleDialog(false)}>
                <Dialog.Header>
                  Test Dialog Title
                </Dialog.Header>
                <Dialog.Body>
                  {state.dialogContent}
                </Dialog.Body>
                <Dialog.Actions>
                  <button onClick={() => toggleDialog(false)}>
                    Cancel
                  </button>
                  <button onClick={confirm}>Action</button>
                </Dialog.Actions>
              </Dialog>
            )}
          </ItemGroup>
        )}
      </State>
    );
  })
  .add('With HEADER', () => {
    const store = new Store({
      open: false,
      dialogContent: null,
    });

    const content = {
      longContent: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
      shortContent: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
    };

    const openWithContent = (contentType) => {
      const dialogContent = content[contentType] || content.shortContent;
      store.set({
        ...store.state,
        dialogContent,
      });
      toggleDialog(true);
    };

    const toggleDialog = (toggle) => {
      store.set({
        ...store.state,
        open: toggle,
      });
    };

    return (
      <State
        store={store}
      >
        {state =>
          <ItemGroup
            title='Dialog With HEADER'
          >
            <Item>
              <button onClick={openWithContent}>
                Open Dialog
              </button>
            </Item>
            <Item>
              <button onClick={() => openWithContent('longContent')}>
                Open Dialog With Long Content
              </button>
            </Item>

            {state.open && (
              <Dialog
                onDismiss={() => toggleDialog(false)}
              >
                <Dialog.Header>
                  Test Dialog Title
                </Dialog.Header>

                <Dialog.Body>
                  {state.dialogContent}
                </Dialog.Body>

              </Dialog>
            )}

          </ItemGroup>
        }
      </State>
    );
  })
  .add('Without HEADER and FOOTER', () => {
    const store = new Store({
      open: false,
      dialogContent: null,
    });

    const content = {
      longContent: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
      shortContent: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
    };

    const openWithContent = (contentType) => {
      const dialogContent = content[contentType] || content.shortContent;
      store.set({
        ...store.state,
        dialogContent,
      });
      toggleDialog(true);
    };

    const toggleDialog = (toggle) => {
      store.set({
        ...store.state,
        open: toggle,
      });
    };

    return (
      <State
        store={store}
      >
        {state =>
          <ItemGroup
            title='Dialog Without HEADER and FOOTER'
          >
            <Item>
              <button onClick={openWithContent}>
                Open Dialog
              </button>
            </Item>
            <Item>
              <button onClick={() => openWithContent('longContent')}>
                Open Dialog With Long Content
              </button>
            </Item>

            {state.open && (
              <Dialog
                onDismiss={() => toggleDialog(false)}
              >
                <Dialog.Body>
                  {state.dialogContent}
                </Dialog.Body>

              </Dialog>
            )}

          </ItemGroup>
        }
      </State>
    );
  });
