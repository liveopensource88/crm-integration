import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BreadCrumb } from 'primereact/breadcrumb';
import Form from './Form';
import { configurationService } from '@/services/configuration.service';
import { Toast } from 'primereact/toast';
import { Config } from '@/types';

const Configuration: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [config, setConfig] = useState<Config | undefined>(undefined);
  const toast = useRef<Toast>(null);

  const fetchConfig = useCallback(async () => {
    try {
      const { data } = await configurationService.getConfiguration(id);
      data.type = id;
      setConfig(data);
    } catch {
      toast.current?.show({ severity: 'error', detail: 'Error fetching tickets' });
    }
  }, [id]);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  const breadcrumb = {
    home: { icon: 'pi pi-home', command: () => navigate('/') },
    items: [
      { label: 'Integrations', command: () => navigate('/integrations') },
      { label: 'Configuration' }
    ]
  };

  return (
    <>
      <BreadCrumb model={breadcrumb.items} home={breadcrumb.home} />
      <h2>Configuration</h2>
      <Toast ref={toast} />
      {id ? <Form id={id} action="update" initialData={config} /> : null}
    </>
  );
};

export default Configuration;
