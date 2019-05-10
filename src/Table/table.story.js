import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from '@sambego/storybook-state';

import { Table } from '.';
import { TableHead } from './TableHead';
import { TableColumn } from './TableColumn';
import { TableRow } from './TableRow';
import { TableBody } from './TableBody';
import { TableCaption } from './TableCaption';
import { TableFooter } from './TableFooter';
import { TablePagination } from './TablePagination';

import { ItemGroup } from '../helpers/ItemGroup';
import { Item } from '../helpers/Item';

const store = new Store({
  page: 1,
});

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

    const rows = [{
      columns: [{
        id: 'firstName',
        children: 'john',
      },
      {
        id: 'lastName',
        children: 'smith',
      },
      {
        id: 'age',
        children: '19',
      }],
    },
    {
      columns: [{
        id: 'firstName',
        children: 'aaa',
      },
      {
        id: 'lastName',
        children: 'bbb',
      },
      {
        id: 'age',
        children: '34',
      }],
    },
    {
      columns: [{
        id: 'firstName',
        children: 'sdsd',
      },
      {
        id: 'lastName',
        children: 'fdsgfg',
      },
      {
        id: 'age',
        children: '56',
      }],
    },
    {
      columns: [{
        id: 'firstName',
        children: 'ererr',
      },
      {
        id: 'lastName',
        children: 'ghghgh',
      },
      {
        id: 'age',
        children: '18',
      }],
    },
    {
      columns: [{
        id: 'firstName',
        children: 'qwewqe',
      },
      {
        id: 'lastName',
        children: 'sfdsgg',
      },
      {
        id: 'age',
        children: '37',
      }],
    },
    {
      columns: [{
        id: 'firstName',
        children: 'adadas',
      },
      {
        id: 'lastName',
        children: 'gfdhhh',
      },
      {
        id: 'age',
        children: '37',
      }],
    },
    {
      columns: [{
        id: 'firstName',
        children: 'dfdfdfd',
      },
      {
        id: 'lastName',
        children: 'hjhgjghj',
      },
      {
        id: 'age',
        children: '58',
      }],
    },
    {
      columns: [{
        id: 'firstName',
        children: 'asaszx',
      },
      {
        id: 'lastName',
        children: 'nvbvbnvbn',
      },
      {
        id: 'age',
        children: '26',
      }],
    },
    {
      columns: [{
        id: 'firstName',
        children: 'skyutkk',
      },
      {
        id: 'lastName',
        children: 'dsfret',
      },
      {
        id: 'age',
        children: '45',
      }],
    },
    {
      columns: [{
        id: 'firstName',
        children: 'ghgfhgf',
      },
      {
        id: 'lastName',
        children: 'yiyiyui',
      },
      {
        id: 'age',
        children: '29',
      }],
    },
    {
      columns: [{
        id: 'firstName',
        children: 'wyukjui',
      },
      {
        id: 'lastName',
        children: 'retert',
      },
      {
        id: 'age',
        children: '40',
      }],
    },
    {
      columns: [{
        id: 'firstName',
        children: 'fdgfdh',
      },
      {
        id: 'lastName',
        children: 'ghjhgj',
      },
      {
        id: 'age',
        children: '36',
      }],
    },
    {
      columns: [{
        id: 'firstName',
        children: 'weuk',
      },
      {
        id: 'lastName',
        children: 'yuiyti',
      },
      {
        id: 'age',
        children: '34',
      }],
    },
    {
      columns: [{
        id: 'firstName',
        children: 'dsfsfewr',
      },
      {
        id: 'lastName',
        children: 'uytuytu',
      },
      {
        id: 'age',
        children: '47',
      }],
    },
    {
      columns: [{
        id: 'firstName',
        children: 'john',
      },
      {
        id: 'lastName',
        children: 'smith',
      },
      {
        id: 'age',
        children: '19',
      }],
    },
    {
      columns: [{
        id: 'firstName',
        children: 'john',
      },
      {
        id: 'lastName',
        children: 'smith',
      },
      {
        id: 'age',
        children: '19',
      }],
    },
    {
      columns: [{
        id: 'firstName',
        children: 'john',
      },
      {
        id: 'lastName',
        children: 'smith',
      },
      {
        id: 'age',
        children: '19',
      }],
    },
    {
      columns: [{
        id: 'firstName',
        children: 'john',
      },
      {
        id: 'lastName',
        children: 'smith',
      },
      {
        id: 'age',
        children: '19',
      }],
    },
    {
      columns: [{
        id: 'firstName',
        children: 'john',
      },
      {
        id: 'lastName',
        children: 'smith',
      },
      {
        id: 'age',
        children: '19',
      }],
    },
    {
      columns: [{
        id: 'firstName',
        children: 'john',
      },
      {
        id: 'lastName',
        children: 'smith',
      },
      {
        id: 'age',
        children: '19',
      }],
    },
    {
      columns: [{
        id: 'firstName',
        children: 'john',
      },
      {
        id: 'lastName',
        children: 'smith',
      },
      {
        id: 'age',
        children: '19',
      }],
    },
    {
      columns: [{
        id: 'firstName',
        children: 'john',
      },
      {
        id: 'lastName',
        children: 'smith',
      },
      {
        id: 'age',
        children: '19',
      }],
    },
    {
      columns: [{
        id: 'firstName',
        children: 'john',
      },
      {
        id: 'lastName',
        children: 'smith',
      },
      {
        id: 'age',
        children: '19',
      }],
    }];

    const pageCount = 10;
    const total = rows.length;


    function handlePageClick(page) {
      store.set({
        ...store.state,
        page,
      });
    }

    return (
      <State store={store}>
        {(state) => {
          const rowsToShow = rows.slice(pageCount * (state.page - 1), total < pageCount * state.page ? total : pageCount * state.page);
          return (
            <ItemGroup
              title='Data Table'
              style={{ backgroundColor: '#F7F7F7' }}
            >
              <Item>
                <Table>
                  <TableCaption
                    title='Title'
                  />
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
                    {rowsToShow.map((row, rowIndex) => (
                      <TableRow
                        key={rowIndex}
                      >
                        {row.columns.map((column, columnIndex) => (
                          <TableColumn
                            key={`${rowIndex}-${columnIndex}`}
                            {...column}
                          />
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TablePagination
                      page={state.page}
                      pageCount={pageCount}
                      total={total}
                      onPageClick={handlePageClick}
                    />
                  </TableFooter>
                </Table>
              </Item>
            </ItemGroup>
          );
        }}
      </State>
    );
  });
