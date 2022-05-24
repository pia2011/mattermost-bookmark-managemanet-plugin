import React, { FunctionComponent, useCallback } from 'react';
import { Client4 } from 'mattermost-redux/client';
import Styled from './post_download_button.styled';
import DownloadBtn from '@/../images/downloadBtn.png';

interface Props {
  fileId: string;
}

const PostDownloadButton: FunctionComponent<Props> = ({ fileId }) => {
  const getFileDownloadUrl = useCallback(
    (id: string) => {
      return `${Client4.getFileRoute(id)}?download=1`;
    },
    [fileId],
  );

  return (
    <Styled.MainContainer href={getFileDownloadUrl(fileId)}>
      <img src={DownloadBtn} />
    </Styled.MainContainer>
  );
};

export default PostDownloadButton;
