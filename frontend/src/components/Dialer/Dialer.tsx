import React, { useState, useCallback, useMemo, useContext } from 'react';
import './Dialer.css';
import Form from '../Form';
import { cleanNumber } from '@/utils';
import { AuthContext } from '@/context/AuthContext';
import { DialerEvent } from '@/types';
import { SOCKET_BASE_URL } from '@/config';

const Dialer: React.FC = () => {
  const authContext = useContext(AuthContext);
  const socketUrl = useMemo(() => {
    const idToken = authContext?.idToken || '';
    const decodedToken = JSON.parse(atob(idToken.split('.')[1]));

    const userPhone = cleanNumber(decodedToken.phone_number || 'guest');
    return `${SOCKET_BASE_URL}?userId=${userPhone}`;
  }, [authContext?.idToken]);

  const [initialData, setInitialData] = useState<{ phone: string | null }>({ phone: null });
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [retryCount, setRetryCount] = useState(0);

  const onSuccess = useCallback(() => {
    console.log('Form submission succeeded');
  }, []);

  const handleMessage = useCallback((data: DialerEvent) => {
    console.log('Handling message:', data);
    if (data.type === 'call_received') {
      console.log('Call received');
    } else if (data.type === 'call_answered') {
      console.log('Call answered');
    }
  }, []);

  const connectWebSocket = useCallback(() => {
    const socket = new WebSocket(socketUrl);

    socket.onopen = () => {
      console.log('WebSocket connected');
      setIsConnected(true);
    };

    socket.onmessage = event => {
      console.log('Message received:', JSON.parse(event.data));

      const data = JSON.parse(event.data);
      if (data.caller_id_number) {
        setInitialData({ phone: data.caller_id_number });
      }
      handleMessage(data);
    };

    socket.onerror = err => {
      console.error('WebSocket error:', err);
      setIsConnected(false);
    };

    socket.onclose = event => {
      console.log('WebSocket closed:', event);
      console.log(`Close reason: ${event.reason}, Code: ${event.code}`);
      setIsConnected(false);

      if (retryCount < 5) {
        const backoffTime = Math.pow(2, retryCount) * 1000;
        console.log(`Retrying WebSocket connection in ${backoffTime / 1000} seconds...`);

        setRetryCount(prev => prev + 1);
        setTimeout(connectWebSocket, backoffTime);
      } else if (retryCount >= 5) {
        console.log('Max retries reached');
      }
    };

    return socket;
  }, [socketUrl, handleMessage, retryCount]);

  useMemo(() => {
    const socket = connectWebSocket();
    return () => {
      console.log('Cleanup: closing WebSocket connection');
      socket.close();
    };
  }, [connectWebSocket]);

  return (
    <div className="grid">
      <div className="col-12 md:col-7">
        {/* Uncomment and modify the iframe as needed */}
        {/* <iframe
          referrerPolicy="unsafe-url"
          allow="geolocation; microphone; camera *"
          height="500"
          id="dialeriframe"
          name="dialeriframe"
          src="https://cloudphone.tatateleservices.com/dialer/login"
          title="Salesforce Smartflo Dialer"
          width="100%"
        /> */}
      </div>

      <div className="col-12 md:col-5">
        {isConnected && initialData.phone ? (
          <div className="bg-white p-2 border-1 border-50 border-round">
            <h2>Create Ticket</h2>
            <Form
              id="zoho-crm-ticket-schema"
              action="create"
              initialData={initialData}
              onSuccess={onSuccess}
            />
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Dialer;
