import { FC } from 'react';
import s from './style.module.scss';
import { getAgeWord } from '../../../../../../shared/helpers/getYears.ts';
import { AiTwotoneLike } from 'react-icons/ai';
import { getIconForLink } from '../../../../../../shared/helpers/getIconForLink.tsx';
import Button from '../../../../../../components/buttons/Button.tsx';
import { BsSend } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import { Languages } from '../../../../../../shared/constants';
import cn from 'classnames';
import { useUserStore } from '../../../../store';

interface Props {
	city?: string;
	birthday?: Date;
	phone?: string;
	education?: string;
	likes: number;
	links: string[];
	profileId?: number;
	id: number;
	hasLiked: boolean;
}

const ProfileDetail: FC<Props> = ({ birthday, city, education, likes, links, phone, profileId, hasLiked, id }) => {
	const { i18n } = useTranslation();
	const { fetchToggleLike } = useUserStore((state) => state);

	const likesClass = cn({
		[s.likeWrapper]: true,
		[s.hoverLikeWrapper]: profileId && id !== profileId,
		[s.activeLike]: hasLiked,
	});

	const onClickLike = () => {
		fetchToggleLike({ id });
	};

	return (
		<div className={s.block}>
			{city && <p className={s.blackText}>{city}</p>}
			{birthday && <p className={s.greyText}>{getAgeWord(birthday, i18n.language as Languages)}</p>}{' '}
			{phone && <p className={s.greyText}>{phone}</p>}
			{education && <p className={s.greyText}>{education}</p>}
			<div className={likesClass}>
				<AiTwotoneLike size={'22px'} title="Recommend" onClick={onClickLike} />
				<div className={s.line} />
				<p className={s.number}>{likes}</p>
			</div>
			{links.length > 0 && (
				<div className={s.links}>
					{links.map((link, idx) => (
						<div className={s.link} key={idx}>
							<a href={link} target={'_blank'} rel="noopener noreferrer">
								{getIconForLink(link)}
							</a>
						</div>
					))}
				</div>
			)}
			{profileId !== id && <Button type={'button'} value={'user.write'} className={s.button} icon={<BsSend />} />}
		</div>
	);
};

export default ProfileDetail;
