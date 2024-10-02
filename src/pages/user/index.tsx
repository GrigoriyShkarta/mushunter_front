import { FC, useEffect, useState } from 'react';
import s from './style.module.scss';
import { useUserStore } from './store';
import { MainBlock } from './components';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Languages, UserModal } from '../../shared/constants';
import SkillsBlock from './components/SkillsBlock';
import DescriptionBlock from './components/DescriptionBlock';
import { useModalStore } from '../../components/modals/store.ts';
import MainSettingsModal from '../../components/modals/mainSettingsModal';
import Modal from '../../components/modals';
import SkillsSettingsModal from '../../components/modals/skillsSettingsModal';
import DescriptionSettingsModal from '../../components/modals/descriptionSettingsModal';
import { UserSchemaType } from '../../services/endpoints/user/response';

const User: FC = () => {
	const profile = useUserStore((state) => state.profile);
	const user = useUserStore((state) => state.user);
	const settings = useUserStore((state) => state.settings);
	const fetchSettings = useUserStore((state) => state.fetchSettings);
	const getUser = useUserStore((state) => state.getUserFromId);
	const { setIsOpen, setTitle, setChildren } = useModalStore();
	const { i18n, t } = useTranslation();
	const navigate = useNavigate();
	const { id } = useParams();

	const [pageData, setPageData] = useState<UserSchemaType | null>(null);

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

		if (!settings && profile) {
			fetchSettings();
		}
	}, [navigate, profile, settings, fetchSettings]);

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
					/>
					{pageData.skills.length > 0 && (
						<SkillsBlock skills={pageData.skills} id={pageData.id} openModal={openModal} />
					)}
					{pageData.description && (
						<DescriptionBlock description={pageData.description} id={pageData.id} openModal={openModal} />
					)}
				</>
			)}
			<Modal />
		</div>
	);
};

export default User;
