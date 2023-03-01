import styled from 'styled-components'

export const Group = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const Image = styled.img`
  width: 80%;
`

export const ALink = styled.a`
  padding: 10px 10px;
  width: 50%;
  text-align: center;
  border: 1px solid var(--complementary_color);
  color: var(--complementary_color);
  border-radius: 5px;
  transition: 0.3s;
  text-decoration: none;
  margin: 20px 0px;
  font-weight: 600;

  &:hover {
    background-color: var(--complementary_color);
    color: var(--primary_color);
  }
`
