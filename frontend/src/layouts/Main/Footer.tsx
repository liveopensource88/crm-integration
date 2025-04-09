import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="layout-footer">
      <span className="font-medium ml-2">&copy; {currentYear} Allianz Partners</span>
    </div>
  );
};

export default Footer;
