import React, { FunctionComponent } from 'react';
import Styled from './post_file_content.styled';

interface Props {
  fileContent: string;
}

const PostFileContent: FunctionComponent<Props> = ({ fileContent }) => {
  return <Styled.MainContainer>{fileContent}</Styled.MainContainer>;
};

export default React.memo(PostFileContent);
