import { api } from '../api'
import {
	IPost,
	IRequestPostCreation,
	IResponsePostCreation
} from '../types/authenticate.type'

export const PostService = {
	async createPost(data: IRequestPostCreation): Promise<IResponsePostCreation> {
		const resp = await api.post('/posts/create-post', data)
		return resp.data
	},
	async deletePost(id: number): Promise<void> {
		const resp = await api.delete(`/posts/${id}`)
		return resp.data
	},
	async likePost(id: number): Promise<void> {
		await api.post(`/posts/like/${id}`)
	},
	async GetPostsByUserId(id: number): Promise<IPost[]> {
		const resp = await api.get(`/posts/posts/${id}`)
		return resp.data
	},
	async getUserFriendsPost(): Promise<IPost[]> {
		const resp = await api.get(`/posts/friends-posts`)
		return resp.data
	}
}
