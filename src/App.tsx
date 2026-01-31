import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ThemeProvider from './context/ThemeContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home.tsx';
import About from './pages/About.tsx';
import Projects from './pages/Projects.tsx';
import ProjectDetail from './pages/ProjectDetail.tsx';
import Blog from './pages/Blog.tsx';
import Personal from './pages/Personal.tsx';
import Contact from './pages/Contact.tsx';
import NotFound from './pages/NotFound.tsx';
import ScrollRestoration from './components/ui/ScrollRestoration.tsx';

function App() {
	return (
		<ThemeProvider>
			<Router>
				<ScrollRestoration />
				<Layout>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/home" element={<Navigate to="/" />} />
						<Route path="/about" element={<About />} />
						<Route path="/projects" element={<Projects />} />
						<Route path="/projects/:id" element={<ProjectDetail />} />
						<Route path="/blog" element={<Blog />} />
						<Route path="/personal" element={<Personal />} />
						<Route path="/contact" element={<Contact />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</Layout>
			</Router>
		</ThemeProvider>
	);
}

export default App;
