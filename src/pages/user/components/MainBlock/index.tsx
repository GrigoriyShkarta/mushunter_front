import { FC, Fragment } from 'react';
import s from './style.module.scss';
import Background from './Background.tsx';
import { SvgDefaultAva } from '../../../../assets/svg';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { getAgeWord } from '../../../../shared/helpers/getYears.ts';
import { useTranslation } from 'react-i18next';
import { Languages, UserModal } from '../../../../shared/constants';
import { AiTwotoneLike } from 'react-icons/ai';
import Button from '../../../../components/buttons/Button.tsx';
import { BsSend } from 'react-icons/bs';
import { useUserStore } from '../../store';
import { getIconForLink } from '../../../../shared/helpers/getIconForLink.tsx';
import { IoIosMusicalNote } from 'react-icons/io';

interface Props {
	id: number;
	firstName: string;
	lastName: string;
	city?: string;
	phone?: string;
	ava?: string;
	skills?: string[];
	birthday?: Date;
	likes: number;
	links: string[];
	styles: string[];
	education?: string;
	openModal: (name: UserModal) => void;
}

const MainBlock: FC<Props> = ({
	id,
	firstName,
	lastName,
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
}) => {
	const user = useUserStore((state) => state.user);
	const { t, i18n } = useTranslation();

	return (
		<section className={s.section}>
			<Background />
			{ava ? <img className={s.ava} src={ava} alt="user_avatar" /> : <SvgDefaultAva className={s.ava} />}
			<div className={s.wrapper}>
				{user?.id === id && (
					<div className={s.edit} onClick={() => openModal(UserModal.MainSettings)}>
						<MdOutlineModeEditOutline size={'24px'} />
					</div>
				)}
				<div className={s.block}>
					<h1>
						{firstName} {lastName}
					</h1>
					<div className={s.arrayWrapper}>
						{skills?.map((skill) => (
							<div className={s.itemSkill} key={skill}>
								{skill}
							</div>
						))}
					</div>
				</div>

				{styles.length > 0 && (
					<div className={s.styleBlock}>
						<div className={s.top}>
							<IoIosMusicalNote />
							<h4 className={s.stylesTitle}>{t('user.basicStyles')}</h4>
						</div>
						<div className={s.stylesWrapper}>
							{styles.map((style, index) => (
								<Fragment key={style}>
									<p>{style}</p>
									{index < styles.length - 1 && <span> • </span>}
								</Fragment>
							))}
						</div>
					</div>
				)}

				<div className={s.block}>
					{city && <p className={s.blackText}>{city}</p>}
					{birthday && <p className={s.greyText}>{getAgeWord(birthday, i18n.language as Languages)}</p>}
					{phone && <p className={s.greyText}>{phone}</p>}
					{education && <p className={s.greyText}>{education}</p>}
				</div>

				<div className={s.block}>
					<div className={s.likeWrapper}>
						<AiTwotoneLike size={'22px'} title={t('user.recommend')} />
						<div className={s.line} />
						<p className={s.number}>{likes}</p>
					</div>
				</div>

				{links.length > 0 && (
					<div className={s.links}>
						{links.map((link, idx) => (
							<div className={s.link} key={idx}>
								<a href={link} target={'_blank'}>
									{getIconForLink(link)}
								</a>
							</div>
						))}
					</div>
				)}

				{user?.id !== id && <Button type={'button'} value={'user.write'} className={s.button} icon={<BsSend />} />}
			</div>
		</section>
	);
};

export default MainBlock;
