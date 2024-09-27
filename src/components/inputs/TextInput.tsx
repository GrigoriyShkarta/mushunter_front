import { FC, ReactNode } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import cn from 'classnames';
import s from './Inputs.module.scss';
import { capitalizeFirstLetter } from '../../shared/helpers/capitalizeFirstLetter.ts';
import { useTranslation } from 'react-i18next';
import { Field } from '../../shared/constants';

type InputType = 'text' | 'number';

interface ITextInputProps {
	register: UseFormRegisterReturn;
	className?: string;
	name: Field | string;
	error?: string;
	icon?: ReactNode;
	value?: string;
	type?: InputType;
}

const TextInput: FC<ITextInputProps> = ({ register, className, name, error, icon, value, type = 'text' }) => {
	const { t } = useTranslation();
	const inputClassname = cn({
		[s.input]: true,
		className: className,
		[s.padding]: icon,
	});

	return (
		<div className={s.wrapper}>
			<label className={`${s.label} ${error && s.error}`}>{capitalizeFirstLetter(t(`general.${name}`))}</label>
			<div className={`${s.container} ${error && s.error}`}>
				{icon && <div className={s.customIcon}>{icon}</div>}
				<input
					{...register}
					value={value}
					className={inputClassname}
					type={type}
					aria-invalid={!!error}
					placeholder={capitalizeFirstLetter(t('input.enterValue', { value: t(`general.${name}`) }))}
				/>
			</div>
			{error && <span className={s.errorText}>{t(`${error}`)}</span>}
		</div>
	);
};

export default TextInput;
