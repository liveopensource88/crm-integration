import React, { useEffect, useRef, useState } from 'react';
import { Card } from 'primereact/card';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Skeleton } from 'primereact/skeleton';
import { crmService } from '@/services';
import { Crm } from '@/types';
import './Crms.css';
import { configurationService } from '@/services/configuration.service';
import { Toast } from 'primereact/toast';
const Crms: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const toast = useRef<Toast>(null);

  const [crms, setCrms] = useState<Crm[]>([]);
  const renderHeader = (image: string) => <img alt="Card" height="150" src={image} />;
  const renderFooter = (uuid: string, isConfigured: boolean | undefined) => (
    <div className="flex flex-wrap justify-content-end gap-2">
      <Button
        label={isConfigured ? 'Connected' : 'Connect'}
        icon="pi pi-cog"
        onClick={() => !isConfigured && handleClick(uuid)}
        disabled={isConfigured}
      />
    </div>
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [crmResponse, configResponse] = await Promise.allSettled([
          crmService.getAll(),
          configurationService.getConfiguration()
        ]);

        if (crmResponse.status === 'fulfilled') {
          const crmData = crmResponse.value.data;
          const configuredType =
            configResponse.status === 'fulfilled' ? configResponse.value?.data?.type : null;

          const activeCrms = crmData?.map((crm: Crm) => ({
            ...crm,
            isConfigured: crm.id === configuredType
          }));

          setCrms(activeCrms);
        } else {
          console.error('Error fetching CRM data:', crmResponse.reason);
          toast.current?.show({
            severity: 'error',
            detail: 'Error fetching CRM data. Please try again later.'
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.current?.show({
          severity: 'error',
          detail: 'Error fetching data. Please try again later.'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleClick = (uuid: string) => {
    navigate(`/integrations/${uuid}`);
  };

  return (
    <div className="grid-container">
      <Toast ref={toast} />
      {loading ? (
        <>
          <Skeleton width="25rem" height="10rem" className="mr-2"></Skeleton>
          <Skeleton width="25rem" height="10rem" className="mr-2"></Skeleton>
          <Skeleton width="25rem" height="10rem"></Skeleton>
        </>
      ) : (
        crms.map(crm => (
          <Card
            key={crm.id}
            title={crm.name}
            header={renderHeader(crm.image)}
            footer={renderFooter(crm.id, crm.isConfigured)}>
            <p className="m-0">{crm.description}</p>
          </Card>
        ))
      )}
    </div>
  );
};

export default Crms;
