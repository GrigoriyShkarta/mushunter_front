import { FC, useState } from 'react';
import s from './style.module.scss';
import { useTranslation } from 'react-i18next';
import Avatar from 'react-avatar-edit';
import Button from '../../buttons/Button.tsx';
import { useUserStore } from '../../../pages/profile/store';
import { useModalStore } from '../store.ts';

const ChangeAvaModal: FC = () => {
	const { t } = useTranslation();
	const { changeAvatar, sendForm, profile } = useUserStore();
	const [croppedImage, setCroppedImage] = useState<string | null>(null);
	const { setIsOpen } = useModalStore();

	const onCrop = (preview: string) => {
		setCroppedImage(preview);
	};

	const onClose = () => {
		setCroppedImage(null);
	};

	const onClickSendFile = async () => {
		try {
			if (croppedImage) {
				const blob = base64ToBlob(croppedImage);
				const formData = new FormData();
				const randomNumber = Math.floor(Math.random() * 1000000);
				formData.append('file', blob, `avatar_id${profile?.id}_${randomNumber}.png`);
				await changeAvatar(formData);
			}
		} catch (e) {
			console.error('responseError', e);
		} finally {
			setIsOpen(false);
		}
	};

	const base64ToBlob = (base64: string): Blob => {
		const byteString = atob(base64.split(',')[1]);
		const mimeString = base64.split(',')[0].split(':')[1].split(';')[0];

		const ab = new ArrayBuffer(byteString.length);
		const ia = new Uint8Array(ab);
		for (let i = 0; i < byteString.length; i++) {
			ia[i] = byteString.charCodeAt(i);
		}

		return new Blob([ab], { type: mimeString });
	};

	return (
		<div className={s.wrapper}>
			<Avatar width={300} height={300} label={t('user.choosePhoto')} onCrop={onCrop} onClose={onClose} />
			<Button
				type={'button'}
				value={t('general.send')}
				className={s.button}
				disabled={!croppedImage}
				loading={sendForm}
				func={onClickSendFile}
			/>
		</div>
	);
};

export default ChangeAvaModal;
