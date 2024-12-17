import {toast, Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class ToastUtils {
    public info(message: string,id?:string|null): void {
        toast.info(message, {
            toastId: `${id}`,
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    }
    public success(message: string,id?:string|null): void {
        toast.success(message, {
            toastId: `${id}`,
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    }
    public warning(message: string,id?:string|null): void {
        toast.warn(message, {
            toastId: `${id}`,
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    }
    public error(message: string,id?:string|null): void {
        toast.error(message, {
            toastId: `${id}`,
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    }
}
export const toastUtils = new ToastUtils();