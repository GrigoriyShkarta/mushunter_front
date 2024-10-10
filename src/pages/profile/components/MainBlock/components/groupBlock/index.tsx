import { FC } from 'react';
import s from './style.module.scss';
import { MdGroups } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { UserModal } from '../../../../../../shared/constants';
import { FaCirclePlus } from 'react-icons/fa6';
import { useTranslation } from 'react-i18next';

interface Role {
	id: number;
	name: {
		ua: string;
		en: string;
	};
}

interface Group {
	id: number;
	name: string;
	avatar?: string | null;
	skills?: Role[];
}

interface Props {
	groups?: Group[];
	profileId?: number;
	id: number;
	openModal: (name: UserModal) => void;
}

const GroupBlock: FC<Props> = ({ groups, profileId, id, openModal }) => {
	const { t, i18n } = useTranslation();

	return (
		<div className={s.groupBlock}>
			{groups &&
				groups?.length > 0 &&
				groups?.map((group) => (
					<div className={s.group} key={group.id}>
						{group.avatar ? <img className={s.group__ava} src={group.avatar} alt="avatar" /> : <MdGroups />}
						<div className={s.group__info}>
							<Link to={`/group/:${group.id}`} className={s.group__info__name}>
								{group.name}
							</Link>
							<div className={s.group__info__roles}>
								{group.skills?.map((role) => (
									<div className={s.role} key={role.id}>
										{role.name[i18n.language as 'ua' | 'en']}
									</div>
								))}
							</div>
						</div>
					</div>
				))}
			{profileId === id && (
				<div className={s.createGroup} onClick={() => openModal(UserModal.CreateBand)}>
					<FaCirclePlus />
					<p>{t('user.createBand')}</p>
				</div>
			)}
		</div>
	);
};

export default GroupBlock;
