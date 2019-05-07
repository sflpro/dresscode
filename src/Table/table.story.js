import React from 'react';
import { storiesOf } from '@storybook/react';

import { Table } from '.';
import { TableHead } from './TableHead';
import { TableColumn } from './TableColumn';
import { TableRow } from './TableRow';
import { TableBody } from './TableBody';

import { ItemGroup } from '../helpers/ItemGroup';
import { Item } from '../helpers/Item';

storiesOf('Data Table', module)
  .add('Examples', () => {
    const columns = [{
      id: 'firstName',
      children: 'First Name',
      priority: 1,
      minWidth: 150,
      sortable: true,
    },
    {
      id: 'lastName',
      children: 'Last Name',
      priority: 3,
      minWidth: 100,
      sortable: false,
    },
    {
      id: 'age',
      children: 'Age',
      priority: 2,
      minWidth: 200,
      sortable: true,
    }];

    return (
      <>
        <ItemGroup
          title='Data Table'
        >
          <Item>
            <Table>
              <TableHead>
                <TableRow
                  head
                  hover={false}
                >
                  {columns.map(column => (
                    <TableColumn
                      key={column.id}
                      {...column}
                      head
                    />
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableColumn
                    id='firstName'
                  >
                    john
                  </TableColumn>
                  <TableColumn
                    id='lastName'
                  >
                    smith
                  </TableColumn>
                  <TableColumn
                    id='age'
                  >
                    34
                  </TableColumn>
                </TableRow>
                <TableRow>
                  <TableColumn
                    id='firstName'
                  >
                    lorem
                  </TableColumn>
                  <TableColumn
                    id='lastName'
                  >
                    ipsum
                  </TableColumn>
                  <TableColumn
                    id='age'
                  >
                    26
                  </TableColumn>
                </TableRow>
              </TableBody>
            </Table>
          </Item>
        </ItemGroup>
      </>
    );
  });
