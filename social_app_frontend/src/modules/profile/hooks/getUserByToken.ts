import { useQuery } from 'react-query'

import useActions from '../../../hooks/useActions'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { UserService } from '../../../services/user'

export const useUserByToken = () => {
	const { token, user } = useTypedSelector(state => state.rootReducer.authSlice)
	const { setUser } = useActions()

	const { isLoading, data, refetch } = useQuery(
		['userByToken'],
		UserService.getUserInfoByToken,
		{
			onSuccess(d) {
				user ? null : setUser(d)
			},
			enabled: !!token
		}
	)
	return { data, isLoading, refetch }
}
