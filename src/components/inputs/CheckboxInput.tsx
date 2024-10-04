import { ChangeEvent, FC } from 'react';
import s from './Inputs.module.scss';
import { capitalizeFirstLetter } from '../../shared/helpers/capitalizeFirstLetter.ts';
import { Field } from '../../shared/constants';
import { useTranslation } from 'react-i18next';
import { UseFormRegisterReturn } from 'react-hook-form';

interface Props {
	name: Field;
	register: UseFormRegisterReturn;
	checked: boolean;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxInput: FC<Props> = ({ name, register, checked }) => {
	const { t } = useTranslation();

	return (
		<div className={s.checkBoxWrapper}>
			<input
				{...register}
				onChange={(e) => register.onChange(e)}
				type="checkbox"
				name={name}
				id={name}
				className={s.checkbox}
				checked={checked}
			/>
			<label className={s.label}>{capitalizeFirstLetter(t(`general.${name}`))}</label>
		</div>
	);
};

export default CheckboxInput;
