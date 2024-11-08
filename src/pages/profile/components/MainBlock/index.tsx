import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { Field, Languages, UserModal } from '../../../../shared/constants';
import { useUserStore } from '../../store';
import Background from './Background.tsx';
import { Avatar, GroupBlock, MessageBlock, ProfileDetail, ProfileInfo } from './components';
import s from './style.module.scss';

interface UserProps {
	openModal: (name: UserModal) => void;
}

const MANAGER_ID = 1;

const MainBlock: FC<UserProps> = ({ openModal }) => {
	const profile = useUserStore((state) => state.profile);
	const pageData = useUserStore((state) => state.pageData);
	const { i18n } = useTranslation();

	console.log('pageData', pageData);

	const isUser = pageData ? Field.FIRST_NAME in pageData : false;
	const isManager =
		!isUser &&
		pageData?.members?.find((member) => member.role.map((role) => role.id === MANAGER_ID))?.id === profile?.id;

	return (
		pageData && (
			<section className={s.section}>
				<Background />
				<Avatar profileId={profile?.id} id={pageData.id} openModal={openModal} ava={pageData?.avatar} />
				<div className={s.wrapper}>
					{(profile?.id === pageData.id || isManager) && (
						<div className={s.edit} onClick={() => openModal(UserModal.MainSettings)}>
							<MdOutlineModeEditOutline size={'24px'} />
						</div>
					)}
					<div className={s.info}>
						<ProfileInfo
							firstName={isUser ? pageData.firstname : undefined}
							lastName={isUser ? pageData.lastname : undefined}
							groupName={!isUser ? pageData?.name : undefined}
							styles={pageData?.styles?.map((style) => style.name)}
							skills={
								isUser
									? pageData?.skills && pageData.skills.map((skill) => skill.name[i18n.language as Languages])
									: undefined
							}
						/>

						<ProfileDetail
							likes={pageData.likes}
							links={pageData.links}
							id={pageData.id}
							hasLiked={pageData.hasLiked}
							birthday={pageData?.birthday}
							city={pageData?.city && pageData.city.name[i18n.language as Languages]}
							education={isUser ? pageData?.education : undefined}
							phone={isUser ? pageData?.phone : undefined}
							profileId={profile?.id}
						/>

						{isUser && <MessageBlock id={pageData.id} />}
					</div>
					{isUser && (
						<GroupBlock
							id={pageData.id}
							openModal={openModal}
							profileId={profile?.id}
							groups={isUser ? pageData.groups : undefined}
						/>
					)}
				</div>
			</section>
		)
	);
};

export default MainBlock;
