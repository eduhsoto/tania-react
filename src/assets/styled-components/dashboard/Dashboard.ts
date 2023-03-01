import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from '../login/Login'

export const TopNav = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 100px;
  margin-top: 20px;
`
export const Table = styled.table`
  width: 90%;
  max-width: 100%;
  white-space: nowrap;

  td,
  th,
  tr {
    text-align: center;
  }

  th {
    padding: 8px 20px;
    border: 1px solid var(--secondary_color);
  }

  td {
    border: 1px solid var(--text_color);
  }

  img {
    max-width: 160px;
  }

  th,
  td {
    min-width: 80px;
    max-width: 100px;
    white-space: pre-wrap;
  }
`

export const Wrapper = styled.div`
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const H1 = styled.h1`
  text-align: center;
  margin-top: 50px;
  color: #187575fa;
`
export const LinkEdit = styled(Link)`
  margin-right: 30px;
  background-color: var(--errors);
  border-color: none;
  padding: 4px 4px;
  color: var(--primary_color);
`
export const ButtonDas = styled(Button)`
  padding: 4px 4px;
  font-weight: 600;
`
