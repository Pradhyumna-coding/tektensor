import React, { useEffect, useState, useRef } from 'react';
import './GradientBorder.css'; // Assuming you have this CSS file

const MouseToCenterTheta = ({ mouseX, mouseY, containerWidth, containerHeight }) => {
  const normalizedX = mouseX - (containerWidth / 2);
  const normalizedY = (mouseY - (containerHeight / 2)) * -1;

  if (normalizedX >= 0 && normalizedY >= 0) {
    return Math.atan(normalizedY / normalizedX);
  } else if (normalizedX >= 0 && normalizedY <= 0) {
    return (2 * Math.PI) + Math.atan(normalizedY / normalizedX);
  } else if (normalizedX <= 0 && normalizedY <= 0) {
    return Math.atan(normalizedY / normalizedX) + Math.PI;
  } else {
    return Math.PI + Math.atan(normalizedY / normalizedX);
  }
};

const GradientBorderDiv = ({ children, radius, colors = ['#6f00ff', '#ff00d4', 'black'], percentages = [2, 3, 6], style, className }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0, left: 0, top: 0 }); // Store left and top

  useEffect(() => {
    const updateMousePosition = (ev) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        // Calculate relative position *always*
        setMousePosition({
          x: ev.clientX - rect.left,
          y: ev.clientY - rect.top,
        });
      }
    };

    const updateContainerDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerDimensions({ width: rect.width, height: rect.height, left: rect.left, top: rect.top }); // Store left and top
      }
    };

    // Listen for mousemove on the window
    window.addEventListener('mousemove', updateMousePosition);
    updateContainerDimensions(); // Get initial dimensions
    window.addEventListener('resize', updateContainerDimensions);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('resize', updateContainerDimensions);
    };
  }, []);


  const theta = MouseToCenterTheta({
    mouseX: mousePosition.x,
    mouseY: mousePosition.y,
    containerWidth: containerDimensions.width,
    containerHeight: containerDimensions.height,
  });
  // Build the linear-gradient string dynamically
  let gradientString = `linear-gradient(${(theta + Math.PI / 2) * -1}rad, `;
  for (let i = 0; i < colors.length; i++) {
    gradientString += `${colors[i]} ${percentages[i]}%`;
    if (i < colors.length - 1) {
      gradientString += ', ';
    }
  }
  gradientString += ')';

  return (
    <div
      ref={containerRef}
      style={{
        backgroundImage: gradientString,
        borderRadius: `${radius}px`,
        padding: '2px', // Padding for the border itself
        ...style
      }}
      className={`border-div ${className || ''}`}
    >
      <div className="full-div" style={{ borderRadius: `${radius}px`, backgroundColor: 'black', padding: `${radius}px` }}>
        {children}
      </div>
    </div>
  );
};

export default GradientBorderDiv; 