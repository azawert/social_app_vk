import { useQuery } from 'react-query'

import { IQuerySearchUser, UserService } from '../../../services/user'

export const useSearchUsers = (query?: IQuerySearchUser) => {
	const { data, refetch, isLoading } = useQuery(
		['getUsersByNameAndLastName'],
		() => UserService.userSearchByName(query ? query : undefined)
	)
	return { data, refetch, isLoading }
}
