import { Box, Flex } from '@chakra-ui/react'
import { FC, PropsWithChildren, useEffect } from 'react'
import { Navigate } from 'react-router-dom'

import useActions from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { AuthPage } from '../../pages/AuthPage'
import { useUserByToken } from '../profile/hooks/getUserByToken'

import { Header } from './header/Header'
import { Sidebar } from './sidebar/Sidebar'

interface ILayoutProps extends PropsWithChildren {
	link?: string
}
export const Layout: FC<ILayoutProps> = ({ children }) => {
	const { setToken } = useActions()
	const { token } = useTypedSelector(state => state.rootReducer.authSlice)
	const { refetch } = useUserByToken()
	const tokenInLs = localStorage.getItem('token')
	useEffect(() => {
		if (tokenInLs) {
			setToken(tokenInLs)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	useEffect(() => {
		if (token) {
			refetch()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token])
	if (!token && !tokenInLs) {
		return (
			<>
				<Header />
				<AuthPage />
				<Navigate to="/auth" />
			</>
		)
	}
	return (
		<Flex direction="column" overflow={'hidden'}>
			<Header />
			<Flex flex="1">
				{token ? (
					<Box w="20%">
						<Sidebar />
					</Box>
				) : null}
				<Box w="80%" p="20px" h={'900px'} overflowY="auto">
					{children}
				</Box>
			</Flex>
		</Flex>
	)
}
