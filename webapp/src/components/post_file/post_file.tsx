import React, { useCallback, useState, memo, FunctionComponent } from 'react';
import Styled from './post_file.styled';
import PostFileThumbnail from './post_file_thumbnail/post_file_thumbnail';
import PostFileContent from './post_file_content/post_file_content';
import PostDownloadButton from './post_download_button/post_download_button';
import { Modal } from 'react-bootstrap';
import { Client4 } from 'mattermost-redux/client';
import { FileType } from '@/types/fileType';

interface Props {
  files: Array<FileType>;
}

const PostFile: FunctionComponent<Props> = ({ files }) => {
  const [show, setShow] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewImageId, setPreviewImageId] = useState<string>('');
  const [previewOther, setPreviewOther] = useState<Array<any> | null>(null);

  const getFileThumbnail = useCallback(
    (fileId: string, timestamp: number) => {
      try {
        const res = Client4.getFileThumbnailUrl(fileId, timestamp);
        setPreviewImage(res);
      } catch (err) {
        console.log(err);
      }
    },
    [files],
  );

  const handleClose = useCallback(() => {
    setShow(false);
    setPreviewImage(null);
    setPreviewOther(null);
    setPreviewImageId('');
  }, []);

  const handleShow = useCallback(
    (
      fileId: string,
      fileExtension: string,
      hasPreview: boolean,
      fileName: string,
      timestamp: number,
    ) => {
      if (
        fileExtension === 'jpg' ||
        fileExtension === 'gif' ||
        fileExtension === 'bmp' ||
        fileExtension === 'png' ||
        fileExtension === 'jpeg' ||
        fileExtension === 'tiff' ||
        fileExtension === 'tif'
      ) {
        setPreviewImageId(fileId);
        getFileThumbnail(fileId, timestamp);
      } else {
        setPreviewOther([fileId, fileExtension, hasPreview, fileName]);
      }
      setShow(true);
    },
    [files],
  );

  return (
    <>
      <Styled.MainContainer>
        {files.map((file: FileType, idx: number) => {
          return (
            <Styled.FileContainer key={file.id}>
              <Styled.ContentContainer
                onClick={() => {
                  handleShow(file.id, file.extension, file.has_preview_image, file.name, 0);
                }}
              >
                <PostFileThumbnail
                  fileId={file.id}
                  extension={file.extension}
                  hasPreview={file.has_preview_image}
                />
                <PostFileContent fileContent={file.name} />
              </Styled.ContentContainer>
              <PostDownloadButton fileId={file.id} />
            </Styled.FileContainer>
          );
        })}
      </Styled.MainContainer>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {previewImage && <Styled.PreviewImgContainer src={previewImage} />}
          {previewOther && (
            <Styled.PreviewContentContainer>
              <PostFileThumbnail
                fileId={previewOther[0]}
                extension={previewOther[1]}
                hasPreview={previewOther[2]}
              />
              <PostFileContent fileContent={previewOther[3]} />
            </Styled.PreviewContentContainer>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Styled.PreviewDownloadBtn>
            {previewImage && <PostDownloadButton fileId={previewImageId} />}
            {previewOther && <PostDownloadButton fileId={previewOther[0]} />}
          </Styled.PreviewDownloadBtn>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default memo(PostFile);
