import { FC } from 'react';
import s from './style.module.scss';
import { UserModal } from '../../shared/constants';
import { MdOutlineModeEditOutline } from 'react-icons/md';

interface Props {
	openModal: (name: UserModal) => void;
	modal: UserModal;
}

const Edit: FC<Props> = ({ openModal, modal }) => (
	<div className={s.edit} onClick={() => openModal(modal)}>
		<MdOutlineModeEditOutline size={'24px'} />
	</div>
);

export default Edit;
