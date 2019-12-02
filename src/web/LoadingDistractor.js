import React from 'react';

function LoadingDistractor({ isActive }) {
  return (
    <div className={'loading-distractor' + (isActive ? ' loading-distractor--active' : '' )}>
      <span>Loading...</span>
    </div>
  );
}

export default LoadingDistractor;
