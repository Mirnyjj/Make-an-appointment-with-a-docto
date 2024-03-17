import styled from 'styled-components';

const SearchContainer = ({ className, searchPhrase, onChange }) => {
	return (
		<div className={className}>
			<input
				value={searchPhrase}
				placeholder="Поиск по фамилии..."
				onChange={onChange}
			/>
		</div>
	);
};

export const Search = styled(SearchContainer)`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 500px;
	height: 40px;
	margin: 40px auto 0;

	& > input {
		padding: 10px 32px 10px 10px;
		width: 300px;
	}

	& > div {
		position: absolute;
		top: 3px;
		right: 9px;
	}
`;

