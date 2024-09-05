import { FC, MouseEvent } from 'react';
import Portal from './Portal';
import s from './style.module.scss';
import { useModalStore } from './store.ts';

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
					{title && <h2>{title}</h2>}
					<button className={s.close} onClick={handleClose}>
						×
					</button>
					<div>{children}</div>
				</div>
			</div>
		</Portal>
	);
};

export default Modal;
