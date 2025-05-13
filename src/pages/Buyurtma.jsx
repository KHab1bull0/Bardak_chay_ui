import { useContext } from "react"
import { Context } from "../components/Context"


export const Buyurtma = () => {
      const { theme } = useContext(Context)

      return (
            <div className={`${theme ? "bg-gray-800 text-white" : "bg-white text-black"} p-4 rounded-xl`}>
                  <div className="flex justify-start items-center gap-4 mt-[10px]">
                        <h1 className="text-2xl font-bold">Buyurtma</h1>
                  </div>
                  <div className="mt-4">

                  </div>
            </div>
      )
}