import { jwtDecode } from 'jwt-decode';

export const isTokenExpired = (token: string): boolean => {
	try {
		const decoded: { exp: number } = jwtDecode(token);
		const currentTime = Date.now() / 1000;
		console.log('decoded', decoded);
		return decoded.exp < currentTime;
	} catch (error) {
		return true;
	}
};
