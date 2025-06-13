import { useContext, useEffect, useState } from "react"
import { Context } from "../Context"
import { ArrowBack, Clear } from "@mui/icons-material";


export const UserOrderModal = ({ form, title, open, onCancel, className, children, footer, rootClassname, headerClassName }) => {
   const { theme } = useContext(Context)
   const [showClass, setShowClass] = useState(false);


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
            {/* <button
                              onClick={onCancel}
                              className={`absolute top-3 left-4 h-[2rem] w-[2rem] flex justify-center items-center text-3xl p-1 rounded-full shadow-[0_0px_10px_rgba(0,0,0,0.45)]`}
                        >
                              <ArrowBack fontSize="medium" className={`${theme ? "text-white" : "text-black"} text-2xl`} />
                        </button> */}
            <button
               onClick={onCancel}
               className={`bg-beji absolute top-4 right-4 h-[2rem] w-[2rem] flex justify-center items-center text-3xl p-1 rounded-full shadow-[0_0px_10px_rgba(0,0,0,0.45)]`}
            >
               <Clear fontSize="medium" className={`${theme ? "text-white" : "text-black"} text-2xl`} />
            </button>
            {children}
            {footer}
         </div>
      </div >
   )
}