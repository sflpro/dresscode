import React from 'react';
import { storiesOf } from '@storybook/react';
import * as Yup from 'yup';

import { Form } from '.';
import { FormButton } from './FormButton';

import { TextInput } from '../TextInput';
import { Label } from '../Label';
import { WithValidation } from '../WithValidation';

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
            >
              <Label>
                Email
                <WithValidation
                  component={TextInput}
                  name='email'
                />
              </Label>
              <FormButton
                type='submit'
                style={{ marginTop: 16 }}
              >
                Submit
              </FormButton>
            </Form>
          </Item>
        </ItemRow>
      </ItemGroup>
    </>
  ));
