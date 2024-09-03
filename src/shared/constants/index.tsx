import { ToastPosition } from 'react-toastify';

export enum Statuses {
	LOADING,
	LOADED,
	ERROR,
}

export enum Languages {
	EN = 'en',
	UK = 'uk',
}

export enum AuthForms {
	SignIn,
	Registration,
	ForgotPassword,
	ConfirmRegistration,
}

export enum ForgotPasswordStage {
	EMAIL,
	CHECK_CODE,
	NEW_PASSWORD,
}

export enum Field {
	EMAIL = 'email',
	PASSWORD = 'password',
	NAME = 'firstname',
	LAST_NAME = 'lastname',
	CONFIRM_PASSWORD = 'confirmPassword',
	CODE = 'code',
	NEW_PASSWORD = 'newPassword',
	CHECK_PASSWORD = 'checkPassword',
}

export const toastConfig = {
	position: 'top-right' as ToastPosition,
	autoClose: 5000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
};
