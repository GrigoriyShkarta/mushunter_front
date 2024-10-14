import { Dispatch, FC, SetStateAction } from 'react';
import s from './style.module.scss';
import { useTranslation } from 'react-i18next';
import { PageBlock } from '../../../../shared/constants';
import { capitalizeFirstLetter } from '../../../../shared/helpers/capitalizeFirstLetter.ts';

interface Props {
	activeBlock: PageBlock;
	setActiveBlock: Dispatch<SetStateAction<PageBlock>>;
}

const Tabs: FC<Props> = ({ activeBlock, setActiveBlock }) => {
	const { t } = useTranslation();

	return (
		<nav className={s.nav}>
			<ul className={s.nav__items}>
				<li
					className={`${s.nav__item} ${activeBlock === PageBlock.DescriptionBlock && s.active}`}
					onClick={() => setActiveBlock(PageBlock.DescriptionBlock)}
				>
					{capitalizeFirstLetter(t('user.generalInformation'))}
				</li>
				<li
					className={`${s.nav__item} ${activeBlock === PageBlock.SkillBlock && s.active}`}
					onClick={() => setActiveBlock(PageBlock.SkillBlock)}
				>
					{capitalizeFirstLetter(t('user.skills'))}
				</li>
				<li
					className={`${s.nav__item} ${activeBlock === PageBlock.SearchBlock && s.active}`}
					onClick={() => setActiveBlock(PageBlock.SearchBlock)}
				>
					{capitalizeFirstLetter(t('general.lookingForSkills'))}
				</li>
			</ul>
		</nav>
	);
};

export default Tabs;
