import { styled } from 'styled-components'
import { NavLink } from "react-router-dom";

const ButtonPanel = styled.button`
    padding: 5px;
    font-size: 20px;
    border-radius: 5px;
    background-color: #d9eee6;
    border: 1px solid #aba8a8;
    color: #000;
    margin-right: 10px;
    

`;


const PanelBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderConteiner = ({className}) => {
  return (
    <div className={className}>
        <PanelBar>
                    <ButtonPanel>
                        <NavLink to="/ApplicationsFromTheForm">Страница заявок</NavLink>
                    </ButtonPanel>
        </PanelBar>
    </div>
);
}
  export const Header = styled(HeaderConteiner)`
    display: flex;
    justify-content: space-between;
    position: fixed;
    top: 0px;
    width: 1000px;
    height: 60px;
    padding: 20px 40px;
    box-shadow: 0 0px 8px #000;
    background-color: #fff;
    z-index: 10;
`