import { FC, useEffect, useState } from 'react';
import s from './style.module.scss';
import { useUserStore } from './store';
import { MainBlock } from './components';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Languages, PageBlock, UserModal } from '../../shared/constants';
import { useModalStore } from '../../components/modals/store.ts';
import MainSettingsModal from '../../components/modals/mainSettingsModal';
import Modal from '../../components/modals';
import SkillsSettingsModal from '../../components/modals/skillsSettingsModal';
import DescriptionSettingsModal from '../../components/modals/descriptionSettingsModal';
import { UserSchemaType } from '../../services/endpoints/user/response';
import ChangeAvaModal from '../../components/modals/changeAvaModal';
import CreateBandModal from '../../components/modals/createBandModal';
import Tabs from './components/Tabs';
import SkillsBlock from './components/Tabs/SkillsBlock';
import DescriptionBlock from './components/Tabs/DescriptionBlock';
import InSearchBlock from './components/Tabs/InSearchBlock';
import InSearchModal from '../../components/modals/inSearchModal';

const User: FC = () => {
	const profile = useUserStore((state) => state.profile);
	const user = useUserStore((state) => state.user);
	const settings = useUserStore((state) => state.settings);
	const fetchSettings = useUserStore((state) => state.fetchSettings);
	const getUser = useUserStore((state) => state.getUserFromId);
	const { setIsOpen, setTitle, setChildren } = useModalStore();
	const { t, i18n } = useTranslation();
	const navigate = useNavigate();
	const { id } = useParams();

	const [pageData, setPageData] = useState<UserSchemaType | null>(null);
	const [activeBlock, setActiveBlock] = useState<PageBlock>(PageBlock.DescriptionBlock);

	console.log('pageData', pageData);

	useEffect(() => {
		if (!profile && !id) {
			navigate('/');
			return;
		}

		if (id) {
			getUser({ id: +id });
		} else {
			setPageData(profile);
		}

		// if (!settings && profile) {
		fetchSettings();
		// }
	}, [navigate, profile, fetchSettings, id, getUser]);

	useEffect(() => {
		if (id) {
			setPageData(user);
		}
	}, [id, profile, user]);

	if (!profile && !id) {
		return null;
	}

	const openModal = (name: UserModal): void => {
		setIsOpen(true);
		switch (name) {
			case UserModal.MainSettings:
				setTitle(t('general.mainSettings'));
				setChildren(<MainSettingsModal />);
				break;
			case UserModal.SkillSettings:
				setTitle(t('general.skillSettings'));
				setChildren(<SkillsSettingsModal />);
				break;
			case UserModal.DescriptionSettings:
				setTitle(t('general.descriptionEdit'));
				setChildren(<DescriptionSettingsModal />);
				break;
			case UserModal.ChangeAva:
				setTitle(t('general.changeAva'));
				setChildren(<ChangeAvaModal />);
				break;
			case UserModal.CreateBand:
				setTitle(t('user.createBandModal'));
				setChildren(<CreateBandModal />);
				break;
			case UserModal.SearchSettings:
				setTitle(t('general.lookingForSkills'));
				setChildren(<InSearchModal />);
				break;
		}
	};

	const ActiveBlock = (data: UserSchemaType): JSX.Element | undefined => {
		switch (activeBlock) {
			case PageBlock.DescriptionBlock:
				return (
					<DescriptionBlock description={data.description} id={data.id} openModal={openModal} profileId={data?.id} />
				);
			case PageBlock.SkillBlock:
				return <SkillsBlock skills={data.skills} id={data.id} openModal={openModal} profileId={profile?.id} />;
			case PageBlock.SearchBlock:
				return <InSearchBlock id={data.id} openModal={openModal} searchArray={profile?.lookingForSkills} />;
		}
	};

	return (
		<div className={s.container}>
			{pageData && (
				<>
					<MainBlock
						id={pageData.id}
						firstName={pageData?.firstname}
						lastName={pageData?.lastname}
						city={pageData?.city && pageData.city.name[i18n.language as Languages]}
						skills={pageData?.skills && pageData.skills.map((skill) => skill.name[i18n.language as Languages])}
						birthday={pageData?.birthday}
						education={pageData?.education}
						likes={pageData.likes}
						links={pageData.links}
						phone={pageData?.phone}
						styles={pageData.styles.map((style) => style.name)}
						openModal={openModal}
						hasLiked={pageData.hasLiked}
						isLookingForBand={pageData.isLookingForBand}
						lookingForSkills={
							pageData?.lookingForSkills &&
							pageData.lookingForSkills.map((skill) => skill.name[i18n.language as Languages])
						}
						ava={pageData.avatar}
						groups={pageData.groups}
					/>
					<div className={s.blocks}>
						<Tabs activeBlock={activeBlock} setActiveBlock={setActiveBlock} />

						{ActiveBlock(pageData)}
					</div>
				</>
			)}
			<Modal />
		</div>
	);
};

export default User;
