import React, { useMemo, useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";


export const Statistika = ({ orders = [] }) => {
  // Statistikani hisoblash
  const orderStats = useMemo(() => {
    const total = orders.length;
    const pending = orders.filter(o => o.status === "pending").length;
    const process = orders.filter(o => o.status === "process").length;
    const ready = orders.filter(o => o.status === "ready").length;
    const rejected = orders.filter(o => o.status === "rejected").length;

    return { total, pending, process, ready, rejected };
  }, [orders]);

  // Harakatlanuvchi matn holati
  const [position, setPosition] = useState({ top: 50, left: 50 });
  const [velocity, setVelocity] = useState({ x: 3, y: 2 });

  useEffect(() => {
    const moveText = () => {
      setPosition(prev => {
        let newTop = prev.top + velocity.y;
        let newLeft = prev.left + velocity.x;
        const windowWidth = window.innerWidth - 200;
        const windowHeight = window.innerHeight - 50;

        if (newLeft <= 0 || newLeft >= windowWidth) {
          setVelocity(prev => ({ ...prev, x: -prev.x }));
        }
        if (newTop <= 0 || newTop >= windowHeight) {
          setVelocity(prev => ({ ...prev, y: -prev.y }));
        }

        return { top: newTop, left: newLeft };
      });
    };

    const interval = setInterval(moveText, 20);
    return () => clearInterval(interval);
  }, [velocity]);

 return (
  <div className="relative">
    {/* Harakatlanayotgan matn */}
    <div
      className="fixed text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-600 drop-shadow-lg select-none z-50"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        pointerEvents: "none", // matnga bosilganda boshqa hodisalarga xalaqit bermasin
      }}
    >
     🚧 Jarayonda!	
    </div>
    
<DotLottieReact
          src="https://lottie.host/69d9795b-b0b1-44ba-8aa6-62176f423392/oA2He8GjPC.lottie"
          loop
          autoplay
          style={{ width: '100%', height: '400px' }} 
        />
  </div>
);
} 