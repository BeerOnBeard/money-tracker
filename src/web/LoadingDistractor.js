import React from 'react';

function LoadingDistractor({ isActive }) {
  return (
    <div className={'loadingDistractor' + (isActive ? ' loadingDistractor--active' : '' )}>
      <span>Loading...</span>
    </div>
  );
}

export default LoadingDistractor;
