import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from '@sambego/storybook-state';

import { Table } from '.';
import { COLUMNS, ROWS, SORTING_DIRECTIONS } from './storyData';

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
    const itemsPerPage = 10;
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
          const rows = state.sortedRows.slice(itemsPerPage * (state.page - 1),
            total < itemsPerPage * state.page ? total : itemsPerPage * state.page);
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
                  <Table.Caption
                    title='Title'
                  />
                  <Table.Head>
                    <Table.Row
                      head
                      hover={false}
                    >
                      {COLUMNS.map(column => (
                        <Table.Column
                          key={column.id}
                          {...column}
                          head
                        />
                      ))}
                    </Table.Row>
                  </Table.Head>
                  <Table.Body>
                    {rows.map((row, rowIndex) => (
                      <Table.Row
                        key={rowIndex}
                      >
                        {Object.values(row.columns).map((column, columnIndex) => (
                          <Table.Column
                            key={`${rowIndex}-${columnIndex}`}
                            {...column}
                          />
                        ))}
                      </Table.Row>
                    ))}
                  </Table.Body>
                  <Table.Footer>
                    <Table.Pagination
                      page={state.page}
                      itemsPerPage={itemsPerPage}
                      total={total}
                      onPageClick={handlePageClick}
                    />
                  </Table.Footer>
                </Table>
              </Item>
            </ItemGroup>
          );
        }}
      </State>
    );
  });
