import { Languages } from '../constants';

export function getAgeWord(birthDateString: string | Date | number, lang: Languages): string {
	let age: number;

	// Проверка, является ли birthDateString строкой, датой или числом
	if (typeof birthDateString === 'string' || birthDateString instanceof Date) {
		const birthDate = new Date(birthDateString);
		const today = new Date();

		age = today.getFullYear() - birthDate.getFullYear();
		const monthDifference = today.getMonth() - birthDate.getMonth();
		const dayDifference = today.getDate() - birthDate.getDate();

		// Корректировка возраста, если день рождения еще не наступил в этом году
		if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
			age--;
		}
	} else {
		age = birthDateString;
	}

	// Логика для возврата результата в зависимости от языка
	if (lang === Languages.EN) {
		if (age === 0) {
			return 'less than a year';
		}
		return `${age} years`;
	}

	// Украинский язык, определение окончания в зависимости от возраста
	if (age % 100 >= 11 && age % 100 <= 14) {
		return `${age} років`;
	}

	switch (age % 10) {
		case 0:
			return 'меньше року';
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
