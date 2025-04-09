import { ColumnProps } from 'primereact/column';

export interface ContainerProps {
  children: React.ReactNode;
}

export interface TableColumn<T> extends ColumnProps {
  field: Extract<keyof T, string>;
  body?: (rowData: T) => JSX.Element;
}

export interface DialerEvent {
  type: 'call_received' | 'call_answered';
  [key: string]: string | number | boolean;
}
