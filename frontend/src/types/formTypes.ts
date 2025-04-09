export type FieldInputType = 'text' | 'password';
export type Action = 'create' | 'update';
export type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

export interface FormProps<T> {
  id: string;
  action: Action;
  initialData?: T;
  onSuccess?: () => void;
}

interface FieldLayout {
  rowIndex: number;
  columnWidth: number;
}

export interface FieldSchema {
  name: string;
  label: string;
  placeholder: string;
  dependsOn: Array<string>;
  layout: FieldLayout;
  control: string;
  validations?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    messages?: {
      minLength?: string;
      maxLength?: string;
      pattern?: string;
      required?: string;
    };
  };
}

export interface InputTextFieldSchema extends FieldSchema {
  type: FieldInputType;
}
export interface DropdownFieldSchema extends FieldSchema {
  api?: {
    url: string;
    mapping: Record<string, string>;
  };
  options?: Array<{ name: string; id: string }>;
}

interface Message {
  success: string;
  error: string;
}
interface Api {
  url: string;
  method: HttpMethod;
  message: Message;
}
export interface Operation {
  api: Api;
  visible: string[];
  required: string[];
  readOnly: string[];
}
interface Operations {
  create: Operation;
  update: Operation;
}
export interface FormSchema {
  id: string;
  name: string;
  fields: FieldSchema[];
  operations: Operations;
}

export interface SchemaResponse {
  data: FormSchema;
}
