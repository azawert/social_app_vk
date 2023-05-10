import { useToast } from '@chakra-ui/react'
import { useQuery } from 'react-query'

import { PostService } from '../../../services/post'

export const useGetPosts = () => {
	const toast = useToast()
	const { data, refetch, isLoading } = useQuery(
		'getUserFriendsPosts',
		PostService.getUserFriendsPost,
		{
			onError(e: Error) {
				toast({
					title: 'Error while registration',
					description: e.message,
					status: 'error',
					duration: 5000,
					isClosable: true,
					position: 'top-right'
				})
			}
		}
	)
	return { data, refetch, isLoading }
}
