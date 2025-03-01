import { motion, useTransform, useScroll } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import './HorizontalScroll.css';

const HorizontalScroll = ({ children ,header}) => {
  const ref = useRef(null);
  const containerRef = useRef(null); // Ref for the inner container
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"], // Crucial change:  Use offset
  });
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.scrollWidth - containerRef.current.offsetWidth);
    }
  }, [containerRef]);


  const x = useTransform(scrollYProgress, [0, 1], [0, -(containerWidth+window.innerWidth/4)]); // Change the screen width to the width of the container

  return (
    <div ref={ref} className="horizontal-scroll-section">
      <div className="horizontal-scroll-view">
        <p className='section-heading'>{header}</p>
        
        <motion.div className="horizontal-scroll-container" style={{ x }} ref={containerRef}>
          {children}
        </motion.div>
      </div>
    </div>
  )

}

export default HorizontalScroll;
