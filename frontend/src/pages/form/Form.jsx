import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import { request } from '../../../request';

const authFormSchema = yup.object().shape({
	name: yup
		.string()
		.required('Заполните ФИО')
		.matches(/^[А-ЯЁ][а-яё]{2,}([-][А-ЯЁ][а-яё]{2,})?\s[А-ЯЁ][а-яё]{2,}\s[А-ЯЁ][а-яё]{2,}$/, 
		'Допускаются только буквы верхнего и нижнего регистра'),
	telephone: yup
		.string()
		.required('Введите свой номер телефона в формате +7999-999-99-99')
		.matches(
			/^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/,
			'Неверно заполнен пароль. Допускаются только цифры и знак +',
		)
		.min(10, 'Неверно заполнен пароль. Минимум 10 символов')
		.max(15, 'Неверно заполнен пароль. Максимум 15 символов'),
	title: yup
	.string()
	.required('Опишите свою проблему')
	.min(20, 'Пожалуйста, опишите подробнее свою проблему, допускается не менее 20 символов')
});

const FormContainer = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: '',
			telephone: '',
			title: '',
		},
		resolver: yupResolver(authFormSchema),
	});

	const [message, setMessage] = useState(null);
	
	const onSubmit = ({ name, telephone, title }) => {
		request('/form', 'POST', { name, telephone, title }).then(({ message }) => {
			setMessage(message);
			setTimeout(() => {
				setMessage(null);
				reset({
					name: '',
					telephone: '',
					title: '',
				})
			}, 3000);
		});
	};

	const formError = errors?.name?.message || errors?.telephone?.message || errors?.title?.message;

	return (
		<div className={className}>
			{message ? 
			<div className='message'>{message}</div> 
			: <div className='title'>Запись к врачу</div>}
			<form onSubmit={handleSubmit(onSubmit)}>
				<input className='input-form'
					type="text"
					placeholder="ФИО..."
					{...register('name')}
				/>
				<input className='input-form'
					type="text"
					placeholder="Номер телефона..."
					{...register('telephone')}
				/>
				<textarea
					rows='10'
					type="text"
					placeholder="Опишите Вашу проблему..."
					{...register('title')}
				/>
				<div className='error-message'>{formError}</div>
				<button className='button-login-register' type="submit" disabled={!!message} >
					Отправить форму
				</button>
			</form>
		</div>
	);
};
export const Form = styled(FormContainer)`
	display: flex;
	flex-direction: column;
	position: relative;
	min-height: 100vh;
	width: 100%;
	align-items: center;
	justify-content: center;

	.input-form {
		width: 400px;
		height: 30px;
		margin-top: 20px;
		font-size: 20px;
		border-radius: 5px;
		border: 1px solid #aba8a8;
	}
	.message {
		color: green;
		align-items: center;
		justify-content: center;
		font-size: 30px;
	}
`;