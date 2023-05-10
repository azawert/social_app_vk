import {
	Box,
	Button,
	Flex,
	Input,
	Stack,
	Text,
	Textarea
} from '@chakra-ui/react'
import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'

import { useCreatePost } from '../../hooks/useCreatePost'
import { useDeletePost } from '../../hooks/useDeletePost'
import { useLikePost } from '../../hooks/useLikePost'
import { Post } from '../../shared/Post'

import { useGetPosts } from './hooks/useGetPosts'

export const News: FC = () => {
	const { data, refetch } = useGetPosts()
	const { mutate: deletePost } = useDeletePost()
	const { mutate: likePost } = useLikePost()
	const { mutate: createPost, isSuccess } = useCreatePost()
	const handleUpdateNewsClick = () => {
		refetch()
	}
	const [newPostDescription, setNewPostDescription] = useState('')
	const [image, setImage] = useState<File | null>(null)
	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setNewPostDescription(e.target.value)
	}
	const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return
		const file = e.target.files[0]
		setImage(file)
	}
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()
		const formData = new FormData()
		formData.append('description', newPostDescription)
		if (image) {
			formData.append('image', image)
		}
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		createPost(formData)
	}
	useEffect(() => {
		setImage(null)
		setNewPostDescription('')
	}, [isSuccess])
	return (
		<Box>
			<Text fontSize="3xl" mb="4">
				Мои новости
			</Text>
			<Button onClick={handleUpdateNewsClick} colorScheme="blue">
				Обновить новости
			</Button>
			<Box mt="4">
				<form onSubmit={handleSubmit}>
					<Textarea
						name="body"
						placeholder="Текст поста"
						value={newPostDescription}
						onChange={handleChange}
						mb="2"
					/>
					<Flex justifyContent={'space-between'} alignItems={'center'}>
						<input type="file" onChange={handleChangeImage} />
						<Button type="submit" colorScheme="blue">
							Создать пост
						</Button>
					</Flex>
				</form>
			</Box>
			<Stack spacing="4" mt="4">
				{data?.map(post => (
					<Post
						post={post}
						deleteClick={deletePost}
						likeClick={likePost}
						key={post.id}
					/>
				))}
			</Stack>
		</Box>
	)
}
