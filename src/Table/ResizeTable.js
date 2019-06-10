export const dynamicSort = ({ column }) => ((a, b) => (
  (a[column] < b[column]) ? -1 : (a[column] > b[column]) ? 1 : 0
));

export const addColumn = ({ columns }) => {
  let combinedColumns = [...columns];
  const visibleColumns = combinedColumns.filter(column => column.visible);
  const hiddenColumns = combinedColumns.filter(column => !column.visible);

  if (hiddenColumns.length !== 0) {
    hiddenColumns.sort(dynamicSort({ column: 'priority' }));
    const addedColumn = hiddenColumns.shift();
    visibleColumns.push({ ...addedColumn, visible: true });
    combinedColumns = [...visibleColumns, ...hiddenColumns];
  }

  return combinedColumns;
};

export const removeColumn = ({ columns }) => {
  let combinedColumns = [...columns];
  const visibleColumns = combinedColumns.filter(column => column.visible);
  const hiddenColumns = combinedColumns.filter(column => !column.visible);

  if (visibleColumns.length !== 0) {
    visibleColumns.sort(dynamicSort({ column: 'priority' }));
    const removedColumn = visibleColumns.pop();
    hiddenColumns.push({ ...removedColumn, visible: false });
    combinedColumns = [...visibleColumns, ...hiddenColumns];
  }

  return combinedColumns;
};

export const checkToRemoveColumns = ({ visibleColumnsWidth, width, columns }) => {
  const visibleColumns = columns.filter(column => column.visible);
  visibleColumns.sort(dynamicSort({ column: 'priority' }));

  let columnsWidth = visibleColumnsWidth;
  let updatedcolumns = columns;
  while (columnsWidth > width && visibleColumns.length !== 0) {
    columnsWidth -= visibleColumns.pop().width;
    updatedcolumns = removeColumn({ columns: updatedcolumns });
  }

  return updatedcolumns;
};

export const checkToAddColumns = ({ visibleColumnsWidth, width, columns }) => {
  const hiddenColumns = columns.filter(column => !column.visible);

  hiddenColumns.sort(dynamicSort({ column: 'priority' }));

  let columnsWidth = visibleColumnsWidth;
  let updatedcolumns = columns;
  while (columnsWidth <= width && hiddenColumns.length !== 0) {
    columnsWidth += hiddenColumns.shift().width;
    if (columnsWidth <= width) {
      updatedcolumns = addColumn({ columns: updatedcolumns });
    }
  }
  return updatedcolumns;
};

export const resizeTable = ({ width, columns }) => {
  const visibleColumns = columns.filter(column => column.visible);

  let visibleColumnsWidth = 0;
  visibleColumns.forEach((column) => {
    visibleColumnsWidth += column.width;
  });

  return visibleColumnsWidth > width
    ? checkToRemoveColumns({ visibleColumnsWidth, width, columns })
    : checkToAddColumns({ visibleColumnsWidth, width, columns });
};
