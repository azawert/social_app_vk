import { useToast } from '@chakra-ui/react'
import { useMutation, useQueryClient } from 'react-query'

import { PostService } from '../services/post'

export const useDeletePost = () => {
	const toast = useToast()
	const queryClient = useQueryClient()
	const { mutate, isLoading } = useMutation(
		['deletePost'],
		(id: number) => PostService.deletePost(id),
		{
			onSuccess() {
				toast({
					title: 'Successfully deleted post',
					description: 'Great!',
					status: 'success',
					duration: 5000,
					isClosable: true,
					position: 'top-right'
				})
				queryClient.invalidateQueries('getPostsByUserId')
				queryClient.invalidateQueries('getUserFriendsPosts')
			}
		}
	)
	return { mutate, isLoading }
}
