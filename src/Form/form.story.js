import React from 'react';
import { storiesOf } from '@storybook/react';
import * as Yup from 'yup';

import { Form } from '.';

import { Error } from '../Error';
import { Button } from '../Button';
import { TextInput } from '../TextInput';
import { Label } from '../Label';
import { WithValidation } from '../WithValidation';
import { WithFormFeedback } from '../WithFormFeedback';
import { WithErrorFeedback } from '../WithErrorFeedback';

import { ItemGroup } from '../helpers/ItemGroup';
import { ItemRow } from '../helpers/ItemRow';
import { Item } from '../helpers/Item';

storiesOf('Form', module)
  .add('Examples', () => (
    <>
      <ItemGroup
        title='Button'
      >
        <ItemRow>
          <Item>
            <Form
              initialValues={{ email: '' }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 500);
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .email()
                  .required('Required'),
              })}
              passEventOnSubmit
            >
              <Label>
                Email
                <WithValidation
                  component={TextInput}
                  name='email'
                  disabledWhileSubmitting
                />
              </Label>
              <WithErrorFeedback
                name='email'
              >
                {({ error }) => (
                  error ? (
                    <Error>
                      {error}
                    </Error>
                  ) : null)}
              </WithErrorFeedback>
              <WithFormFeedback>
                {({ isSubmitting }) => (
                  <Button
                    type='submit'
                    disabled={isSubmitting}
                    style={{ marginTop: 16 }}
                  >
                    Submit
                  </Button>
                )}
              </WithFormFeedback>
            </Form>
          </Item>
        </ItemRow>
      </ItemGroup>
    </>
  ));
