import { AiFillYoutube } from 'react-icons/ai';
import { FaFacebook, FaTelegram } from 'react-icons/fa';
import { MdLink } from 'react-icons/md';
import { ReactElement } from 'react';

export function getIconForLink(link: string): ReactElement {
	try {
		const url = new URL(link);
		const domain = url.hostname;

		if (domain.includes('youtube.com') || domain.includes('youtu.be')) {
			return <AiFillYoutube size={'28px'} color={'#c4302b'} />;
		} else if (domain.includes('t.me')) {
			return <FaTelegram size={'28px'} color={'#24A1DE'} />;
		} else if (domain.includes('facebook.com')) {
			return <FaFacebook size={'28px'} color={'#3b5998'} />;
		} else {
			return <MdLink size={'28px'} />;
		}
	} catch (error) {
		console.error('Invalid URL:', link);
		return <MdLink size={'20px'} />;
	}
}
