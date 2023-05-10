import {
	Avatar,
	Box,
	Button,
	Divider,
	Flex,
	Skeleton,
	SkeletonCircle,
	Text
} from '@chakra-ui/react'
import { FC } from 'react'
import { Link } from 'react-router-dom'

import { useFriendAction } from '../hooks/useFriendAction'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { IFriendUser, IUser } from '../types/authenticate.type'
import { getImageUrl } from '../utils/getImageUrl'

interface IUserCardProps {
	userInCard: IUser | IFriendUser
	isLoading?: boolean
}

export const UserCard: FC<IUserCardProps> = ({ userInCard, isLoading }) => {
	const { user } = useTypedSelector(state => state.rootReducer.authSlice)
	const isCardOfCurrentUser = user?.id === userInCard.id
	const isUserAlreadyInFriendList = user?.friends.some(
		friend => friend.id === userInCard.id
	)
	const { mutate: friendAction, isLoading: isFriendActionLoading } =
		useFriendAction()
	const handleFriendButtonClick = () => {
		friendAction(userInCard.id)
	}
	if (isLoading) {
		return (
			<Box
				borderWidth="1px"
				borderRadius="lg"
				overflow="hidden"
				padding="4"
				mb={'20px'}
			>
				<Skeleton height="20px" mb={2} />
				<Skeleton height="20px" mb={2} />
				<Skeleton height="20px" mb={4} />
				<Divider my={4} />
				<Skeleton height="20px" mb={4} />
				<Skeleton height="100px" mb={4} />
			</Box>
		)
	}
	return (
		userInCard && (
			<Box
				borderWidth="1px"
				borderRadius="lg"
				overflow="hidden"
				padding="4"
				mb={'20px'}
			>
				<Flex justifyContent={'space-between'} alignItems={'center'}>
					<Flex
						alignItems="center"
						flexDirection={'column'}
						justifyContent={'center'}
					>
						<Link to={`/profile/${userInCard.id}`}>
							<Avatar size="md" mr="4" src={getImageUrl(userInCard.image)} />

							<Text fontSize="xl" fontWeight="bold">
								{userInCard.firstName} {userInCard.lastName}
							</Text>
						</Link>

						<Box mt="1">
							<Text fontSize="md">{userInCard.hometown}</Text>

							<Text fontSize="md">{userInCard.university}</Text>
						</Box>
					</Flex>

					{!isCardOfCurrentUser && (
						<Button
							onClick={handleFriendButtonClick}
							isLoading={isFriendActionLoading}
							mt="4"
						>
							{isUserAlreadyInFriendList
								? 'Удалить из друзей'
								: 'Добавить в друзья'}
						</Button>
					)}
				</Flex>
			</Box>
		)
	)
}
