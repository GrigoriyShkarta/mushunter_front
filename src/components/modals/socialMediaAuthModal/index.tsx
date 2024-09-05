import { FC } from 'react';
import { useForm } from 'react-hook-form';

const SocialMediaAuthModal: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	return <div></div>;
};

export default SocialMediaAuthModal;
