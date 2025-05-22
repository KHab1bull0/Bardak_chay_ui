import React, { useState, useContext, useEffect } from "react";
import "../../App.css";
import { Context } from "../Context";
import { CancelOutlined } from "@mui/icons-material";


const CustomModal = ({ title, open, onCancel, className, children, footer }) => {
      const [showClass, setShowClass] = useState(false);
      const { theme } = useContext(Context);

      useEffect(() => {
            if (open) {
                  setShowClass(true);
            } else {
                  setTimeout(() => setShowClass(false), 200); // Animatsiyani tugashini kutish
            }
      }, [open]);

      if (!open && !showClass) return null;

      if (open) {
            document.body.style.overflow = "hidden";
      } else {
            document.body.style.overflow = "auto";
      }

      return (
            <div
                  onClick={onCancel}
                  className="fixed inset-0  flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto py-10 scrollbar-hide"
                  style={{zIndex: 1000}}
            >
                  <div
                        className={`relative ${className}`}
                        onClick={(e) => {
                              e.stopPropagation();
                        }}
                  >
                        <p
                              className={`${theme ? "text-white" : "text-black"} text-lg font-semibold pb-2`}
                        >
                              {title}
                        </p>
                        <button
                              onClick={onCancel}
                              className={`absolute top-3 flex justify-center items-center right-3 text-3xl transition-transform`}
                        >
                              <CancelOutlined fontSize="large" className={`${theme ? "text-white" : "text-black"} text-2xl`} />
                        </button>

                        {/* Content */}
                        <div>{children}</div>
                        <div>{footer}</div>
                  </div>
            </div>
      );
};

export default CustomModal;
