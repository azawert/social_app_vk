import { useToast } from '@chakra-ui/react'
import { useMutation } from 'react-query'

import { UserService } from '../services/user'

import useActions from './useActions'

export const useFriendAction = () => {
	const { setUser } = useActions()
	const toast = useToast()

	const { mutate, isLoading } = useMutation(
		'friendAction',
		(id: number) => UserService.userFriendAction({ friendId: id }),
		{
			onSuccess(d) {
				setUser(d)
				toast({
					title: 'Successfully action friend',
					description: 'Great!',
					status: 'success',
					duration: 5000,
					isClosable: true,
					position: 'top-right'
				})
			},
			onError(e: Error) {
				toast({
					title: 'Error',
					description: e.message,
					status: 'error',
					duration: 5000,
					isClosable: true,
					position: 'top-right'
				})
			}
		}
	)
	return { mutate, isLoading }
}
