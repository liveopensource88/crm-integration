import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { useAuth } from '@/hooks';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useRef<Toast>(null);

  const from = (location.state as { from?: Location })?.from?.pathname || '/dialer';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err: unknown) {
      if (err instanceof Error)
        toast.current?.show({
          severity: 'error',
          detail: err.message
        });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-5 min-h-screen flex justify-content-center align-items-center">
      <form onSubmit={handleSubmit}>
        <Toast ref={toast} />
        <div className="border-1 surface-border surface-card border-round py-7 px-4 md:px-7 z-1">
          <div className="mb-4">
            <div className="text-900 text-xl font-bold mb-2">Log in</div>
            <span className="text-600 font-medium">Please enter your details</span>
          </div>
          <div className="flex flex-column">
            <IconField iconPosition="left" className="mb-4">
              <InputIcon className="pi pi-envelope"> </InputIcon>
              <InputText
                id="email"
                type="text"
                placeholder="Email address"
                className="w-full md:w-25rem"
                onChange={e => setEmail(e.target.value)}
              />
            </IconField>
            <IconField iconPosition="left" className="mb-4">
              <InputIcon className="pi pi-lock"> </InputIcon>
              <InputText
                id="password"
                type="password"
                placeholder="Password"
                className="w-full md:w-25rem"
                onChange={e => setPassword(e.target.value)}
              />
            </IconField>
            <Button className="w-full" loading={loading}>
              <span className="p-button-label">Log In</span>
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
