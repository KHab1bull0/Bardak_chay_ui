import React, { useState, useContext, useEffect } from "react";
import "../../App.css";
import { Context } from "../Context";
import { ArrowBack, ArrowLeftOutlined, ArrowLeftSharp, CancelOutlined, Clear, DeleteOutline, KeyboardBackspace, KeyboardBackspaceSharp, TramSharp } from "@mui/icons-material";


export const OrderModal = ({ form, title, open, onCancel, className, children, footer, rootClassname, headerClassName }) => {
   const [showClass, setShowClass] = useState(false);
   const { theme, setOrders } = useContext(Context);

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
         className={`fixed inset-0  ${rootClassname} bg-black bg-opacity-50 overflow-y-auto scrollbar-hide`}
         style={{ zIndex: 1000 }}
      >
         <div
            className={`relative ${className}`}
            onClick={(e) => {
               e.stopPropagation();
            }}
         >
            <div className={headerClassName}>
               <button
                  onClick={onCancel}
                  className={`flex justify-center items-center text-3xl p-1 transition-transform`}
               >
                  <ArrowBack fontSize="medium" className={`${theme ? "text-white" : "text-black"} text-2xl`} />
               </button>
               <p
                  className={`${theme ? "text-white" : "text-black"} text-lg font-semibold pb-2`}
               >
                  {title}
               </p>
               <button
                  onClick={() => {
                     setOrders([])
                     form.resetFields()
                  }}
                  className={`flex justify-center items-center text-3xl transition-transform`}
               >
                  <DeleteOutline fontSize="medium" className={`${theme ? "text-white" : "text-black"} text-2xl`} />
               </button>
            </div>
            <div>{children}</div>
            <div>{footer}</div>
         </div>
      </div>
   );
};