// ClickableComponent.js
import React, { useState } from 'react';

const ClickableComponent = ({ onClick }: { onClick: () => void }) => {
  return (
    <div>
      <button onClick={onClick}>rn</button>
    </div>
  );
};

export default ClickableComponent;
