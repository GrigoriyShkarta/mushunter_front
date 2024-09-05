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

export enum EThemes {
	DARK = 'dark',
	LIGHT = 'light',
}

export enum AuthForms {
	SignIn,
	Registration,
	ForgotPassword,
	ConfirmRegistration,
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

export const MEDIA_BREAKPOINT = {
	1920: '(max-width:1920px)',
	1440: '(max-width:1440px)',
	1280: '(max-width:1280px)',
	1024: '(max-width:1024px)',
	768: '(max-width:768px)',
	480: '(max-width:480px)',
	320: '(max-width:320px)',
};
