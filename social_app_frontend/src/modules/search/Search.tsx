import { Box, Flex, Heading, Input, Text } from '@chakra-ui/react'
import { ChangeEvent, useEffect, useState } from 'react'

import useDebounce from '../../hooks/useDebounce'
import { UserCard } from '../../shared/UserCard'
import { IUser } from '../../types/authenticate.type'

import { useSearchUsers } from './hooks/useSearchUsers'

export const Search = () => {
	const [nameValue, setNameValue] = useState('')
	const [lastNameValue, setLastNameValue] = useState('')
	const { data, isLoading, refetch } = useSearchUsers({
		name: nameValue,
		lastName: lastNameValue
	})
	const [users, setUsers] = useState<IUser[]>(data ? data : [])
	const nameDebouncedValue = useDebounce(nameValue, 800)
	const lastNameDebouncedValue = useDebounce(lastNameValue, 800)
	useEffect(() => {
		setUsers(data ? data : [])
	}, [data])
	useEffect(() => {
		refetch()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [nameDebouncedValue, lastNameDebouncedValue])
	const handleChangeNameInput = (e: ChangeEvent<HTMLInputElement>) => {
		setNameValue(e.target.value)
	}
	const handleChangeLastNameInput = (e: ChangeEvent<HTMLInputElement>) => {
		setLastNameValue(e.target.value)
	}

	return (
		<Box>
			<Box mb={'10px'}>
				<Heading as="h2" size="lg" mb="4">
					Люди: {users.length}
				</Heading>
				<Box>
					<Flex w={'75%'}>
						<Input
							mr={'10px'}
							onChange={handleChangeNameInput}
							value={nameValue}
							placeholder="Введите имя"
						/>
						<Input
							onChange={handleChangeLastNameInput}
							value={lastNameValue}
							placeholder="Введите фамилию"
						/>
					</Flex>
				</Box>
			</Box>
			{users.length > 0 ? (
				users.map(user => (
					<UserCard key={user.id} userInCard={user} isLoading={isLoading} />
				))
			) : (
				<Text>Людей по заданным данным не найдено</Text>
			)}
		</Box>
	)
}
