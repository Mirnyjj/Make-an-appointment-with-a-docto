import styled from 'styled-components';

const PaginationContainer = ({ className, page, lastPage, setPage }) => {
	return (
		<div className={className}>
			<button disabled={page === 1} onClick={() => setPage(1)}>
				В начало
			</button>
			<button disabled={page === 1} onClick={() => setPage(page - 1)}>
				Предыдущая
			</button>
			<div className="current-page">Страница: {page}</div>
			<button disabled={page === lastPage} onClick={() => setPage(page + 1)}>
				Следующая
			</button>
			<button disabled={page === lastPage} onClick={() => setPage(lastPage)}>
				В конец
			</button>
		</div>
	);
};

export const Pagination = styled(PaginationContainer)`
	display: flex;
	justify-content: center;
	width: 100%;

	& button {
		padding: 5px;
		font-size: 20px;
		border-radius: 5px;
		background-color: #d9eee6;
		border: 1px solid #aba8a8;
		color: #000;
		margin-right: 10px;
	}

	& .current-page {
		width: 300px;
		height: 32px;
		margin: 0px 5px;
		font-size: 18px;
		font-weight: 500;
		line-height: 26px;
		text-align: center;
		border: 1px solid #000;
	}
`;
