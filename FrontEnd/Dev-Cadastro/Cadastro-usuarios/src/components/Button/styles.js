import styled from "styled-components";
import { Link } from 'react-router-dom';


export const Button = styled.button`
    border: none;
    background: linear-gradient(180deg, #fe7e5d 0%, #FF6378 100%);
    font-size: 18px;
    color: #fff;
    padding: 16px 32px;
    width: fit-content;
    cursor: pointer;
    border-radius: 30px;

    &:hover{
        opacity: 0.8;
    }

    &:active{
        opacity: 0.5;
    }
`

export const LinkButton = styled(Link)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textOnPrimary};
  border: 2px solid #fff;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: bold;
  text-decoration: none;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.textOnPrimary};
    color: ${({ theme }) => theme.colors.primary};
    border: 2px solid ${({ theme }) => theme.colors.primary};
  }

  ${({ themeType }) =>
        themeType === 'diferente' &&
        `
      background-color: #fff;
      color: #7978D9;
      border: 2px solid #7978D9;

      &:hover {
        background-color: #7978D9;
        color: #fff;
        border-color: #7978D9;
      }
  `}
`;