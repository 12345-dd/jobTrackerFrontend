import { toast, Bounce } from "react-toastify"

const options = {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
}

export const showSuccess = (message) => {
    toast.success(message,options)
}

export const showError = (message) => {
    toast.error(message,options)
}