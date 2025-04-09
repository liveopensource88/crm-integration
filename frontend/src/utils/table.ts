import { TableColumn } from '@/types';

const formatDate = (value: string) => {
  const date = new Date(value);
  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

export const renderBodyTemplate = <T>(rowData: T, column: TableColumn<T>) => {
  if (column.body) {
    return column.body(rowData);
  }

  const fieldValue = column.field ? rowData[column.field] : null;

  if (column.dataType === 'date' && fieldValue && typeof fieldValue === 'string') {
    return formatDate(fieldValue);
  }

  return fieldValue ?? null;
};
