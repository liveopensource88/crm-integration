import React from 'react';
import LeftBlock from './LeftBlock';
import MiddleBlock from './MiddleBlock';
const Dashboard: React.FC = () => {
  return (
    <>
      <div className="grid">
        <div className="col-12 md:col-4">
          <LeftBlock />
        </div>
        <div className="col-12 md:col-8">
          <MiddleBlock />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
