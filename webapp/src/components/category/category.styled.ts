import styled from 'styled-components';

const FolderBox = styled.div`
  position: relative;
  overflow: hidden;
  border: 1px solid;
  border-color: rgba(63, 67, 80, 0.15);
  border-radius: 4px;
  max-width: 100%;
  height: auto;
  margin: 8px 0;
  padding: 14px 10px;
  box-shadow: var(--elevation-1);
  background-color: transparent;
  transition: all ease 0.4s;
  cursor: pointer;
  &:hover {
    transition: all ease 0.3s;
    background-color: rgba(var(--center-channel-color-rgb), 0.05);
  }
`;

const FolderIcon = styled.i`
  color: rgb(170, 170, 170);
`;

const FolderTitle = styled.div`
  display: inline-block;
  margin: 5px 10px;
`;

const AddButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  right: 35px;
  z-index: 999;
  width: 30px;
  height: 30px;
  background: rgb(188, 188, 188);
  border-radius: 50%;
  opacity: 0.9;
  margin: auto;
  cursor: pointer;
  transition: all ease 0.3s;
  &:hover {
    transition: all ease 0.3s;
    background-color: rgba(var(--center-channel-color-rgb), 0.2);
  }
`;

const ButtonBox = styled.div`
  top: 35%;
  right: 10px;
  position: absolute;
`;

const EditButton = styled.i`
  color: rgb(170, 170, 170);
  padding: 2px;
  border: 1px solid transparent;
  background-color: transparent;
  border-radius: 4px;
  &:hover {
      background-color: rgba(var(--center-channel-color-rgb), 0.08);
  }
`;

const Controls = styled.div`
    background-color: var(--center-channel-bg);
    box-shadow: var(--elevation-1);
    display: flex;
    justify-content: flex-end;
    border-radius: 4px;
    position: absolute;
    top: 20%;
    right: 9px;
    font-size: 13px;
    white-space: normal;
    z-index: 6;
    padding: 4px;
    border: 1px solid transparent;
    border-color: rgba(63, 67, 80, 0.2);
`

const EditControls = styled.div`
    background-color: var(--center-channel-bg);
    box-shadow: var(--elevation-1);
    display: flex;
    justify-content: flex-end;
    border-radius: 4px;
    position: absolute;
    top: 25%;
    right: 9px;
    font-size: 13px;
    white-space: normal;
    z-index: 6;
    padding: 4px;
    border: 1px solid transparent;
    border-color: rgba(63, 67, 80, 0.2);
`

const CreateButton = styled.button`
  background-color: rgb(56, 111, 229);
  color: white;
  border-radius: 4px;
  border: 1px solid transparent;
  &:hover {
      background-color: rgb(46, 101, 219);
  }
`

const Warning = styled.div`
    background-color: var(--center-channel-bg);
    box-shadow: var(--elevation-1);
    display: flex;
    justify-content: center; 
    border-radius: 4px;
    font-size: 13px;
    white-space: normal;
    z-index: 6;
    padding: 4px;
    border: 1px solid transparent;
    border-color: rgba(63, 67, 80, 0.2);
    color: grey; 
`



export default { FolderBox, FolderIcon, FolderTitle, AddButton, ButtonBox, EditButton, Controls, EditControls, CreateButton, Warning };
