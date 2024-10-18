import { FC } from 'react';
import s from './style.module.scss';
import Background from './Background.tsx';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { UserModal } from '../../../../shared/constants';
import { useUserStore } from '../../store';
import { Avatar, GroupBlock, MessageBlock, ProfileDetail, ProfileInfo } from './components';

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
	links?: string[];
	styles?: string[];
	education?: string;
	openModal: (name: UserModal) => void;
	isLookingForBand: boolean;
	lookingForSkills?: string[];
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

					<MessageBlock id={id} />
				</div>
				<GroupBlock id={id} openModal={openModal} profileId={profile?.id} groups={groups} />
			</div>
		</section>
	);
};

export default MainBlock;
