import { FC, MouseEvent } from 'react';
import Portal from './Portal';
import s from './style.module.scss';
import { useModalStore } from './store.ts';
import { capitalizeFirstLetter } from '../../shared/helpers/capitalizeFirstLetter.ts';

const Modal: FC = () => {
	const { isOpen, title, setIsOpen, children } = useModalStore();

	const handleOverlayClick = (e: MouseEvent) => {
		if (e.target === e.currentTarget) {
			setIsOpen(false);
		}
	};

	const handleClose = () => {
		setIsOpen(false);
	};

	if (!isOpen) return null;

	return (
		<Portal>
			<div className={`${s.overlay} ${isOpen ? s.open : ''}`} onClick={handleOverlayClick}>
				<div className={`${s.modal} ${isOpen ? s.open : ''}`}>
					{title && <h2 className={s.title}>{capitalizeFirstLetter(title)}</h2>}
					<button className={s.close} onClick={handleClose}>
						×
					</button>
					{children}
				</div>
			</div>
		</Portal>
	);
};

export default Modal;
