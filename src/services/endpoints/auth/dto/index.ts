export interface LoginDto {
	email: string;
	password: string;
}

export interface RegisterDto {
	firstname: string;
	lastname: string;
	email: string;
	password: string;
}

export interface FinishRegisterDto {
	firstname: string;
	lastname: string;
	email: string;
	password: string;
	tempToken:string;
	tempPassword: string;
}

export interface CheckTempPasswordDto {
	email: string;
	tempPassword: string;
	tempToken: string;
}

export interface ChangePasswordDto {
	tempToken: string;
	newPassword: string;
}