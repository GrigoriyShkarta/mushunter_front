import { toast } from 'react-toastify';

const useToast = () => {
	const notifySuccess = (message: string): void => {
		toast.success(message);
	};

	const notifyError = (message: string): void => {
		toast.error(message);
	};

	const notifyInfo = (message: string): void => {
		toast.info(message);
	};

	return { notifySuccess, notifyError, notifyInfo };
};

export default useToast;
