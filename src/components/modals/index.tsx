import { FC, MouseEvent, ReactNode } from 'react';
import Portal from './Portal';
import s from './style.module.scss';
import { useModalStore } from './store.ts';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
	title?: string;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
	const { isOpen, title, setIsOpen } = useModalStore((state) => ({
		isOpen: state.isOpen,
		title: state.title,
		setIsOpen: state.setIsOpen,
	}));

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
			<div className={`${s.overlay} ${isVisible ? s.open : ''}`} onClick={handleOverlayClick}>
				<div className={`${s.modal} ${isVisible ? s.open : ''}`}>
					{title && <h2>{title}</h2>}
					<button className={s.close} onClick={onClose}>
						×
					</button>
					<div>{children}</div>
				</div>
			</div>
		</Portal>
	);
};

export default Modal;
