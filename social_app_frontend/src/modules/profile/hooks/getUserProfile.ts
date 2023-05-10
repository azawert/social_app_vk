import { useQuery } from 'react-query'

import { UserService } from '../../../services/user'

export const useProfile = (id: number) => {
	const { data, isLoading } = useQuery(
		['getUser', id],
		() => UserService.getUserInfo(id),
		{ enabled: !!id, retry: false }
	)
	return { data, isLoading }
}
