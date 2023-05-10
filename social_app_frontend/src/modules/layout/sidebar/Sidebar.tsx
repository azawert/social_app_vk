import { Box, Button, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import useActions from '../../../hooks/useActions'
import { useTypedSelector } from '../../../hooks/useTypedSelector'

import { sideBarData } from './sidebar.data'

export const Sidebar = () => {
	const { user } = useTypedSelector(state => state.rootReducer.authSlice)
	const { logout } = useActions()
	const handleLogoutClick = () => {
		if (window.confirm('Вы уверены что хотите выйти из своего аккаунта?')) {
			localStorage.removeItem('token')
			logout(undefined)
		}
	}
	return (
		<Box
			bg="gray.200"
			w="200px"
			minH="100vh"
			p="20px"
			borderRight="1px"
			borderColor="gray.300"
		>
			<Box>
				<Link to={`/profile/${user?.id}`}>
					<Text>Моя страница</Text>
				</Link>
				{sideBarData.map(data => (
					<Link to={data.linkTo} key={data.label}>
						<Text key={data.linkTo}>{data.label}</Text>
					</Link>
				))}

				<Button
					variant={'unstyled'}
					fontSize={'medium'}
					fontWeight={'normal'}
					m="0"
					p="0"
					display="inline"
					onClick={handleLogoutClick}
				>
					Выйти из аккаунта
				</Button>
			</Box>
		</Box>
	)
}
