import { FC, useEffect } from 'react';
import s from './style.module.scss';
import { useUserStore } from './store';
import { MainBlock } from './components';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Languages, UserModal } from '../../shared/constants';
import SkillsBlock from './components/SkillsBlock';
import DescriptionBlock from './components/DescriptionBlock';
import { useModalStore } from '../../components/modals/store.ts';
import MainSettingsModal from '../../components/modals/mainSettingsModal';
import Modal from '../../components/modals';
import SkillsSettingsModal from '../../components/modals/skillsSettingsModal';
import DescriptionSettingsModal from '../../components/modals/descriptionSettingsModal';

const User: FC = () => {
	const user = useUserStore((state) => state.user);
	const settings = useUserStore((state) => state.settings);
	const fetchSettings = useUserStore((state) => state.fetchSettings);
	const { setIsOpen, setTitle, setChildren } = useModalStore();
	const { i18n, t } = useTranslation();
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			navigate('/');
		} else if (!settings) {
			fetchSettings();
		}
	}, [navigate, user, settings]);

	if (!user) {
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
			<MainBlock
				id={user.id}
				firstName={user?.firstname}
				lastName={user?.lastname}
				city={user?.city && user.city.name[i18n.language as Languages]}
				skills={user?.skills && user.skills.map((skill) => skill.name[i18n.language as Languages])}
				birthday={user?.birthday}
				education={user?.education}
				likes={user.likes}
				links={user.links}
				phone={user?.phone}
				styles={user.styles.map((style) => style.name)}
				openModal={openModal}
			/>
			<SkillsBlock skills={user.skills} id={user.id} openModal={openModal} />
			<DescriptionBlock description={user.description} id={user.id} openModal={openModal} />
			<Modal />
		</div>
	);
};

export default User;
