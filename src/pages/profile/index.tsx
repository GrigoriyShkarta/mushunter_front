import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Modal from '../../components/modals';
import ChangeAvaModal from '../../components/modals/changeAvaModal';
import CreateBandModal from '../../components/modals/createBandModal';
import DescriptionSettingsModal from '../../components/modals/descriptionSettingsModal';
import InSearchModal from '../../components/modals/inSearchModal';
import MainSettingsModal from '../../components/modals/mainSettingsModal';
import SkillsSettingsModal from '../../components/modals/skillsSettingsModal';
import { useModalStore } from '../../components/modals/store.ts';
import { GroupSchemaType } from '../../services/endpoints/group/response/index.ts';
import { UserSchemaType } from '../../services/endpoints/user/response';
import { PageBlock, ProfileType, UserModal } from '../../shared/constants';
import { MainBlock } from './components';
import Tabs from './components/Tabs';
import DescriptionBlock from './components/Tabs/DescriptionBlock';
import InSearchBlock from './components/Tabs/InSearchBlock';
import SkillsBlock from './components/Tabs/SkillsBlock';
import { useUserStore } from './store';
import s from './style.module.scss';

const User: FC = () => {
	const profile = useUserStore((state) => state.profile);
	const pageData = useUserStore((state) => state.pageData);
	const setPageData = useUserStore((state) => state.setPageData);
	const fetchSettings = useUserStore((state) => state.fetchSettings);
	const getUser = useUserStore((state) => state.getUserFromId);
	const getBand = useUserStore((state) => state.getBandById);
	const { setIsOpen, setTitle, setChildren } = useModalStore();
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { id } = useParams();
	const location = useLocation();
	const type = location.pathname.includes('/user') ? ProfileType.USER : ProfileType.BAND;
	const [activeBlock, setActiveBlock] = useState<PageBlock>(PageBlock.DescriptionBlock);

	useEffect(() => {
		if (!profile && !id) {
			navigate('/');
			return;
		}

		if (type === ProfileType.USER) {
			if (id) {
				getUser({ id: +id });
			} else {
				profile && setPageData(profile);
				fetchSettings();
			}
		}

		if (type === ProfileType.BAND && id) {
			getBand(+id);
		}
	}, [profile, id]);

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
				setTitle(t('user.createBand'));
				setChildren(<CreateBandModal />);
				break;
			case UserModal.SearchSettings:
				setTitle(t('general.lookingForSkills'));
				setChildren(<InSearchModal />);
				break;
		}
	};

	const ActiveBlock = (data: UserSchemaType | GroupSchemaType): JSX.Element | undefined => {
		switch (activeBlock) {
			case PageBlock.DescriptionBlock:
				return <DescriptionBlock description={data.description} id={data.id} openModal={openModal} />;
			case PageBlock.SkillBlock:
				return <SkillsBlock skills={data.skills} id={data.id} openModal={openModal} />;
			case PageBlock.SearchBlock:
				return (
					<InSearchBlock
						id={data.id}
						openModal={openModal}
						searchArray={data?.lookingForSkills}
						isLookingForBand={data?.isLookingForBand}
						position={data.position}
						descriptionPosition={data?.descriptionPosition}
						stylesLookingForBand={data?.stylesLookingForBand}
					/>
				);
		}
	};

	return (
		<div className={s.container}>
			{pageData && (
				<>
					<MainBlock openModal={openModal} />
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
