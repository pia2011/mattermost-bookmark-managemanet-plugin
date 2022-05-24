import React, { useState, useEffect, useCallback } from 'react';
import Styled from './category.styled';
import Modal from './modal/modal'
import { apiInstance } from '../../libs/axios'

const categoryItem = (props) => {
  const [isOver, setIsOver] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editTitle, setEditTitle] = useState(props.category)
  const [check, setCheck] = useState("")
  const api = apiInstance(props.baseUrl);

  const onMouseEnter = () => {
    setIsOver(true)
  }

  const onMouseLeave = () => {
    setIsOver(false)
  }

  const openModal = (e) => {
    e.stopPropagation();
    setModalOpen(true);
  }

  const closeModal = (e) => {
    e.stopPropagation();
    setModalOpen(false);
  }

  const removeFolder = async (e) => {
    e.stopPropagation();
    setModalOpen(false);
    try {
      await api.delete(`/bookmark/folder/deletion/${props.category}?UserId=${props.myUserId}`);
    } catch (err) {
      console.log(err)
    }
    props.getCategoryList()
  }

  const blockMake = () => {
    setCheck('block')
    setTimeout(() => { setCheck('') }, 2000)
  }

  const editFolder = async (e) => {
    e.stopPropagation();
    try {
      const res = await api.put(`/bookmark/folder/${props.category}/${editTitle}?UserId=${props.myUserId}`)
      if (res.data === 'X') {
        blockMake();
      } else {
        setIsEdit(!isEdit)
        props.getCategoryList()
      }

    } catch (err) {
      console.log(err)
    }
  }

  const isEditState = (e) => {
    e.stopPropagation();
    setIsEdit(!isEdit)
  }

  const inputTextArea = (e) => {
    e.stopPropagation();
    setEditTitle(e.target.value);
  };

  const testFuc = (e) => {
    e.stopPropagation();
  }


  return (
    <>
      {isEdit ?
        <>
          <Styled.FolderBox>
            <Styled.FolderIcon
              className="fa fa-folder fa-lg"
              aria-hidden="true">
            </Styled.FolderIcon>
            <Styled.FolderTitle>
              <div onClick={testFuc}>
                <form>
                  <input
                    type="text"
                    style={{ border: "0 solid rgb(230, 230, 230)", borderBottomWidth: "1px" }}
                    size="26"
                    onChange={inputTextArea}
                    value={editTitle}
                  />
                </form>
              </div>
            </Styled.FolderTitle>
            <Styled.EditControls>
              {editTitle ?
                <Styled.EditButton
                  className='fa fa-check'
                  aria-hidden="true"
                  style={{ color: "green", padding: "3px 7px" }}
                  onClick={editFolder}
                ></Styled.EditButton>
                : null
              }
              <Styled.EditButton
                className="fa fa-times"
                aria-hidden="true"
                style={{ padding: "3px 7px" }}
                onClick={isEditState}
              ></Styled.EditButton>
            </Styled.EditControls>
          </Styled.FolderBox>
          {check !== "" &&
            <Styled.Warning>
              <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>
              <div>Please write a different name.</div>
            </Styled.Warning>
          }
        </>
        :
        <Styled.FolderBox onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
          {props.category === props.openCategoryName ?
            <Styled.FolderIcon className="fa fa-folder-open fa-lg" aria-hidden="true"></Styled.FolderIcon>
            :
            <Styled.FolderIcon className="fa fa-folder fa-lg" aria-hidden="true"></Styled.FolderIcon>
          }
          <Styled.FolderTitle>{props.category}</Styled.FolderTitle>
          {isOver ?
            <Styled.Controls>
              <Styled.EditButton
                className='icon icon-trash-can-outline'
                aria-hidden="true"
                style={{ color: "var(--dnd-indicator)" }}
                onClick={openModal}
              ></Styled.EditButton>
              <Styled.EditButton
                className="icon-pencil-outline"
                aria-hidden="true"
                onClick={isEditState}
              ></Styled.EditButton>
            </Styled.Controls> : null
          }
          <Modal
            open={modalOpen}
            close={closeModal}
            header="Confirm Category Delete"
            removeFolder={removeFolder}
          >
            Are you sure you want to delete this Category?
          </Modal>
        </Styled.FolderBox>
      }

    </>

  )
};

export default categoryItem;
