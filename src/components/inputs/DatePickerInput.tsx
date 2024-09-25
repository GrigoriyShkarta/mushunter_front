import { FC } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { uk } from 'date-fns/locale/uk';
import 'react-datepicker/dist/react-datepicker.css';
import { Field } from '../../shared/constants';
import s from './Inputs.module.scss';
import { capitalizeFirstLetter } from '../../shared/helpers/capitalizeFirstLetter.ts';
import { useTranslation } from 'react-i18next';
import { Controller } from 'react-hook-form';
import { getMonth, getYear } from 'date-fns';

registerLocale('uk', uk);

interface Props {
	name: Field;
	control: any;
	defaultValue?: Date;
}

const DatePickerInput: FC<Props> = ({ name, control, defaultValue }) => {
	const { t } = useTranslation();

	const range = (start: number, end: number): number[] => {
		const result: number[] = [];
		for (let i = start; i <= end; i++) {
			result.push(i);
		}
		return result;
	};

	const years = range(1940, getYear(new Date()) + 1);
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	return (
		<div className={s.wrapper}>
			<label className={s.label}>{capitalizeFirstLetter(t(`general.${name}`))}</label>
			<Controller
				name={name}
				control={control}
				defaultValue={defaultValue}
				render={({ field: { onChange, onBlur, value } }) => (
					<DatePicker
						selected={value}
						locale={'uk'}
						onChange={(date) => onChange(date)}
						onBlur={onBlur}
						className={s.container}
						renderCustomHeader={({
							date,
							changeYear,
							changeMonth,
							decreaseMonth,
							increaseMonth,
							prevMonthButtonDisabled,
							nextMonthButtonDisabled,
						}) => (
							<div style={{ margin: 10, display: 'flex', justifyContent: 'center' }}>
								<button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
									{'<'}
								</button>
								<select value={getYear(date)} onChange={({ target: { value } }) => changeYear(+value)}>
									{years.map((option) => (
										<option key={option} value={option}>
											{option}
										</option>
									))}
								</select>
								<select
									value={months[getMonth(date)]}
									onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
								>
									{months.map((option) => (
										<option key={option} value={option}>
											{option}
										</option>
									))}
								</select>
								<button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
									{'>'}
								</button>
							</div>
						)}
						placeholderText={capitalizeFirstLetter(t('input.enterValue', { value: t(`general.${name}`) }))}
						customInput={
							<input
								type={'text'}
								id={name}
								placeholder={capitalizeFirstLetter(t('input.choose', { value: t(`general.${name}`) }))}
							/>
						}
					/>
				)}
			/>
		</div>
	);
};

export default DatePickerInput;
