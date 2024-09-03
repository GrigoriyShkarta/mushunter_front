import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmailStage from './componentsStages/EmailStage';
import CodeStage from './componentsStages/CodeStage';
import ChangePasswordStage from './componentsStages/ChangePasswordStage';
import { ForgotPasswordStage } from '../../../../shared/constants';

const ForgotPassword: FC = () => {
	const [stage, setStage] = useState<ForgotPasswordStage>(ForgotPasswordStage.EMAIL);

	const navigate = useNavigate();

	useEffect(() => {
		const handleBackButton = (): void => {
			if (stage !== ForgotPasswordStage.EMAIL) {
				navigate('/');
			}
		};
		window.addEventListener('popstate', handleBackButton);

		return () => {
			window.removeEventListener('popstate', handleBackButton);
		};
	}, []);

	return (
		<>
			{stage === ForgotPasswordStage.EMAIL && <EmailStage setStage={setStage} />}
			{stage === ForgotPasswordStage.CHECK_CODE && <CodeStage setStage={setStage} />}
			{stage === ForgotPasswordStage.NEW_PASSWORD && <ChangePasswordStage />}
		</>
	);
};

export default ForgotPassword;
