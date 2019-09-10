import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from '@sambego/storybook-state';

import { Table } from '.';
import { COLUMNS, ROWS, SORTING_DIRECTIONS } from './storyData';

import { Icon } from '../Icon';
import { Label } from '../Label';
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
  itemsPerPage: 10,
  sortOptions,
  sortedRows: ROWS.sort((a, b) => sortData(a, b, sortOptions)),
});

storiesOf('Data Table', module)
  .add('Examples', () => {
    const itemsPerPageOptions = [10, 20, 50, 100];

    const pageSiblingCount = 2;
    const total = ROWS.length;

    function handlePageClick(page) {
      store.set({
        ...store.state,
        page,
      });
    }

    function handleItemsPerPageChange({ target }) {
      store.set({
        ...store.state,
        itemsPerPage: target.value,
        page: 1,
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
          const rows = state.sortedRows.slice(
            state.itemsPerPage * (state.page - 1),
            total < state.itemsPerPage * state.page ? total : state.itemsPerPage * state.page,
          );

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
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                      }}
                    >
                      <Table.Pagination.Info
                        page={state.page}
                        itemsPerPage={state.itemsPerPage}
                        total={total}
                        style={{ minWidth: 100 }}
                      />
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                        }}
                      >
                        <Label
                          display='col'
                          style={{
                            margin: 4,
                          }}
                        >
                          <span style={{ marginRight: 16, color: '#999999' }}>
                            Items per page
                          </span>
                          <Table.Pagination.Select
                            options={itemsPerPageOptions}
                            value={state.itemsPerPage}
                            onChange={handleItemsPerPageChange}
                          />
                        </Label>
                        {total >= state.itemsPerPage && (
                          <Table.Pagination
                            page={state.page}
                            itemsPerPage={state.itemsPerPage}
                            total={total}
                            onPageClick={handlePageClick}
                            pageSiblingCount={pageSiblingCount}
                            nextElem={(
                              <Icon
                                name='arrow-right'
                              />
                            )}
                            previousElem={(
                              <Icon
                                name='arrow-left'
                              />
                            )}
                            style={{ margin: 4 }}
                          />
                        )}
                      </div>
                    </div>
                  </Table.Footer>
                </Table>
              </Item>
            </ItemGroup>
          );
        }}
      </State>
    );
  });
