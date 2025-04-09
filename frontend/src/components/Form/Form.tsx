import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Button } from 'primereact/button';
import { Skeleton } from 'primereact/skeleton';
import {
  DropdownFieldSchema,
  FieldInputType,
  FormProps,
  FormSchema,
  HttpMethod,
  InputTextFieldSchema
} from '@/types';
import { formService, schemaService } from '@/services';

import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import './Form.css';
import { API_BASE_URL, API_VERSION } from '@/config';

type FormValue = string | boolean | null | { id: string };
type DropdownOption = { name: string; id: string };

const Form = <T,>({ id, onSuccess, action, initialData }: FormProps<T>) => {
  const [schema, setSchema] = useState<FormSchema | null>(null);
  const [formData, setFormData] = useState<Record<string, FormValue>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [dropdownOptions, setDropdownOptions] = useState<Record<string, DropdownOption[]>>({});
  const toast = useRef<Toast>(null);

  useEffect(() => {
    const fetchSchema = async () => {
      if (!id) return console.error('ID not provided');

      setLoading(true);
      try {
        const { data } = await schemaService.get(id);
        setSchema(data);

        const dropdownFetches = data.fields
          .filter((field): field is DropdownFieldSchema => {
            return field.control === 'Dropdown' && !field.dependsOn;
          })
          .map(async field => {
            try {
              let optionsData: DropdownOption[] = [];

              if (field.options) {
                optionsData = field.options as DropdownOption[];
              } else if (field.api?.url) {
                const { data } = await formService.get(
                  `${API_BASE_URL}${API_VERSION}/` + field.api.url
                );
                optionsData = data;

                if (field?.api?.mapping && typeof field.api.mapping === 'object') {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  optionsData = optionsData.map((item: any) => {
                    if (field.api)
                      Object.keys(field.api.mapping).forEach(backendKey => {
                        const backendKeys = backendKey.split(',');
                        const frontendKey = field?.api?.mapping[backendKey];

                        if (frontendKey && typeof frontendKey === 'string') {
                          let value = '';
                          backendKeys.forEach((key: string) => {
                            const itemValue = item[key];
                            if (itemValue) {
                              value += itemValue + ' ';
                            }
                          });

                          item[frontendKey] = value.trim();
                        }
                      });

                    return item;
                  });
                }

                if (!Array.isArray(optionsData)) {
                  console.warn(
                    `Expected options data to be of type DropdownOption[] but received:`,
                    optionsData
                  );
                  optionsData = [];
                }
              }

              setDropdownOptions(prev => ({
                ...prev,
                [field.name]: optionsData
              }));
            } catch (error) {
              console.error(`Error fetching options for ${field.name}:`, error);
            }
          });

        await Promise.all(dropdownFetches);
        const operation = data.operations[action];

        setFormData(
          data.fields.reduce((acc, field) => {
            if (operation.visible.includes(field.name)) {
              const value =
                initialData && typeof initialData === 'object' && field.name in initialData
                  ? (initialData as Record<string, string | undefined>)[field.name]
                  : '';
              acc[field.name] = value || null;
            }
            return acc;
          }, {} as Record<string, FormValue>)
        );
      } catch (error) {
        console.error('Error fetching schema:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchema();
  }, [action, id, initialData]);

  const fetchDependentDropdownOptions = useCallback(async () => {
    if (!schema) return;

    const dependentDropdownFetches = schema.fields.filter((field): field is DropdownFieldSchema => {
      return (
        field.control === 'Dropdown' && Array.isArray(field.dependsOn) && field.dependsOn.length > 0
      );
    });

    dependentDropdownFetches.map(async field => {
      if (field.api?.url) {
        const dependencyValues = field.dependsOn.map(dep => formData[dep]);
        if (dependencyValues.every(value => value !== undefined && value !== null)) {
          try {
            let apiUrl = field.api.url;
            field.dependsOn.forEach((dep, index) => {
              apiUrl = apiUrl.replace(`{${dep}}`, String(dependencyValues[index]));
            });

            const { data: optionsData } = await formService.get(
              `${API_BASE_URL}${API_VERSION}/` + apiUrl
            );

            setDropdownOptions(prev => ({
              ...prev,
              [field.name]: optionsData
            }));
          } catch (error) {
            console.error(`Error fetching options for ${field.name}:`, error);
          }
        } else {
          setDropdownOptions(prev => ({
            ...prev,
            [field.name]: []
          }));
        }
      }
    });

    await Promise.all(dependentDropdownFetches);
  }, [formData, schema]);

  useEffect(() => {
    fetchDependentDropdownOptions();
  }, [formData, fetchDependentDropdownOptions]);

  const handleChange = (name: string, value: FormValue) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));

    const dependentFields = schema?.fields.filter(
      (field): field is DropdownFieldSchema =>
        field.control === 'Dropdown' && field.dependsOn && field.dependsOn.includes(name)
    );

    dependentFields?.forEach(dependentField => {
      setDropdownOptions(prev => ({
        ...prev,
        [dependentField.name]: []
      }));
      setFormData(prev => ({ ...prev, [dependentField.name]: null }));
    });
  };

  const validateForm = useCallback(() => {
    const operation = schema?.operations[action];

    const newErrors =
      schema?.fields.reduce((acc, field) => {
        const value = formData[field.name];
        const isVisible = operation?.visible.includes(field.name);
        const isRequired = operation?.required.includes(field.name);
        const validations = field.validations || {};

        // Check if the field is required and visible
        if (isVisible && isRequired && !value) {
          const message = validations.messages?.required || `${field.label} is required.`;
          acc[field.name] = message.replace('{label}', field.label);
        } else if (isVisible && value !== undefined) {
          const valueToValidate =
            typeof value === 'object' && value !== null && 'id' in value ? value.id : value ?? '';

          if (typeof valueToValidate === 'string') {
            // Validate minLength
            if (validations.minLength && valueToValidate.length < validations.minLength) {
              const message =
                validations.messages?.minLength ||
                `${field.label} must be at least ${validations.minLength} characters.`;
              acc[field.name] = message
                .replace('{label}', field.label)
                .replace('{minLength}', validations.minLength?.toString());
            }

            // Validate maxLength
            if (validations.maxLength && valueToValidate.length > validations.maxLength) {
              const message =
                validations.messages?.maxLength ||
                `${field.label} must be no more than ${validations.maxLength} characters.`;
              acc[field.name] = message
                .replace('{label}', field.label)
                .replace('{maxLength}', validations.maxLength?.toString());
            }

            // Validate pattern
            if (validations.pattern && !new RegExp(validations.pattern).test(valueToValidate)) {
              const message = validations.messages?.pattern || `${field.label} format is invalid.`;
              acc[field.name] = message.replace('{label}', field.label);
            }
          }
        }
        return acc;
      }, {} as Record<string, string>) || {};

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [schema, formData, action]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const operation = schema?.operations[action];

    if (validateForm() && operation?.api.url) {
      setSubmitted(true);
      try {
        const processedFormData = Object.fromEntries(
          Object.entries(formData).map(([key, value]) =>
            typeof value === 'object' && value !== null && 'id' in value
              ? [key, value.id]
              : [key, value]
          )
        );
        let apiUrl = operation.api.url;
        if (initialData) {
          apiUrl = apiUrl.replace(/{(\w+)}/g, (match, key) => {
            const typedInitialData = initialData as { [key: string]: string };
            return typedInitialData[key] !== undefined ? typedInitialData[key] : match;
          });
        }
        apiUrl = `${API_BASE_URL}${API_VERSION}/` + apiUrl;
        const validMethods: HttpMethod[] = ['post', 'put', 'patch'];

        const method = validMethods.includes(operation.api.method as HttpMethod)
          ? operation.api.method
          : 'post';

        await schemaService.save(
          apiUrl,
          {
            ...processedFormData,
            ...Object.fromEntries(
              Object.entries(initialData ?? {})
                .filter(([key]) => !(key in processedFormData))
                .map(([key, value]) => [key, value as string | boolean | null])
            )
          },
          method
        );
        toast.current?.show({ severity: 'success', detail: operation.api.message.success });
        onSuccess?.();
      } catch (error) {
        console.error('Error occurred:', error);
        toast.current?.show({ severity: 'error', detail: operation.api.message.error });
      } finally {
        setSubmitted(false);
      }
    }
  };

  const renderSkeletion = () => (
    <>
      <Skeleton width="30rem" height="3rem" className="mb-2" />
      <Skeleton width="30rem" height="3rem" className="mb-2" />
      <Skeleton width="30rem" height="3rem" className="mb-2" />
      <Skeleton width="30rem" height="3rem" className="mb-2" />
      <Skeleton width="10rem" height="3rem" className="mb-2" />
    </>
  );

  const renderFields = () => {
    const operation = schema?.operations[action];
    const fields = schema?.fields ?? [];
    const visibleFields = fields.filter(({ name }) => operation?.visible?.includes(name));

    let currentRow = Math.max(...visibleFields.map(field => field.layout?.rowIndex || 0)) + 1;

    const groupedFields = visibleFields.reduce((acc, { layout, ...field }) => {
      const rowIndex = layout?.rowIndex ?? currentRow++;

      if (!acc[rowIndex]) acc[rowIndex] = [];
      acc[rowIndex].push({ layout, ...field });

      return acc;
    }, {} as Record<number, typeof visibleFields>);

    return Object.keys(groupedFields).map(rowKey => {
      const fieldsInRow = groupedFields[Number(rowKey)];

      return (
        <div key={`row-${rowKey}`} className="formgrid grid">
          {fieldsInRow.map(field => {
            const { name, label, placeholder, layout, control } = field;

            const isReadOnly = operation?.readOnly.includes(name);
            const isRequired = operation?.required.includes(name);
            const error = errors[name];
            const colClass = `field col-12 md:col-${layout?.columnWidth ?? 6}`;

            let fieldContent: JSX.Element | null = null;

            const commonProps = {
              id: name,
              value: (formData[name] as string) || '',
              onChange: (e: { target: { value: string | boolean | { id: string } | null } }) =>
                handleChange(name, e.target.value),
              className: classNames('text-500', { 'p-invalid': !!error }),
              required: isRequired,
              disabled: isReadOnly
            };
            switch (control) {
              case 'InputText': {
                const supportedInputTextTypes = new Set<FieldInputType>(['text', 'password']);
                const fieldType = (field as InputTextFieldSchema).type as FieldInputType;

                if (!supportedInputTextTypes.has(fieldType)) {
                  console.warn(`Unsupported type for InputText: ${fieldType}`);
                  return null;
                }
                fieldContent = <InputText {...commonProps} type={fieldType} />;
                break;
              }
              case 'InputTextarea':
                fieldContent = <InputTextarea {...commonProps} rows={5} cols={30} />;
                break;

              case 'Dropdown':
                fieldContent = (
                  <Dropdown
                    {...commonProps}
                    filter
                    options={dropdownOptions[name] || []}
                    optionLabel="name"
                    optionValue="id"
                    placeholder={placeholder}
                  />
                );
                break;

              default:
                console.warn(`Unsupported field control: ${control}`);
                return null;
            }

            return (
              <div key={name} className={colClass}>
                <label htmlFor={name} className="block text-900 font-medium mb-2">
                  {label}
                  {isRequired && <span className="p-error">*</span>}
                </label>
                {fieldContent}
                {error && (
                  <div className="p-error">
                    <small>{error}</small>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      );
    });
  };

  return (
    <div className="p-fluid">
      <Toast ref={toast} />
      {loading
        ? renderSkeletion()
        : schema && (
            <form onSubmit={handleSubmit}>
              {renderFields()}
              <div className="p-fluid formgrid grid">
                <div className="field col-12 md:col-3">
                  <Button label="Submit" type="submit" onClick={handleSubmit} loading={submitted} />
                </div>
              </div>
            </form>
          )}
    </div>
  );
};

export default Form;
