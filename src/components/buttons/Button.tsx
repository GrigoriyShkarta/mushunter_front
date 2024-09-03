import { FC } from 'react';
import Loader from '../loader';

type ButtonType = 'button' | 'submit' | 'reset';

interface ISubmitButtonProps {
	type: ButtonType;
	value: string | JSX.Element;
	className: string;
	func?: () => void;
	disabled?: boolean;
	loading?: boolean;
}

const Button: FC<ISubmitButtonProps> = ({ type, value, className, func, disabled, loading }) => (
	<button type={type} className={className} disabled={disabled} onClick={func}>
		{loading ? <Loader /> : value}
	</button>
);

export default Button;
