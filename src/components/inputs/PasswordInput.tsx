import { FC, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import s from './Inputs.module.scss';
import cn from 'classnames';
import { capitalizeFirstLetter } from '../../shared/helpers/capitalizeFirstLetter.ts';
import { useTranslation } from 'react-i18next';
import { Field } from '../../shared/constants';

interface ITextInputProps {
	register: UseFormRegisterReturn;
	className?: string;
	name: Field;
	error?: string;
	placeholder?: string;
}

const PasswordInput: FC<ITextInputProps> = ({ register, className, name, error, placeholder }) => {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const { t } = useTranslation();

	const inputClassname = cn({
		[s.input]: true,
		className: className,
	});

	return (
		<div className={s.wrapper}>
			<label className={`${s.label} ${error && s.error}`}>{capitalizeFirstLetter(t(`general.${name}`))}</label>
			<div className={`${s.container} ${error && s.error}`}>
				<div className={s.inputWithIcon}>
					<input
						{...register}
						className={inputClassname}
						type={!showPassword ? 'password' : 'text'}
						placeholder={placeholder || capitalizeFirstLetter(t('input.enterValue', { value: t(`general.${name}`) }))}
					/>
					{showPassword && <AiOutlineEye className={s.icon} onClick={(): void => setShowPassword(false)} />}
					{!showPassword && <AiOutlineEyeInvisible className={s.icon} onClick={(): void => setShowPassword(true)} />}
				</div>
			</div>
			{error && <span className={s.errorText}>{t(`${error}`)}</span>}
		</div>
	);
};

export default PasswordInput;
