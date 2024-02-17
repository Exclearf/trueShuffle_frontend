import styled from "styled-components";

const SearchStyled = styled.div`
  grid-area: search;
  padding: 0px 0px 30px 0px; 
  input{
    padding: 10px;
    font-size: 20px;
    width: 100%;
    height: 100%;
    background: #171616;
    border: none;
    border-bottom: 4px solid rgb(36, 36, 36);
    border-radius: 0px 0px 15px 15px;
    transition: all ease-in-out 250ms;
    font-size: 3rem;
    color: #ebe1e1;
  }
  input:focus{
    background: rgb(36, 36, 36);
    outline: none;
    border: none;
    border-bottom: 4px solid rgba(248, 237, 255, 0.5);
  }
`;

export default SearchStyled;
