import { FC } from 'react';
import s from './style.module.scss';
import Background from './Background.tsx';
import { MdGroups, MdOutlineModeEditOutline } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { UserModal } from '../../../../shared/constants';
import Button from '../../../../components/buttons/Button.tsx';
import { BsSend } from 'react-icons/bs';
import { useUserStore } from '../../store';
import { Link, useNavigate } from 'react-router-dom';
import { FaCirclePlus } from 'react-icons/fa6';
import { Avatar, ProfileDetail, ProfileInfo } from './components';

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
	id: number;
	firstName?: string;
	lastName?: string;
	groupName?: string;
	city?: string;
	phone?: string;
	ava?: string;
	skills?: string[];
	birthday?: Date;
	hasLiked: boolean;
	likes: number;
	links: string[];
	styles: string[];
	education?: string;
	openModal: (name: UserModal) => void;
	isLookingForBand: boolean;
	lookingForSkills: string[];
	groups?: Group[];
}

const MainBlock: FC<Props> = ({
	id,
	firstName,
	lastName,
	groupName,
	ava,
	city,
	skills,
	birthday,
	likes,
	links,
	phone,
	styles,
	education,
	openModal,
	hasLiked,
	isLookingForBand,
	lookingForSkills,
	groups,
}) => {
	const profile = useUserStore((state) => state.profile);
	const { t, i18n } = useTranslation();
	const navigate = useNavigate();

	return (
		<section className={s.section}>
			<Background />
			<Avatar profileId={profile?.id} id={id} openModal={openModal} ava={ava} />
			<div className={s.wrapper}>
				{profile?.id === id && (
					<div className={s.edit} onClick={() => openModal(UserModal.MainSettings)}>
						<MdOutlineModeEditOutline size={'24px'} />
					</div>
				)}
				<div className={s.info}>
					<ProfileInfo
						firstName={firstName}
						lastName={lastName}
						groupName={groupName}
						isLookingForBand={isLookingForBand}
						lookingForSkills={lookingForSkills}
						styles={styles}
						skills={skills}
					/>

					<ProfileDetail
						likes={likes}
						links={links}
						id={id}
						hasLiked={hasLiked}
						birthday={birthday}
						city={city}
						education={education}
						phone={phone}
						profileId={profile?.id}
					/>

					{!profile && (
						<div className={s.joinBlock}>
							<p className={s.joinBlock__text}>
								<span className={s.joinBlock__link} onClick={() => navigate('/')}>
									{t('user.join')}
								</span>
								{' ' + t('user.pleaseLogin')}
							</p>
						</div>
					)}

					{profile && profile.id !== id && (
						<Button type={'button'} value={'user.write'} className={s.button} icon={<BsSend />} />
					)}
				</div>
				<div className={s.groupBlock}>
					{groups &&
						groups?.length > 0 &&
						groups?.map((group) => (
							<div className={s.group} key={group.id}>
								{group.avatar ? <img className={s.group__ava} src={group.avatar} alt="avatar" /> : <MdGroups />}
								<div className={s.group__info}>
									<Link to={'/group'} className={s.group__info__name}>
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
					{profile?.id === id && (
						<div className={s.createGroup} onClick={() => openModal(UserModal.CreateBand)}>
							<FaCirclePlus />
							<p>{t('user.createBand')}</p>
						</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default MainBlock;
