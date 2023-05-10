import { useToast } from '@chakra-ui/react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'

import useActions from '../../../hooks/useActions'
import {
	AuthenticateService,
	IRequestAuthentication
} from '../../../services/authenticate'
import { IResponse } from '../../../types/authenticate.type'

export const useAuthenticate = () => {
	const toast = useToast()
	const { setUser, setToken } = useActions()
	const navigate = useNavigate()
	const { mutate, isLoading, isError, data, error } = useMutation<
		IResponse,
		Error,
		IRequestAuthentication
	>(['authentication'], data => AuthenticateService.authenticate(data), {
		onSuccess(d) {
			setToken(d.token)
			setUser(d.user)
			localStorage.setItem('token', d.token)
			toast({
				title: 'Successfully authenticated',
				description: 'Great!',
				status: 'success',
				duration: 5000,
				isClosable: true,
				position: 'top-right'
			})
			navigate(`/profile/${d.user.id}`)
		},
		onError(e) {
			toast({
				title: 'Error while authenticated',
				description: e.message,
				status: 'error',
				duration: 5000,
				isClosable: true,
				position: 'top-right'
			})
		}
	})
	return { data, error, isLoading, isError, mutate }
}
