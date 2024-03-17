import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { ApplicationsFromTheForm, Form, Login, Register,  } from './pages';
import { Header } from './components/header/header';

const AppColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	position: relative;
	width: 1000px;
	min-height: 100%;
	margin: 0 auto;
	background-color: #fff;
`;

const Page = styled.div`
	padding: 120px 0 20px;
`;

export const App = ({userName}) => {
	
	return (
		<AppColumn>
			<Page>
				<Header />
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/form" element={<Form />} />
					<Route path="/ApplicationsFromTheForm" element={<ApplicationsFromTheForm />} />
				</Routes>
			</Page>
		</AppColumn>
	);
};

export default App;