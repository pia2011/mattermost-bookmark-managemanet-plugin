import React, { useState, useEffect } from 'react';
import Styled from './category.styled';
import CategoryItem from './category_item'
import { apiInstance } from '../../libs/axios'

const category = ({ dragDrop, getCategoryFile, myUserId, getFlagged, baseUrl }) => {
  const [categoryList, setCategoryList] = useState(null)
  const [categoryTitle, setCategoryTitle] = useState("")
  const [isAdd, setIsAdd] = useState(false)
  const [openCategoryName, setOpenCategoryName] = useState(null)
  const [check, setCheck] = useState("")
  const api = apiInstance(baseUrl);

  const getCategoryList = async () => {
    setCategoryList(null)
    try {
      const res = await api.get(`/bookmark/folder/list?UserId=${myUserId}`);
      createList(res.data.Items)
    } catch (err) {
      console.log(err)
    }
  };

  const createList = (lst) => {
    if (lst.length !== 0) {
      let temp = []
      for (let i = 0; i < lst.length; i++) {
        temp.push(lst[i].FolderName)
      }
      setCategoryList(temp)
    }
  }

  const dragEnter = (e) => {
    e.persist();
    e.target.style.borderColor = 'blue';
  };

  const dragLeave = (e) => {
    e.persist();
    e.target.style.borderColor = '';
  };

  useEffect(() => {
    getCategoryList()
  }, [myUserId])

  const inputTextArea = (e) => {
    setCategoryTitle(e.target.value);
  };

  const clickAdd = (e) => {
    setIsAdd(!isAdd)
    setCategoryTitle("")
  }

  const openCategory = (category) => {
    setOpenCategoryName(category)
  }

  const postCategory = async () => {
    try {
      const res = await api.post(`/bookmark/folder/creation/${categoryTitle}?UserId=${myUserId}`)
      if (res.data === 'X') {
        blockMake();
      } else {
        clickAdd();
        getCategoryList();
      }
    } catch (err) {
      console.log(err)
    }
  }

  const blockMake = () => {
    setCheck('block')
    setTimeout(() => { setCheck('') }, 2000)
  }

  return (
    <div>
      <div onClick={() => getFlagged(myUserId)}>
        <Styled.FolderBox onClick={() => openCategory(null)}>
          {openCategoryName === null ?
            <Styled.FolderIcon className="fa fa-folder-open fa-lg" aria-hidden="true"></Styled.FolderIcon>
            :
            <Styled.FolderIcon className="fa fa-folder fa-lg" aria-hidden="true"></Styled.FolderIcon>
          }
          <Styled.FolderTitle>...</Styled.FolderTitle>
        </Styled.FolderBox>
      </div>
      {categoryList !== null && (
        categoryList.map((category, key) => {
          return (
            <div onClick={() => openCategory(category)}>
              <div onDrop={(e) => dragDrop(e, category)} onDragEnter={dragEnter} onDragLeave={dragLeave} onClick={() => getCategoryFile(category)}>
                <CategoryItem
                  key={key}
                  category={category}
                  myUserId={myUserId}
                  openCategoryName={openCategoryName}
                  getCategoryList={getCategoryList}
                  setCheck={setCheck}
                  categoryList={categoryList}
                  blockMake={blockMake}
                  baseUrl={baseUrl}
                />
              </div>
            </div>
          )
        }))
      }
      <div>
        {isAdd &&
          <>
            <Styled.FolderBox>
              <Styled.FolderIcon className="fa fa-folder fa-lg" aria-hidden="true"></Styled.FolderIcon>
              <Styled.FolderTitle>
                <div>
                  <input
                    type="text"
                    style={{ border: "0 solid rgb(230, 230, 230)", borderBottomWidth: "1px" }}
                    size="26"
                    onChange={inputTextArea}
                    placeholder={"Enter the category name"}
                  />

                </div>
              </Styled.FolderTitle>
              {categoryTitle !== "" && categoryTitle !== "BookMark" &&
                <Styled.CreateButton onClick={postCategory}>create</Styled.CreateButton>
              }
            </Styled.FolderBox>
            {categoryTitle === "BookMark" &&
              <Styled.Warning>
                <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>
                <div>"BookMark" is the default folder name. Please write a different name.</div>
              </Styled.Warning>
            }
            {check !== "" &&
              <Styled.Warning>
                <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>
                <div>Please write a different name.</div>
              </Styled.Warning>
            }
          </>

        }

        {
          isAdd ?
            <Styled.AddButton onClick={clickAdd}>
              <i style={{ color: 'rgb(255, 255, 255)' }} className="fa fa-minus" aria-hidden="true"></i>
            </Styled.AddButton>
            :
            <Styled.AddButton onClick={clickAdd}>
              <i style={{ color: 'rgb(255, 255, 255)' }} className="fa fa-plus" aria-hidden="true"></i>
            </Styled.AddButton>
        }
      </div>
    </div>
  );
};

export default category;
