import { Avatar } from 'primereact/avatar';
import React from 'react';
import CustomerDetail from './CustomerDetail';
import './MiddleBlock.css';
const MiddleBlock: React.FC = () => {
  return (
    <>
      <div className="grid">
        <div className="col-12 md:col-6 lg:col-2">
          <div className="bg-primary hover:bg-primary-300 p-2 border-1 border-50 border-round">
            <div className="flex align-items-center justify-content-center">
              <div
                className="flex align-items-center justify-content-center border-round"
                style={{ height: '2.5rem' }}>
                <i className="pi pi-microphone text-white text-xl"></i>
              </div>
            </div>
            <div className="flex align-items-center justify-content-center text-white text-sm">
              Mute
            </div>
          </div>
        </div>

        <div className="col-12 md:col-6 lg:col-2">
          <div className="bg-orange-500 hover:bg-orange-200 p-2 border-1 border-50 border-round">
            <div className="flex align-items-center justify-content-center">
              <div
                className="flex align-items-center justify-content-center border-round"
                style={{ height: '2.5rem' }}>
                <i className="pi pi-pause text-white text-xl"></i>
              </div>
            </div>
            <div className="flex align-items-center justify-content-center text-white text-sm">
              Hold
            </div>
          </div>
        </div>

        <div className="col-12 md:col-6 lg:col-2">
          <div className="bg-green-500 hover:bg-green-200 p-2 border-1 border-50 border-round">
            <div className="flex align-items-center justify-content-center">
              <div
                className="flex align-items-center justify-content-center border-round"
                style={{ height: '2.5rem' }}>
                <i className="pi pi-phone text-white text-xl"></i>
              </div>
            </div>
            <div className="flex align-items-center justify-content-center text-white text-sm white-space-nowrap">
              Blind transfer
            </div>
          </div>
        </div>

        <div className="col-12 md:col-6 lg:col-2">
          <div className="bg-purple-500 hover:bg-purple-200 p-2 border-1 border-50 border-round">
            <div className="flex align-items-center justify-content-center">
              <div
                className="flex align-items-center justify-content-center border-round"
                style={{ height: '2.5rem' }}>
                <i className="pi pi-user-plus text-white text-xl"></i>
              </div>
            </div>
            <div className="flex align-items-center justify-content-center text-white text-sm white-space-nowrap">
              Consult transfer
            </div>
          </div>
        </div>

        <div className="col-12 md:col-6 lg:col-2">
          <div className="bg-green-700 hover:bg-green-200 p-2 border-1 border-50 border-round">
            <div className="flex align-items-center justify-content-center">
              <div
                className="flex align-items-center justify-content-center border-round"
                style={{ height: '2.5rem' }}>
                <i className="pi pi-users text-white text-xl"></i>
              </div>
            </div>
            <div className="flex align-items-center justify-content-center text-white text-sm">
              Conference
            </div>
          </div>
        </div>

        <div className="col-12 md:col-6 lg:col-2">
          <div className="bg-red-300 hover:bg-red-200 p-2 border-1 border-50 border-round">
            <div className="flex align-items-center justify-content-center">
              <div
                className="flex align-items-center justify-content-center border-round"
                style={{ height: '2.5rem' }}>
                <i className="pi pi-phone text-white text-xl"></i>
              </div>
            </div>
            <div className="flex align-items-center justify-content-center text-white text-sm">
              Hangup
            </div>
          </div>
        </div>
      </div>
      <div className="grid">
        <div className="col-12 md:col-6">
          <div className="surface-0 p-1 shadow-2 border-round">
            <div className="grid">
              <div className="col-12 md:col-2 flex align-items-center justify-content-center p-0">
                <Avatar label="P" size="large" shape="circle" />
              </div>

              <div className="col-12 md:col-3">
                <div className="text-xs mt-1 mb-1">User name</div>
                <div className="text-xs mb-2 ">+93 9077877787</div>
                <div className="flex gap-1 text-sm communication">
                  <Avatar
                    icon="pi pi-whatsapp"
                    style={{
                      backgroundColor: 'var(--green-800)',
                      color: '#ffffff'
                    }}
                    shape="circle"
                  />
                  <Avatar
                    icon="pi pi-phone"
                    style={{
                      backgroundColor: 'var(--blue-800)',
                      color: '#ffffff'
                    }}
                    shape="circle"
                  />
                  <Avatar
                    icon="pi pi-envelope"
                    style={{
                      backgroundColor: 'var(--blue-800)',
                      color: '#ffffff'
                    }}
                    shape="circle"
                  />
                  <Avatar
                    icon="pi pi-at"
                    style={{
                      backgroundColor: 'var(--blue-800)',
                      color: '#ffffff'
                    }}
                    shape="circle"
                  />
                </div>
              </div>

              <div className="col-12 md:col-2 flex">
                <div className="flex align-items-center justify-content-center text-center flex-column">
                  <div className="text-xs text-primary">00:00</div>
                  <div className="text-xs">Call duration</div>
                </div>
              </div>

              <div className="col-12 md:col-2 flex">
                <div className="flex align-items-center justify-content-center text-center flex-column">
                  <div className="text-xs text-primary">00:00</div>
                  <div className="text-xs">Call hold duration</div>
                </div>
              </div>

              <div className="col-12 md:col-3 flex">
                <div className="flex align-items-center justify-content-center text-center flex-column">
                  <div className="text-xs text-primary">00:00</div>
                  <div className="text-xs">Total hold duration</div>
                </div>
              </div>
            </div>
          </div>
          <CustomerDetail />
        </div>
        <div className="col-12 md:col-6">
          <div className="surface-0 p-3 shadow-2 border-round">
            <div className="text-3xl font-medium text-900 mb-3">Card Title</div>
            <div className="font-medium text-500 mb-3">
              Vivamus id nisl interdum, blandit augue sit amet, eleifend mi.
            </div>
            <div className="border-2 border-dashed border-300" style={{ height: '150px' }}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MiddleBlock;
