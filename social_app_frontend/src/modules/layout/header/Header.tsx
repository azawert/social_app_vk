import { Avatar, Box, Flex, Spacer, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { getImageUrl } from '../../../utils/getImageUrl'

export const Header = () => {
	const { user } = useTypedSelector(state => state.rootReducer.authSlice)
	return (
		<Flex bg="gray.100" p="20px" alignItems={'center'}>
			<Text fontSize="xl" fontWeight="bold">
				<Link to="/">В сети</Link>
			</Text>
			<Spacer />
			<Box display="flex" alignItems={'center'}>
				{user?.firstName && user.lastName && (
					<Text mr={'10px'}>
						{user.firstName} {user.lastName}
					</Text>
				)}
				<Link to={`/profile/${user?.id}`}>
					<Avatar src={user?.image ? getImageUrl(user.image) : undefined} />
				</Link>
			</Box>
		</Flex>
	)
}
