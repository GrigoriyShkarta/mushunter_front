import { ToastPosition } from 'react-toastify';

export enum Statuses {
	LOADING,
	LOADED,
	ERROR,
}

export enum Languages {
	EN = 'en',
	UK = 'ua',
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
	NAME = 'name',
	FIRST_NAME = 'firstname',
	LAST_NAME = 'lastname',
	CONFIRM_PASSWORD = 'confirmPassword',
	CITY = 'city',
	PHONE = 'phone',
	EDUCATION = 'education',
	LINKS = 'links',
	STYLES = 'styles',
	BIRTHDAY = 'birthday',
	SKILLS = 'skills',
	EXPERIENCE = 'experience',
	DESCRIPTION = 'description',
	ID = 'id',
	SEARCH_BAND = 'isLookingForBand',
	IN_SEARCH = 'lookingForSkills',
	AVATAR = 'avatar',
	ROLE = 'role',
	CREATION_DATE = 'created_date',
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

export enum UserModal {
	MainSettings,
	SkillSettings,
	DescriptionSettings,
	ChangeAva,
	CreateBand,
}

export enum PageBlock {
	DescriptionBlock,
	SkillBlock,
}
