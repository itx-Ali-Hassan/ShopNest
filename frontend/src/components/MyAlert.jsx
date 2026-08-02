import { useEffect } from "react";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyAlert = ({ type = "info", text = "" }) => {
    useEffect(() => {
        toast[type](text, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
    }, [type, text]);

    return null;
};

export default MyAlert;