import axiosInstance from '../../axios';
import { UserSchema, UserSchemaType } from '../user/response';
import { GroupSchema, GroupSchemaType } from './response';
import { ChangeMainDataDtoType } from './schema';

export const createBand = async (data: FormData): Promise<UserSchemaType> => {
	const response = await axiosInstance.post('/group/create', data);
	return UserSchema.parse(response.data.decompressedData);
};

export const getBand = async (id: number): Promise<GroupSchemaType> => {
	const response = await axiosInstance.get(`/group/getGroup`, {
		params: { id },
	});
	return GroupSchema.parse(response.data.decompressedData);
};

export const changeMainData = async (data: ChangeMainDataDtoType): Promise<GroupSchemaType> => {
	const response = await axiosInstance.put(`/group/changeMainData`, data);
	return GroupSchema.parse(response.data.decompressedData);
};
