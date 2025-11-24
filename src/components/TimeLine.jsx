import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import './TimeLine.css';


/**
 * <svg className="time-circle" viewBox="0 0 10 100">
                        <linearGradient id="circlelinearGradient" gradientTransform="rotate(90)">
                            <stop offset="30%" stopColor="#6f00ff" />
                            <stop offset="75%" stopColor="#ff00d4" />
                        </linearGradient>
                        <circle cx="5" cy="5" r="5" 
                            fill={scrollYProgress ? "url(#circlelinearGradient)" : "grey"} />
                        <motion.path 
                            d="M 5,20 L 5,100"
                            fill="none"
                            stroke="#6f00ff"
                            strokeWidth="2"
                            style={{pathLength: scrollYProgress}}
                        />
                    </svg>
 */

export default function TimeLineSingle({ children, header }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 70%", "end 30%"],
    });

    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            if (latest > 0) {
                setIsActive(true);
            } else {
                setIsActive(false);
            }
        });
        return () => unsubscribe();
    }, [scrollYProgress]);


    return (
        <div className="timeline-container" ref={ref}>
            <div className="sticky-div">
                <svg className="time-circle" viewBox="0 0 3 100">
                    <linearGradient id="circlelinearGradient" gradientTransform="rotate(90)">
                        <stop offset="30%" stopColor="#6f00ff" />
                        <stop offset="75%" stopColor="#ff00d4" />
                    </linearGradient>
                    <motion.circle cx="1.5" cy="2.5" r="1.5"
                        fill={isActive ? "url(#circlelinearGradient)" : "grey"}
                        animate={{ scale: isActive ? 1.5 : 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className={isActive ? "neon-glow" : ""}
                    />
                    <motion.path
                        d="M 1.5,5 L 1.5,100"
                        fill="none"
                        stroke="#6f00ff"
                        strokeWidth="0.3"
                        style={{ pathLength: scrollYProgress }}
                        className="neon-glow"
                    />
                </svg>

                <p className="section-subheading">{header}</p>
            </div>

            <div className="glass-card">
                {children}
            </div>
        </div>
    )
};