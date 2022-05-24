import styled from 'styled-components';

const MiddleLine = styled.div`
  border: 3px solid rgb(170, 170, 170);
  cursor: 'pointer';
  transition: all ease 0.2s;
  &:hover {
    transition: all ease 0.2s;
    border: 3px solid rgb(216, 216, 216);
  }
`;

const FolderIcon = styled.i`
  color: rgb(170, 170, 170);
`;

const FolderTitle = styled.div`
  display: inline-block;
  margin: 5px 10px;
`;

const NoResultContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

export default { MiddleLine, FolderIcon, FolderTitle, NoResultContainer };
