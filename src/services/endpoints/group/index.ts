import axiosInstance from '../../axios';
import { UserSchema, UserSchemaType } from '../user/response';
import { GroupSchema, GroupSchemaType } from './response';

export const createBand = async (data: FormData): Promise<UserSchemaType> => {
	const response = await axiosInstance.post('/group/create', data);
	return UserSchema.parse(response.data.decompressedData);
};

export const getBand = async (groupId: number): Promise<GroupSchemaType> => {
	const response = await axiosInstance.get(`/group/getGroup`, {
		params: { groupId },
	});
	return GroupSchema.parse(response.data.decompressedData);
};
