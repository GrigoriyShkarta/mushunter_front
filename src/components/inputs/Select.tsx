import { FC } from 'react';
import Select, { StylesConfig } from 'react-select';
import makeAnimated from 'react-select/animated';
import { Option } from '../../shared/models';
import { useTranslation } from 'react-i18next';
import { capitalizeFirstLetter } from '../../shared/helpers/capitalizeFirstLetter.ts';
import { Controller } from 'react-hook-form';
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

		div: {
			padding: '3px',

			div: {
				width: 'fit-content !important',
			},
		},

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

	multiValue: (styles) => ({
		...styles,
		borderRadius: '5px',
		backgroundColor: '#ed6b15',
		color: 'white',
		padding: '2px',

		div: {
			color: 'white',
			padding: '2px',

			svg: {
				cursor: 'pointer',
			},
		},
	}),
};

const animatedComponents = makeAnimated();

interface Props {
	defaultValue?: Option[] | Option | any;
	isMulti?: boolean;
	options?: Option[];
	name: string;
	control: any;
	objPath?: string;
	idxPath?: number;
	handleChange?: (selectedOption: Option | Option[]) => void;
	placeholder?: string;
}

const SelectInput: FC<Props> = ({
	defaultValue,
	options,
	isMulti = false,
	name,
	control,
	handleChange,
	objPath,
	idxPath = 0,
	placeholder,
}) => {
	const { t } = useTranslation();

	console.log('defaultValue', defaultValue);

	return (
		<div className={s.wrapper}>
			<label className={`${s.label}`}>{capitalizeFirstLetter(t(`general.${name}`))}</label>
			<Controller
				name={name}
				control={control}
				defaultValue={defaultValue}
				render={({ field: { onChange, value } }) => (
					<Select
						components={animatedComponents}
						options={
							isMulti
								? options
								: options?.filter(
										(opt) =>
											opt.value !==
											(value?.value || (defaultValue !== undefined && defaultValue[0].value) || value || defaultValue),
									)
						}
						isMulti={isMulti}
						onChange={handleChange || onChange}
						placeholder={capitalizeFirstLetter(t('input.choose', { value: t(`general.${placeholder || name}`) }))}
						styles={colourStyles}
						value={objPath ? value[idxPath][objPath] : value}
					/>
				)}
			/>
		</div>
	);
};

export default SelectInput;
