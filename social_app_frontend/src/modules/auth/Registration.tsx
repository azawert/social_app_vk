import {
	Avatar,
	Box,
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Image,
	Input,
	Stack,
	Text
} from '@chakra-ui/react'
import { ChangeEvent, FC, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { useRegistration } from './hooks/useRegistration'

interface IRegistrationProps {
	onClick?: () => void
}
export interface IRegistrationForm {
	email: string
	password: string
	phoneNumber?: string | null
	dateOfBirth?: Date | null
	hometown?: string | null
	university?: string | null
	firstName: string
	lastName: string
	middleName?: string | null
	image?: FileList | null
}

export const Registration: FC<IRegistrationProps> = ({ onClick }) => {
	const {
		handleSubmit,
		formState: { errors },
		register
	} = useForm<IRegistrationForm>({
		mode: 'onChange'
	})
	const { isLoading, mutate: registration } = useRegistration()
	const [image, setImage] = useState<Blob | null>(null)
	const inputImageRef = useRef<HTMLInputElement | null>(null)
	const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return
		setImage(file)
	}
	const onSubmit = (data: IRegistrationForm) => {
		const formData = new FormData()
		if (data.image) {
			formData.append('image', data.image[0])
		}
		formData.append('email', data.email)
		formData.append('password', data.password)
		formData.append('lastName', data.lastName)
		formData.append('firstName', data.firstName)
		formData.append('dateOfBirth', String(data.dateOfBirth))
		if (data.hometown) {
			formData.append('hometown', data.hometown)
		}
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		registration(formData)
	}
	const handleDeleteImage = () => {
		setImage(null)
		if (!inputImageRef.current) return
		inputImageRef.current.value = ''
	}
	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			h="100%"
			w="900px"
			backgroundColor="#EDF2F7"
			borderRadius="10px"
			padding={'25px'}
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
						<Box display="flex" flexDirection={'row'} gap="10px">
							<FormControl
								id={'email'}
								isRequired
								isInvalid={!!errors.email}
								w="300px"
							>
								<FormLabel>Почта</FormLabel>
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
								<FormLabel>Пароль</FormLabel>
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
						</Box>
						<Box display="flex" flexDirection={'row'} gap="10px">
							<FormControl
								id={'lastName'}
								isRequired
								isInvalid={!!errors.lastName}
								w="300px"
							>
								<FormLabel>Фамилия</FormLabel>
								<Input
									type="text"
									{...register('lastName', {
										required: 'Фамилия обязательное поле'
									})}
									backgroundColor={'white'}
									name="lastName"
								/>
								<FormErrorMessage maxW={'100%'}>
									{errors.lastName?.message}
								</FormErrorMessage>
							</FormControl>
							<FormControl
								id={'firstName'}
								isRequired
								isInvalid={!!errors.firstName}
								w="300px"
							>
								<FormLabel>Имя</FormLabel>
								<Input
									type="text"
									{...register('firstName', {
										required: 'Имя обязательное поле'
									})}
									backgroundColor={'white'}
									name="firstName"
								/>
								<FormErrorMessage maxW={'100%'}>
									{errors.firstName?.message}
								</FormErrorMessage>
							</FormControl>
						</Box>
						<Box>
							<FormControl id={'dateOfBirth'} w="100%" isRequired>
								<FormLabel>Дата рождения</FormLabel>
								<Input
									type="date"
									{...register('dateOfBirth')}
									backgroundColor={'white'}
									name="dateOfBirth"
								/>
							</FormControl>
						</Box>
						<Box display="flex" flexDirection={'row'} gap="10px">
							<FormControl id={'university'} w="300px">
								<FormLabel>ВУЗ</FormLabel>
								<Input
									type="text"
									{...register('university')}
									backgroundColor={'white'}
									name="university"
								/>
							</FormControl>
							<FormControl id={'hometown'} w="300px">
								<FormLabel>Город рождения</FormLabel>
								<Input
									type="text"
									{...register('hometown')}
									backgroundColor={'white'}
									name="hometown"
								/>
							</FormControl>
						</Box>
						<Box>
							<FormControl id={'image'} w="100%" isRequired>
								<FormLabel>Загрузите ваш аватар</FormLabel>
								<Input
									type="file"
									{...register('image')}
									backgroundColor={'white'}
									name="image"
									onChange={handleChangeImage}
									ref={inputImageRef}
								/>
							</FormControl>
							{image && (
								<Box mt="4">
									<Avatar src={URL.createObjectURL(image)} />
									<Button onClick={handleDeleteImage}>Удалить аватарку</Button>
								</Box>
							)}
						</Box>
					</Stack>

					<Button
						mt={'15px'}
						variant={'solid'}
						backgroundColor={'skyblue'}
						isDisabled={Object.keys(errors).length > 0}
						type="submit"
						isLoading={isLoading}
					>
						Зарегистрироваться
					</Button>
					<Text fontSize="sm" mt={2}>
						<Button onClick={onClick}>
							Уже есть аккаунт? Авторизуйтесь тут.
						</Button>
					</Text>
				</Box>
			</form>
		</Box>
	)
}
