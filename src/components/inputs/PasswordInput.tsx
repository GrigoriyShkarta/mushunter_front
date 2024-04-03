import { FC, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import s from './Inputs.module.scss';

interface ITextInputProps {
	register: UseFormRegisterReturn;
	className: string;
	name: string;
	error?: string;
}

const PasswordInput: FC<ITextInputProps> = ({ register, className, name, error }) => {
	const [showPassword, setShowPassword] = useState<boolean>(false);

	return (
		<div className={s.wrapper}>
			<label className={`${s.label} ${error && s.error}`}>{name}</label>
			<div className={`${s.container} ${error && s.error}`}>
				<div className={s.inputWithIcon}>
					<input {...register} className={className} type={!showPassword ? 'password' : 'text'} />
					{showPassword && (
						<AiOutlineEye
							className={s.icon}
							onClick={(): void => setShowPassword(false)}
							size={'1.7rem'}
							color="black"
						/>
					)}
					{!showPassword && (
						<AiOutlineEyeInvisible
							className={s.icon}
							size={'1.7rem'}
							color="black"
							onClick={(): void => setShowPassword(true)}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default PasswordInput;
