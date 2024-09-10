import { FC } from 'react';
import s from './style.module.scss';
import Background from './Background.tsx';
import { SvgDefaultAva } from '../../../../assets/svg';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { getAgeWord } from '../../../../shared/helpers/getYears.ts';
import { useTranslation } from 'react-i18next';
import { Languages } from '../../../../shared/constants';
import { AiTwotoneLike } from 'react-icons/ai';
import Button from '../../../../components/buttons/Button.tsx';
import { BsSend } from 'react-icons/bs';
import { useUserStore } from '../../store';

interface Props {
	id: number;
	firstName: string;
	lastName: string;
	city?: string;
	ava?: string;
	skills?: string[];
	birthday?: string;
	likes: number;
}

const MainBlock: FC<Props> = ({ id, firstName, lastName, ava, city, skills, birthday, likes }) => {
	const user = useUserStore((state) => state.user);
	const { t, i18n } = useTranslation();

	return (
		<section className={s.section}>
			<Background />
			{ava ? <img className={s.ava} src={ava} alt="user_avatar" /> : <SvgDefaultAva className={s.ava} />}
			<div className={s.wrapper}>
				{user?.id === id && (
					<div className={s.edit}>
						<MdOutlineModeEditOutline size={'24px'} />
					</div>
				)}
				<div className={s.block}>
					<h1>
						{firstName} {lastName}
					</h1>
					<div className={s.skillsWrapper}>
						{skills &&
							skills.map((skill) => (
								<div className={s.skill} key={skill}>
									{skill}
								</div>
							))}
					</div>
				</div>

				<div className={s.block}>
					{city && <p className={s.blackText}>{city}</p>}
					{birthday && <p className={s.greyText}>{getAgeWord(birthday, i18n.language as Languages)}</p>}
				</div>

				<div className={s.block}>
					<div className={s.likeWrapper}>
						<AiTwotoneLike size={'28px'} title={t('user.recommend')} />
						<p className={s.number}>{likes}</p>
					</div>
				</div>

				{user?.id !== id && <Button type={'button'} value={'user.write'} className={s.button} icon={<BsSend />} />}
			</div>
		</section>
	);
};

export default MainBlock;
