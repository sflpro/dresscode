export const dynamicSort = ({ column }) => ((a, b) => (
  (a[column] < b[column]) ? -1 : (a[column] > b[column]) ? 1 : 0
));

export const addColumn = ({ columns }) => {
  let combinedColumns = [...columns];

  const visibleColumns = combinedColumns.filter(column => column.visible).sort(dynamicSort({ column: 'priority' }));
  const hiddenColumns = combinedColumns.filter(column => !column.visible).sort(dynamicSort({ column: 'priority' }));

  if (hiddenColumns.length !== 0) {
    const addedColumn = hiddenColumns.shift();
    const changedIndex = visibleColumns.length - 1;

    if (addedColumn.lastPriorities && addedColumn.lastPriorities.length > 0) {
      addedColumn.priority = addedColumn.lastPriorities.pop();
    }

    if (visibleColumns[changedIndex].lastPriorities && visibleColumns[changedIndex].lastPriorities.length > 0) {
      visibleColumns[changedIndex].priority = visibleColumns[changedIndex].lastPriorities.pop();
    }

    visibleColumns.push({ ...addedColumn, visible: true });
    combinedColumns = [...visibleColumns, ...hiddenColumns];
  }

  return combinedColumns;
};

export const removeColumn = ({ columns, removeItemIndex }) => {
  let combinedColumns = [...columns];
  const visibleColumns = combinedColumns.filter(column => column.visible).sort(dynamicSort({ column: 'priority' }));
  const hiddenColumns = combinedColumns.filter(column => !column.visible).sort(dynamicSort({ column: 'priority' }));
  let removedColumn;

  if (visibleColumns.length !== 0) {
    if (removeItemIndex !== visibleColumns.length - 1) {
      if (!visibleColumns[visibleColumns.length - 1].lastPriorities) {
        visibleColumns[visibleColumns.length - 1].lastPriorities = [];
      }

      if (!visibleColumns[removeItemIndex].lastPriorities) {
        visibleColumns[removeItemIndex].lastPriorities = [];
      }

      const tempPriority = visibleColumns[removeItemIndex].priority;

      visibleColumns[visibleColumns.length - 1].lastPriorities.push(visibleColumns[visibleColumns.length - 1].priority);
      visibleColumns[removeItemIndex].lastPriorities.push(tempPriority);

      visibleColumns[removeItemIndex].priority = visibleColumns[visibleColumns.length - 1].priority;
      visibleColumns[visibleColumns.length - 1].priority = tempPriority;
    }

    removedColumn = visibleColumns[removeItemIndex];

    visibleColumns.splice(removeItemIndex, 1);

    if (removedColumn) {
      hiddenColumns.push({ ...removedColumn, visible: false });
      combinedColumns = [...visibleColumns, ...hiddenColumns];
    }
  }

  return combinedColumns;
};

export const checkToRemoveColumns = ({ visibleColumnsWidth, width, columns }) => {
  const hiddenColumns = columns.filter(column => !column.visible).sort(dynamicSort({ column: 'priority' }));
  let visibleColumns = columns.filter(column => column.visible).sort(dynamicSort({ column: 'priority' }));

  let columnsWidth = visibleColumnsWidth;
  let allColumnsMustBeVisible = false;
  let updatedColumns = columns;

  while ((columnsWidth > width && visibleColumns.length !== 0) && !allColumnsMustBeVisible) {
    let i = visibleColumns.length - 1;

    for (; i >= 0; i--) {
      if (!visibleColumns[i].alwaysVisible) {
        columnsWidth -= visibleColumns[i].width;
        break;
      }
    }

    if (i < 0 || (i === 0 && columnsWidth === visibleColumnsWidth)) {
      const widthDiff = visibleColumnsWidth - width;
      const widthDiffPerColumn = widthDiff / visibleColumnsWidth.length;

      visibleColumns = visibleColumns.map((column) => {
        column.minWidth -= widthDiffPerColumn;

        return column;
      });

      updatedColumns = [...visibleColumns, ...hiddenColumns];

      allColumnsMustBeVisible = true;
    } else {
      updatedColumns = removeColumn({ columns: updatedColumns, removeItemIndex: i });
      visibleColumns = updatedColumns.filter(column => column.visible).sort(dynamicSort({ column: 'priority' }));
    }
  }

  return updatedColumns;
};

export const checkToAddColumns = ({ visibleColumnsWidth, width, columns }) => {
  const hiddenColumns = columns.filter(column => !column.visible).sort(dynamicSort({ column: 'priority' }));

  let columnsWidth = visibleColumnsWidth;
  let updatedColumns = columns;

  while (columnsWidth <= width && hiddenColumns.length !== 0) {
    columnsWidth += hiddenColumns.shift().width;

    if (columnsWidth <= width) {
      updatedColumns = addColumn({ columns: updatedColumns });
    }
  }
  return updatedColumns;
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
