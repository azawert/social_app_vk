import { useToast } from '@chakra-ui/react'
import { useMutation, useQueryClient } from 'react-query'

import { PostService } from '../services/post'
import { IRequestPostCreation } from '../types/authenticate.type'

export const useCreatePost = () => {
	const client = useQueryClient()
	const toast = useToast()
	const { mutate, isLoading, isSuccess } = useMutation(
		['createPost'],
		(data: IRequestPostCreation) => PostService.createPost(data),
		{
			onSuccess() {
				toast({
					title: 'Successfully created post',
					description: 'Great!',
					status: 'success',
					duration: 5000,
					isClosable: true,
					position: 'top-right'
				})
				client.invalidateQueries('getPostsByUserId')
				client.invalidateQueries('getUserFriendsPosts')
			}
		}
	)
	return { mutate, isLoading, isSuccess }
}
