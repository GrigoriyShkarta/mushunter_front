import { FC } from 'react';
import Select, { MultiValue, SingleValue, StylesConfig } from 'react-select';
import makeAnimated from 'react-select/animated';
import { Option } from '../../shared/models';
import { useTranslation } from 'react-i18next';
import { capitalizeFirstLetter } from '../../shared/helpers/capitalizeFirstLetter.ts';
import { UseFormRegisterReturn } from 'react-hook-form';
import s from './Inputs.module.scss';

const colourStyles: StylesConfig<Option, boolean> = {
	container: (styles) => ({
		...styles,
		':active': {
			borderColor: '#ed6b15',
		},
	}),

	control: (styles) => ({
		...styles,
		backgroundColor: 'white',
		border: '1px solid #949494',
		boxShadow: 'none',
		borderRadius: '9px',

		':hover': {
			borderColor: '#ed6b15',
		},
	}),
	option: (styles, { isFocused }) => ({
		...styles,
		backgroundColor: isFocused ? '#F4A876' : 'white',
		cursor: 'pointer',
		':hover': {
			backgroundColor: '#F4A876',
		},
	}),
};

const animatedComponents = makeAnimated();

interface Props {
	register: UseFormRegisterReturn;
	defaultValue?: Option[];
	isMulti?: boolean;
	options?: Option[];
	onChange: (newValue: MultiValue<Option> | SingleValue<Option>) => void;
	name: string;
}

const SelectInput: FC<Props> = ({ defaultValue, options, isMulti = false, onChange, name, register }) => {
	const { t } = useTranslation();

	return (
		<div>
			<label className={`${s.label}`}>{capitalizeFirstLetter(t(`general.${name}`))}</label>
			<Select
				{...register}
				closeMenuOnSelect={!isMulti}
				components={animatedComponents}
				defaultValue={defaultValue}
				isMulti={isMulti}
				options={options}
				onChange={onChange}
				placeholder={capitalizeFirstLetter(t('input.choose', { value: t(`general.${name}`) }))}
				styles={colourStyles}
			/>
		</div>
	);
};

export default SelectInput;
