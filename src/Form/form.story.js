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
              initialValues={{ email: 'test@test.com', password: '' }}
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
                password: Yup.string()
                  .required('Required')
                  .matches(
                    /^(?=.*\d)(?=.*[^a-zA-Z0-9])(?!.*\\s).{6,20}$/,
                    'Must Contain ...',
                  ),
              })}
              preventAction
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
                {({ error, touched }) => (
                  error && touched ? (
                    <Error>
                      {error}
                    </Error>
                  ) : null)}
              </WithErrorFeedback>
              <Label>
                Password
                <WithValidation
                  component={TextInput}
                  name='password'
                  type='password'
                  disabledWhileSubmitting
                />
              </Label>
              <WithErrorFeedback
                name='password'
              >
                {({ error, touched }) => (
                  error && touched ? (
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
