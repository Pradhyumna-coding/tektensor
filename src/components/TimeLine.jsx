import React, { useState ,useRef, useEffect} from "react";
import { motion,useScroll, useTransform } from "framer-motion";
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

export default function TimeLineSingle({children, header}) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 20%", "end 20%"],
    });

    const [color, setColor] = useState("url(#circlelinearGradient)");

    useEffect(() => {
    if (scrollYProgress > 0.01) {
        setColor("url(#circlelinearGradient)");
    } else {
        setColor("grey");
    }
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
                        style={{fill:"url(#circlelinearGradient)"}} />
                    <motion.path 
                        d="M 1.5,5 L 1.5,100"
                        fill="none"
                        stroke="#6f00ff"
                        strokeWidth="0.3"
                        style={{pathLength: scrollYProgress}}
                    />
                </svg>

                <p className="section-subheading">{header}</p>
            </div>

            <div>
                {children}
            </div>
        </div>
    )
};