import { Slide, toast } from "react-toastify";

export const SuccesNotify = (message) => {
	toast.success(message, {
		position: "bottom-center",
		autoClose: 3000,
		hideProgressBar: false,
		closeOnClick: false,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "dark",
		transition: Slide,
	});
};
