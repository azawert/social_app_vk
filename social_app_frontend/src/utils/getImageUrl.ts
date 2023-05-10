export const getImageUrl = (
	imageName: string | undefined
): string | undefined => {
	if (imageName) return `http://localhost:5000/uploads/${imageName}`
	return undefined
}
