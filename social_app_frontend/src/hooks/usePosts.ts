import { useQuery } from 'react-query'

import { PostService } from '../services/post'

export const usePosts = (id: number) => {
	const { data, refetch, isLoading } = useQuery('getPostsByUserId', () =>
		PostService.GetPostsByUserId(id)
	)
	return { data, refetch, isLoading }
}
