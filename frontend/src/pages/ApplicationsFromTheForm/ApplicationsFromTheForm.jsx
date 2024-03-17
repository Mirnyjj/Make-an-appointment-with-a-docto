import { useEffect, useMemo, useState } from "react";
import { styled } from "styled-components";
import { request } from "../../../request";
import { PAGINATION_LIMIT } from "../../constants";
import { debounce } from "./utils";
import { Pagination, Search } from "./components";


const ApplicationsFromTheFormContainer = ({className}) => {
        const [form, setForm] = useState([]);
        const [page, setPage] = useState(1);
        const [lastPage, setLastPage] = useState(1);
        const [searchPhrase, setSearchPhrase] = useState('');
        const [shouldSearch, setShouldSearch] = useState(false);
    
        useEffect(() => {
            request(`/form?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`).then(
                ({ data: { forms, lastPage } }) => {
                    setForm(forms);
                    setLastPage(lastPage);
                },
            );
        }, [page, shouldSearch]);
    
        const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);
    
        const onSearch = ({ target }) => {
            setSearchPhrase(target.value);
            startDelayedSearch(!shouldSearch);
        };
    
        return (
            <div className={className}>
                    <div className="title">Заявки с формы</div>
                <div className="form-and-search">
                    <Search searchPhrase={searchPhrase} onChange={onSearch} />
                    {form ? (
                        <div className="form-list">
                                    <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Дата отправки</th>
                                            <th>ФИО</th>
                                            <th>Телефон</th>
                                            <th>Проблема</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                            {form.map(
                                ({ id, publishedAt, name, telephone, title}) => (
                                        <tr key={id}>
                                            <td>{publishedAt}</td>
                                            <td>{name}</td>
                                            <td>{telephone}</td>
                                            <td>{title}</td>
                                        </tr>
                                ),
                                )}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="no-forms-found">Формы не найдены</div>
                    )}
                </div>
                {lastPage > 1 && form && (
                    <Pagination page={page} lastPage={lastPage} setPage={setPage} />
                )}
            </div>
        );
    };
    
    export const ApplicationsFromTheForm = styled(ApplicationsFromTheFormContainer)`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    

    
        & .form-list {
            display: flex;
            flex-wrap: wrap;
            padding: 20px 20px 80px;
        }
    
        & .no-forms-found {
            font-size: 18px;
            margin-top: 40px;
            text-align: center;
        }
        .table {
            margin-bottom: 20px;
            border: 1px solid #dddddd;
            border-collapse: collapse; 
        }
        .table th {
            width: 500px;
            font-weight: bold;
            padding: 5px;
            background: #efefef;
            font-size: 20px;
            border: 1px solid #dddddd;
        }
        .table td {
            text-align: center;
            border: 1px solid #dddddd;
            padding: 5px;
            width: 500px;
            word-break: break-word;
        }
    `;