import {
	Box,
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Stack,
	Text
} from '@chakra-ui/react'
import { FC } from 'react'
import { useForm } from 'react-hook-form'

import { useAuthenticate } from './hooks/useAuthenticate'

interface IForm {
	email: string
	password: string
}
interface IAuthProps {
	onClick: () => void
}

export const Auth: FC<IAuthProps> = ({ onClick }) => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<IForm>({ mode: 'onChange' })
	const { mutate: authenticate, isLoading } = useAuthenticate()

	const onSubmit = (data: IForm) => {
		authenticate(data)
	}

	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			h="600px"
			w="600px"
			backgroundColor="#EDF2F7"
			borderRadius="10px"
		>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Box
					backgroundColor={'#EDF2F7'}
					justifyContent={'center'}
					display="flex"
					flexDirection="column"
					alignItems={'center'}
				>
					<Stack spacing={'20px'}>
						<FormControl
							id={'email'}
							isRequired
							isInvalid={!!errors.email}
							w="300px"
						>
							<FormLabel>Email</FormLabel>
							<Input
								type="email"
								{...register('email', {
									pattern: {
										value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
										message: 'Неверный формат электронной почты'
									}
								})}
								backgroundColor={'white'}
								name="email"
							/>
							<FormErrorMessage maxW={'100%'}>
								{errors.email?.message}
							</FormErrorMessage>
						</FormControl>
						<FormControl
							id={'password'}
							isRequired
							isInvalid={!!errors.password}
							w="300px"
						>
							<FormLabel>Password</FormLabel>
							<Input
								type="password"
								{...register('password', {
									minLength: {
										message: 'Введите больше 3 символов',
										value: 3
									}
								})}
								backgroundColor={'white'}
								name="password"
							/>
							<FormErrorMessage maxW={'100%'}>
								{errors.password?.message}
							</FormErrorMessage>
						</FormControl>
					</Stack>
					<Button
						mt={'5px'}
						variant={'solid'}
						backgroundColor={'skyblue'}
						isDisabled={Object.keys(errors).length > 0}
						type="submit"
						isLoading={isLoading}
					>
						Авторизоваться
					</Button>
					<Text fontSize="sm" mt={2}>
						<Button onClick={onClick}>
							Нет аккаунта? Зарегистрируйтесь здесь
						</Button>
					</Text>
				</Box>
			</form>
		</Box>
	)
}
