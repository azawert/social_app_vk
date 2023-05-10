import { useMutation, useQueryClient } from 'react-query'

import { PostService } from '../services/post'

export const useLikePost = () => {
	const client = useQueryClient()
	const { mutate, isSuccess } = useMutation(
		['likePost'],
		(id: number) => PostService.likePost(id),
		{
			onSuccess() {
				client.invalidateQueries('getPostsByUserId')
				client.invalidateQueries('getUserFriendsPosts')
			}
		}
	)
	return {
		mutate,
		isSuccess
	}
}
