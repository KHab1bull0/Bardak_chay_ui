import { createContext, useEffect, useState } from "react";
const Context = createContext()

const ContextProvider = ({ children }) => {
      // Initial theme value based on localStorage or default to false
      const [theme, setTheme] = useState(() => {
            const savedMode = localStorage.getItem("darkmode");
            return savedMode === "true"; // Convert string to boolean
      });
      const [orders, setOrders] = useState([]);
      const [chatIdState, setChatId] = useState()
      const [isFirst, setIsFirst] = useState(true)

      // Update localStorage whenever theme changes
      useEffect(() => {
            localStorage.setItem("darkmode", theme);
      }, [theme]);

      return <Context.Provider value={{ theme, setTheme, orders, setOrders, chatIdState, setChatId, isFirst, setIsFirst }}>{children}</Context.Provider>
}
export { Context, ContextProvider }