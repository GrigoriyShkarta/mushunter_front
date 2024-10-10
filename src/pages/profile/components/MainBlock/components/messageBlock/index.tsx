import { FC } from 'react';
import s from './style.module.scss';
import Button from '../../../../../../components/buttons/Button.tsx';
import { BsSend } from 'react-icons/bs';
import { useUserStore } from '../../../../store';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const MessageBlock: FC<{ id: number }> = ({ id }) => {
	const profile = useUserStore((state) => state.profile);
	const { t } = useTranslation();

	return (
		<>
			{!profile && (
				<div className={s.joinBlock}>
					<p className={s.joinBlock__text}>
						<Link to={'/'} className={s.joinBlock__link}>
							{t('user.join')}
						</Link>
						{' ' + t('user.pleaseLogin')}
					</p>
				</div>
			)}

			{profile && profile.id !== id && (
				<Button type={'button'} value={'user.write'} className={s.button} icon={<BsSend />} />
			)}
		</>
	);
};

export default MessageBlock;
