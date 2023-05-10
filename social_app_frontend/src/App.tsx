import { ChakraProvider } from '@chakra-ui/react'
import { useEffect } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Layout } from './modules/layout/Layout'
import { AuthPage } from './pages/AuthPage'
import { FriendPage } from './pages/FriendPage'
import { HomePage } from './pages/HomePage'
import { ProfilePage } from './pages/ProfilePage'
import { SearchPage } from './pages/SearchPage'
import store from './store/store'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
})
function App() {
	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<ChakraProvider>
					<BrowserRouter>
						<Layout>
							<Routes>
								<Route path="/profile/:id" element={<ProfilePage />} />
								<Route path="/auth" element={<AuthPage />} />
								<Route path="/search" element={<SearchPage />} />
								<Route path="/my-friends" element={<FriendPage />} />
								<Route path="/news-feed" element={<HomePage />} />
							</Routes>
						</Layout>
					</BrowserRouter>
				</ChakraProvider>
			</QueryClientProvider>
		</Provider>
	)
}

export default App
