import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
	exp: number;
}

export const isTokenExpired = (token: string): boolean => {
	try {
		const decoded = jwtDecode<TokenPayload>(token);
		const currentTime = Date.now() / 1000;

		console.log('Token expiration time:', decoded.exp);
		console.log('Current time:', currentTime);
		console.log('Time until expiration (seconds):', decoded.exp - currentTime);

		return decoded.exp < currentTime;
	} catch (error) {
		return true;
	}
};
