import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from '@sambego/storybook-state';

import { Table } from '.';
import { COLUMNS, ROWS, SORTING_DIRECTIONS } from './storyData';
import { TableHead } from './TableHead';
import { TableColumn } from './TableColumn';
import { TableRow } from './TableRow';
import { TableBody } from './TableBody';
import { TableCaption } from './TableCaption';
import { TableFooter } from './TableFooter';
import { TablePagination } from './TablePagination';

import { ItemGroup } from '../helpers/ItemGroup';
import { Item } from '../helpers/Item';

const sortOptions = {
  direction: SORTING_DIRECTIONS.DESC,
  prop: COLUMNS[2].id,
};

const sortData = (a, b, { direction, prop }) => {
  const dir = direction === SORTING_DIRECTIONS.DESC ? -1 : 1;
  return dir * (a.columns[prop].children.toString() < b.columns[prop].children.toString()
    ? -1 : (a.columns[prop].children.toString() > b.columns[prop].children.toString()
      ? 1 : 0));
};

const store = new Store({
  page: 1,
  sortOptions,
  sortedRows: ROWS.sort((a, b) => sortData(a, b, sortOptions)),
});

storiesOf('Data Table', module)
  .add('Examples', () => {
    const pageCount = 10;
    const total = ROWS.length;

    function handlePageClick(page) {
      store.set({
        ...store.state,
        page,
      });
    }

    function handleTableSorting(sort) {
      store.set({
        ...store.state,
        sortOptions: sort,
        sortedRows: store.state.sortedRows.sort((a, b) => sortData(a, b, sort)),
      });
    }

    return (
      <State store={store}>
        {(state) => {
          const rows = state.sortedRows.slice(pageCount * (state.page - 1), total < pageCount * state.page ? total : pageCount * state.page);
          return (
            <ItemGroup
              title='Data Table'
              style={{ backgroundColor: '#F7F7F7' }}
            >
              <Item>
                <Table
                  sortOptions={state.sortOptions}
                  onTableSort={handleTableSorting}
                >
                  <TableCaption
                    title='Title'
                  />
                  <TableHead>
                    <TableRow
                      head
                      hover={false}
                    >
                      {COLUMNS.map(column => (
                        <TableColumn
                          key={column.id}
                          {...column}
                          head
                        />
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, rowIndex) => (
                      <TableRow
                        key={rowIndex}
                      >
                        {Object.values(row.columns).map((column, columnIndex) => (
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
