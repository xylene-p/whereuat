import React, { useEffect, useRef } from 'react';
import './Hyperspace.css';

const Hyperspace: React.FC = () => {
  const hyperspaceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hyperspaceContainer = hyperspaceRef.current;

    if (!hyperspaceContainer) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = hyperspaceContainer.getBoundingClientRect();
      const x = ((clientX - left) / width) * 100;
      const y = ((clientY - top) / height) * 100;

      hyperspaceContainer.style.setProperty('--x', `${x}%`);
      hyperspaceContainer.style.setProperty('--y', `${y}%`);
    };

    hyperspaceContainer.addEventListener('mousemove', handleMouseMove);

    return () => {
      hyperspaceContainer.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="hyperspace" ref={hyperspaceRef}>
      <div className="stars" />
    </div>
  );
};

export default Hyperspace;
