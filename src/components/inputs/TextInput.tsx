import { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import s from './Inputs.module.scss';

interface ITextInputProps {
	register: UseFormRegisterReturn;
	className: string;
	name: string;
	error?: string;
}

const TextInput: FC<ITextInputProps> = ({ register, className, name, error }) => {
	return (
		<div className={s.wrapper}>
			<label className={`${s.label} ${error && s.error}`}>{name}</label>
			<div className={`${s.container} ${error && s.error}`}>
				<input
					{...register}
					className={className}
					type="text"
					aria-invalid={error ? true : false}
				/>
			</div>
		</div>
	);
};

export default TextInput;
