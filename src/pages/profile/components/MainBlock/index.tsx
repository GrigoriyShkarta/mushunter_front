import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { GroupSchemaType } from '../../../../services/endpoints/group/response/index.ts';
import { UserSchemaType } from '../../../../services/endpoints/user/response/index.ts';
import { Field, Languages, UserModal } from '../../../../shared/constants';
import { useUserStore } from '../../store';
import Background from './Background.tsx';
import { Avatar, GroupBlock, MessageBlock, ProfileDetail, ProfileInfo } from './components';
import s from './style.module.scss';

interface UserProps {
	openModal: (name: UserModal) => void;
}

const MainBlock: FC<UserProps> = ({ openModal }) => {
	const profile = useUserStore((state) => state.profile);
	const pageData = useUserStore((state) => state.pageData);
	const { i18n } = useTranslation();

	function isUser(data: UserSchemaType | GroupSchemaType | null): data is UserSchemaType {
		return data ? Field.FIRST_NAME in data : false;
	}

	return (
		pageData && (
			<section className={s.section}>
				<Background />
				<Avatar profileId={profile?.id} id={pageData.id} openModal={openModal} ava={pageData?.avatar} />
				<div className={s.wrapper}>
					{profile?.id === pageData.id && (
						<div className={s.edit} onClick={() => openModal(UserModal.MainSettings)}>
							<MdOutlineModeEditOutline size={'24px'} />
						</div>
					)}
					<div className={s.info}>
						<ProfileInfo
							firstName={isUser(pageData) ? pageData.firstname : undefined}
							lastName={isUser(pageData) ? pageData.lastname : undefined}
							groupName={!isUser(pageData) ? pageData?.name : undefined}
							isLookingForBand={isUser(pageData) && pageData.isLookingForBand}
							lookingForSkills={
								isUser(pageData)
									? pageData?.lookingForSkills &&
										pageData.lookingForSkills.map((skill) => skill.name[i18n.language as Languages])
									: undefined
							}
							styles={pageData?.styles?.map((style) => style.name)}
							skills={
								isUser(pageData)
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
							education={isUser(pageData) ? pageData?.education : undefined}
							phone={isUser(pageData) ? pageData?.phone : undefined}
							profileId={profile?.id}
						/>

						<MessageBlock id={pageData.id} />
					</div>
					{isUser(pageData) && (
						<GroupBlock
							id={pageData.id}
							openModal={openModal}
							profileId={profile?.id}
							groups={isUser(pageData) ? pageData.groups : undefined}
						/>
					)}
				</div>
			</section>
		)
	);
};

export default MainBlock;
