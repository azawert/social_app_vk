import { Box, FormControl, Input, Stack, Text } from '@chakra-ui/react'
import { ChangeEvent, FC, useEffect, useState } from 'react'

import useDebounce from '../../hooks/useDebounce'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { UserCard } from '../../shared/UserCard'
import { IFriendUser } from '../../types/authenticate.type'

export const Friends: FC = () => {
	const { user } = useTypedSelector(state => state.rootReducer.authSlice)
	const [searchValue, setSearchValue] = useState('')
	const [friends, setFriends] = useState<IFriendUser[] | undefined>(
		user?.friends
	)
	const debouncedSearchValue = useDebounce(searchValue, 800)
	const handleSearchValueChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value)
	}
	useEffect(() => {
		if (debouncedSearchValue.length === 0) {
			setFriends(user?.friends)
		} else {
			setFriends(
				user?.friends.filter(friend =>
					friend.firstName.match(debouncedSearchValue)
				)
			)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedSearchValue])
	useEffect(() => {
		setFriends(user?.friends)
	}, [user?.friends])

	if (!user) {
		return <Text>Проблема с получением пользователя</Text>
	}
	return (
		<Box>
			<Text fontSize="3xl" mb="4">
				Мои друзья {friends?.length}
			</Text>
			<FormControl mb="4">
				<Input
					id="search"
					placeholder="Введите имя друга"
					value={searchValue}
					onChange={handleSearchValueChange}
				/>
			</FormControl>
			<Stack spacing="4">
				{friends &&
					friends?.map(friend => {
						return <UserCard userInCard={friend} key={friend.id} />
					})}
			</Stack>
		</Box>
	)
}
