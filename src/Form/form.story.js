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
import { DateInput } from '../DateInput';
import { isValidFormatType, isValidFormat, isValidDate } from '../DatePicker/helpers';
import { DEFAULT_FORMAT } from '../DatePicker/constants';

import { ItemGroup } from '../helpers/ItemGroup';
import { ItemRow } from '../helpers/ItemRow';
import { Item } from '../helpers/Item';

const format = DEFAULT_FORMAT;

const scheme = Yup.object().shape({
  email: Yup.string()
    .email()
    .required('Required'),
  password: Yup.string()
    .required('Required')
    .matches(
      /^(?=.*\d)(?=.*[^a-zA-Z0-9])(?!.*\\s).{6,20}$/,
      'Must Contain ...',
    ),
  bday: Yup.string()
    .required('Required')
    .test('format', 'Format type error', () => (
      isValidFormatType(format)
    ))
    .test('validateFormat', 'Invalid format', value => (
      value ? isValidFormat(value, format) : true
    ))
    .test('validateDate', 'Invalid date', value => (
      value ? isValidDate(value, format) : true
    )),
});

const formValues = {
  email: 'test@test.com',
  password: 'as@#$@#$%4235df',
  bday: '14/11/1995',
};

storiesOf('Form', module)
  .add('Examples', () => (
    <>
      <ItemGroup
        title='Forms'
      >
        <ItemRow>
          <Item>
            <Form
              initialValues={{
                email: 'test@test.com',
                password: '',
                bday: '',
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  console.dir(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 500);
              }}
              initialTouched={{
                password: true,
                email: true,
                bday: true,
              }}
              validationSchema={scheme}
              validateOnMount
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
              <Label>
                Birthday
                <WithValidation
                  component={DateInput}
                  name='bday'
                  disabledWhileSubmitting
                />
              </Label>
              <WithErrorFeedback
                name='bday'
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
          <Item>
            <Form
              action='/'
              method='POST'
              initialValues={formValues}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
              }}
              initialTouched={{
                password: true,
                email: true,
                bday: true,
              }}
              validationSchema={scheme}
              validateOnMount
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
              <Label>
                Birthday
                <WithValidation
                  component={DateInput}
                  name='bday'
                  disabledWhileSubmitting
                />
              </Label>
              <WithErrorFeedback
                name='bday'
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
          <Item>
            <Form
              action='/'
              method='POST'
              initialValues={{ ...formValues, password: '123asd' }}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
              }}
              initialTouched={{
                password: true,
                email: true,
                bday: true,
              }}
              validationSchema={scheme}
              validateOnMount
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
              <Label>
                Birthday
                <WithValidation
                  component={DateInput}
                  name='bday'
                  disabledWhileSubmitting
                />
              </Label>
              <WithErrorFeedback
                name='bday'
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
