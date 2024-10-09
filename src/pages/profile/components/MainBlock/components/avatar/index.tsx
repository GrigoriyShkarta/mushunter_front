import { FC } from 'react';
import s from './style.module.scss';
import { SvgDefaultAva } from '../../../../../../assets/svg';
import { UserModal } from '../../../../../../shared/constants';
import { MdOutlineModeEditOutline } from 'react-icons/md';

interface Props {
	ava?: string;
	profileId?: number;
	id: number;
	openModal: (data: UserModal) => void;
}

const Avatar: FC<Props> = ({ ava, id, profileId, openModal }) => {
	return (
		<div className={s.avaBlock}>
			{ava ? <img className={s.ava} src={ava} alt="user_avatar" /> : <SvgDefaultAva className={s.ava} />}
			{profileId === id && (
				<div className={s.avaEdit} onClick={() => openModal(UserModal.ChangeAva)}>
					<MdOutlineModeEditOutline size={'24px'} />
				</div>
			)}
		</div>
	);
};

export default Avatar;
