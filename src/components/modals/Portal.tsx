import { FC, ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
	children: ReactNode;
	containerId?: string;
}

const Portal: FC<PortalProps> = ({ children, containerId = 'portal-root' }) => {
	const container = document.getElementById(containerId);

	useEffect(() => {
		if (!container) {
			const newContainer = document.createElement('div');
			newContainer.id = containerId;
			document.body.appendChild(newContainer);
		}
	}, [container, containerId]);

	return container ? createPortal(children, container) : null;
};

export default Portal;
