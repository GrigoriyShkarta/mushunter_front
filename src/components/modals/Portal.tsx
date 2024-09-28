import { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
	children: ReactNode;
	containerId?: string;
}

const Portal: FC<PortalProps> = ({ children, containerId = 'portal-root' }) => {
	// Создаем контейнер, если его еще нет
	let container = document.getElementById(containerId);
	if (!container) {
		container = document.createElement('div');
		container.id = containerId;
		document.body.appendChild(container);
	}

	return createPortal(children, container);
};

export default Portal;
