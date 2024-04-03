import { Dispatch, FC, SetStateAction } from 'react';

type ButtonType = 'button' | 'submit' | 'reset';

interface ISubmitButtonProps {
	type: ButtonType;
	value: string | JSX.Element;
	className: string;
	func?: Dispatch<SetStateAction<any>>;
	disabled?: boolean;
}

const Button: FC<ISubmitButtonProps> = ({ type, value, className, func, disabled }) => {
	return (
		<button type={type} className={className} disabled={disabled} onClick={func}>
			{value}
		</button>
	);
};

export default Button;
