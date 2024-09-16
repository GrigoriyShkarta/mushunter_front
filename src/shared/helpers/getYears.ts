import { Languages } from '../constants';

export function getAgeWord(birthDateString: string | number, lang: Languages): string {
	let age;
	if (typeof birthDateString === 'string') {
		const birthDate = new Date(birthDateString);
		const today = new Date();

		age = today.getFullYear() - birthDate.getFullYear();
		const monthDifference = today.getMonth() - birthDate.getMonth();
		const dayDifference = today.getDate() - birthDate.getDate();

		if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
			age--;
		}
	} else {
		age = birthDateString;
	}

	if (lang === Languages.EN) {
		return `${age} years`;
	}

	if (age % 100 >= 11 && age % 100 <= 14) {
		return `${age} років`;
	}

	switch (age % 10) {
		case 1:
			return `${age} рік`;
		case 2:
		case 3:
		case 4:
			return `${age} роки`;
		default:
			return `${age} років`;
	}
}
