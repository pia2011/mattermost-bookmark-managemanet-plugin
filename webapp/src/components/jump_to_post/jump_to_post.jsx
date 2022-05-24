import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Modal from '../modal/modal'
import Styled from './jump_to_post.styled.jsx'

import { Client4 } from 'mattermost-redux/client';

const JumpToPost = ({ teamName, postId, Refresh, userId, myUserId, openCategoryName, deleteCategoryItem }) => {
  const [isOver, setIsOver] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const onMouseEnter = () => {
    setIsOver(true)
  }

  const onMouseLeave = () => {
    setIsOver(false)
  }

  const openModal = () => {
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
  }

  return (
    <>
      {isOver ?
        <Styled.JumpControls onMouseLeave={onMouseLeave}>
          {openCategoryName !== 'BookMark' &&
            < Styled.TrashIcon
              className='icon icon-trash-can-outline'
              onClick={() => deleteCategoryItem(postId)}
            />
          }
          <Styled.JumpIcon2
            to={`/${teamName}/pl/${postId}`}
          >
            Jump
          </Styled.JumpIcon2>
        </Styled.JumpControls>
        :
        <Styled.JumpIcon
          onMouseEnter={onMouseEnter}
        >
          Jump
        </Styled.JumpIcon>
      }
      <Modal
        open={modalOpen}
        close={closeModal}
        header="Confirm Post Delete"
        Refresh={Refresh}
        postId={postId}
      >
        Are you sure you want to delete this Post?
      </Modal>
    </>
  )
}

export default JumpToPost