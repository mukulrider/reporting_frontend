import React from 'react';

function Panel({ children }) {
  return (
    <div className="ui-component__panel">
      {children}
    </div>
  );
}

export default Panel;
