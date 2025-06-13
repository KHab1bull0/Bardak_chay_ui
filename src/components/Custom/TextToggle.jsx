import React, { useState } from "react";

export const TextToggle = ({ text, maxLength = 100 }) => {
   const [isExpanded, setIsExpanded] = useState(false);

   // Qisqartirilgan yoki to'liq matnni aniqlash
   const displayedText = isExpanded ? text : text.slice(0, maxLength) + (text.length > maxLength ? "..." : "");

   return (
      <div>
         <p className="text-lg">
            {displayedText}
            {text.length > maxLength && (
               <span
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="lightgreen underline ml-2"
               >
                  {isExpanded ? "Kamroq" : "Ko'proq"}
               </span>
            )}
         </p>

      </div>
   );
};

