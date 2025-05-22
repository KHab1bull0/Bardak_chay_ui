import { useEffect, useState } from "react";

export const BlurredImage = ({ src, alt, ...props }) => {
      const [isLoading, setIsLoading] = useState(true);

      useEffect(() => {
            const img = new Image();
            img.src = src;
            img.onload = () => setIsLoading(false);
      }, [src]);

      return (
            <div className="relative">
                  <img
                        src={src}
                        alt={alt}
                        style={{
                              zIndex: 1,
                              filter: isLoading ? 'blur(10px)' : 'none',
                              transition: 'filter 0.5s ease-in-out',
                        }}
                        {...props}
                  />
                  {isLoading && (
                        <div
                              className="absolute inset-0 bg-gray-200" // Placeholder
                              style={{ filter: 'blur(10px)' }}
                        />
                  )}
            </div>
      );
};
