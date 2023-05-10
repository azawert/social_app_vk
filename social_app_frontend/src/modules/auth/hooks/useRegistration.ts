import { useToast } from '@chakra-ui/react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'

import useActions from '../../../hooks/useActions'
import { AuthenticateService } from '../../../services/authenticate'
import { IResponseRegistration } from '../../../types/authenticate.type'
import { IRegistrationForm } from '../Registration'

export const useRegistration = () => {
	const { setToken, setUser } = useActions()
	const toast = useToast()
	const navigate = useNavigate()
	const { mutate, isError, isLoading } = useMutation<
		IResponseRegistration,
		Error,
		IRegistrationForm
	>(['registration'], data => AuthenticateService.registration(data), {
		onSuccess(d) {
			setUser(d.createdUser)
			setToken(d.token)
			localStorage.setItem('token', d.token)
			toast({
				title: 'Successfully registered',
				description: 'Great!',
				status: 'success',
				duration: 5000,
				isClosable: true,
				position: 'top-right'
			})
			navigate(`/profile/${d.createdUser.id}`)
		},
		onError(e) {
			toast({
				title: 'Error while registration',
				description: e.message,
				status: 'error',
				duration: 5000,
				isClosable: true,
				position: 'top-right'
			})
		}
	})
	return { mutate, isError, isLoading }
}
