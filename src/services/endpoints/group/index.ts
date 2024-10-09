import axiosInstance from '../../axios';
import { GroupSchema, GroupSchemaType } from './response';

export const create = async (data: FormData): Promise<GroupSchemaType> => {
	const response = await axiosInstance.post('/group/create', data);
	return GroupSchema.parse(response.data.decompressedData);
};
