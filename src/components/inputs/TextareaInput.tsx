import { FC } from 'react';
import s from './Inputs.module.scss';
import { capitalizeFirstLetter } from '../../shared/helpers/capitalizeFirstLetter.ts';
import { useTranslation } from 'react-i18next';
import { UseFormRegisterReturn } from 'react-hook-form';
import { Field } from '../../shared/constants';

interface Props {
	register: UseFormRegisterReturn;
	name: Field | string;
	value?: string;
	label?: string;
	placeholder?: string;
}

const TextareaInput: FC<Props> = ({ register, name, value, label, placeholder }) => {
	const { t } = useTranslation();

	return (
		<div className={s.wrapper}>
			<label className={s.label}>{capitalizeFirstLetter(t(`general.${label || name}`))}</label>
			<div className={s.container}>
				<textarea
					{...register}
					className={s.textarea}
					rows={10}
					value={value}
					placeholder={capitalizeFirstLetter(t('input.enterValue', { value: t(`general.${placeholder || name}`) }))}
				/>
			</div>
		</div>
	);
};

export default TextareaInput;
