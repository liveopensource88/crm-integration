import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';

interface TableToolbarProps {
  onNew?: () => void;
  onSearch: (value: string) => void;
}

const TableToolbar: React.FC<TableToolbarProps> = ({ onNew, onSearch }) => {
  const startToolbarTemplate = () =>
    onNew ? <Button label="New" icon="pi pi-plus" className="mr-2" onClick={onNew} /> : null;

  const endToolbarTemplate = () => (
    <IconField iconPosition="left">
      <InputIcon className="pi pi-search"> </InputIcon>
      <InputText
        type="search"
        placeholder="Search"
        onInput={e => onSearch(e.currentTarget.value)}
      />
    </IconField>
  );

  return <Toolbar className="mb-4" start={startToolbarTemplate} end={endToolbarTemplate}></Toolbar>;
};

export default TableToolbar;
