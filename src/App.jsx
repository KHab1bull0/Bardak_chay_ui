import { useContext, useState } from "react";
import "./App.css";
import { Context } from "./components/Context";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function App() {
    const { theme } = useContext(Context);
    const [location, setLocation] = useState({ latitude: null, longitude: null });
    console.log(location);

    const getLoc = () => {
        if (location.latitude) {
            toast.success('Ok')
            console.log(location)
        } else {
            navigator.geolocation.getCurrentPosition((location) => {
                console.log(location.coords)
                setLocation(location.coords)
            });
        }
    };

    return (
        <div className={` p-4`}>
            <Toaster />
            <div className="flex justify-center items-center gap-4 mt-[10px]">
                <button onClick={getLoc} className="bg-red-400 rounded-xl p-2">
                    Get Location
                </button>
                <p>{location.latitude}</p>
            </div>
        </div>
    );
}

export default App;
