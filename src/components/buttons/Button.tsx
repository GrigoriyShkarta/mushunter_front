import { FC, JSX } from 'react';
import { useTranslation } from 'react-i18next';
import Loader from '../loader';

interface ISubmitButtonProps {
	type: 'button' | 'submit' | 'reset';
	value: string;
	icon?: JSX.Element;
	className: string;
	func?: () => void;
	disabled?: boolean;
	loading?: boolean;
}

const Button: FC<ISubmitButtonProps> = ({ type, value, className, func, disabled, loading, icon }) => {
	const { t } = useTranslation();

	return (
		<button type={type} className={className} disabled={disabled} onClick={func}>
			{loading ? (
				<Loader />
			) : (
				<>
					{icon} {t(value)}
				</>
			)}
		</button>
	);
};

export default Button;
