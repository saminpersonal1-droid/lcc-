import { motion } from 'motion/react';
import React from 'react';

export const Background = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-white overflow-hidden">
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-brand-red/5"
            initial={{ 
              y: '120vh', 
              x: `${Math.random() * 100}vw`,
              scale: 0.5 + Math.random() 
            }}
            animate={{ 
              y: '-20vh',
              rotate: 360
            }}
            transition={{
              duration: 15 + Math.random() * 15,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10
            }}
            style={{
              width: 50 + Math.random() * 150,
              height: 50 + Math.random() * 150,
            }}
          />
        ))}
      </div>
    </div>
  );
};
