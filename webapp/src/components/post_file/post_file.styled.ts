import styled from 'styled-components';

const MainContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin-top: 10px;
  overflow: hidden;
`;

const FileContainer = styled.button`
  display: flex;
  flex-flow: row nowrap;
  width: 280px;
  margin-bottom: 0.3vh;
  margin-left: 0.3vw;
  height: 6.4rem;
  align-items: center;
  justify-content: space-between;
  border: 1px solid rgba(61, 60, 64, 0.16);
  background: #fff;
  border-radius: 4px;
  color: #3d3c40;
  cursor: pointer;
  overflow: hidden;
  box-shadow: 0;
  transition: box-shadow 0.15s ease;
  &:hover {
    box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.5);
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin-left: 0.5rem;
  width: 80%;
  overflow: hidden;
`;

const PreviewContentContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  overflow: hidden;
  min-height: 8vh;
`;

const PreviewImgContainer = styled.img`
  width: 100%;
  height: 100%;
`;

const PreviewDownloadBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default {
  MainContainer,
  FileContainer,
  ContentContainer,
  PreviewImgContainer,
  PreviewDownloadBtn,
  PreviewContentContainer,
};
