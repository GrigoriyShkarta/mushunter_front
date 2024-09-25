import { Option } from '../models';
import i18n from 'i18next';

export const formatToOption = (
	array?: { id: number; name: string | { ua: string; en: string } }[],
): Option[] | undefined => {
	return array?.map((item) => {
		if (typeof item.name === 'string') {
			return {
				value: item.id,
				label: item.name,
			};
		} else {
			return {
				value: item.id,
				label: item.name[i18n.language as 'ua' | 'en'] || item.name.en,
			};
		}
	});
};
