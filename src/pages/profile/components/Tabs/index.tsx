import { Dispatch, FC, SetStateAction } from 'react';
import s from './style.module.scss';
import { useTranslation } from 'react-i18next';
import { PageBlock } from '../../../../shared/constants';
import { capitalizeFirstLetter } from '../../../../shared/helpers/capitalizeFirstLetter.ts';
import { useUserStore } from '../../store';

interface Props {
	activeBlock: PageBlock;
	setActiveBlock: Dispatch<SetStateAction<PageBlock>>;
}

const Tabs: FC<Props> = ({ activeBlock, setActiveBlock }) => {
	const { t } = useTranslation();
	const profile = useUserStore((state) => state.profile);

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
					<p>{capitalizeFirstLetter(t('general.lookingForSkills'))}</p>
					{profile?.lookingForSkills?.length || profile?.isLookingForBand ? (
						<div className={s.countWrapper}>
							<span className={s.count}>
								{profile?.lookingForSkills?.length
									? profile?.lookingForSkills?.length + (profile?.isLookingForBand ? 1 : 0)
									: profile?.isLookingForBand
										? 1
										: 0}
							</span>
						</div>
					) : (
						''
					)}
				</li>
			</ul>
		</nav>
	);
};

export default Tabs;
