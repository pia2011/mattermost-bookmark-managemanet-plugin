import React, { useState, useEffect } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import Category from "../category/category";
import PostCard from '../post_card/post_card'
import Styled from './rhs_view.styled';
import { Client4 } from 'mattermost-redux/client';
import { apiInstance } from '../../libs/axios'
import { getConfig } from 'mattermost-redux/selectors/entities/general';

const RHSView = () => {
  const [posts, setPosts] = useState(null);
  const [myUserId, setMyUserId] = useState(null);
  const [dragItem, setDragItem] = useState([]);
  const [control, setControl] = useState(false);
  const [startPos, setStartPos] = useState(false);
  const [topHeight, setTopHeight] = useState('40%')
  const [bottomHeight, setBottomHeight] = useState('55%')
  const [openCategoryName, setOpenCategoryName] = useState(null)
  const baseUrl = getConfig(store.getState()).SiteURL + `/plugins/category`
  const api = apiInstance(baseUrl);


  const getMyUser = async () => {
    try {
      const res = await Client4.getMe();
      setMyUserId(res.id)
    } catch (err) {
      console.log(err)
    }
  };

  const getFlagged = async (userId) => {
    try {
      const res = await Client4.getFlaggedPosts(userId);
      setOpenCategoryName('BookMark')
      setPosts(res.order)
    } catch (err) {
      console.log(err)
    }
  };

  const getCategoryFile = async (category) => {
    const tmp = []
    try {
      const res = await api.get(`/bookmark/message/list/${category}?UserId=${myUserId}`);
      if (res.data.Items.length > 0) {
        res.data.Items.forEach(item =>
          tmp.push(item.PostId)
        )
        setPosts(tmp)
        setOpenCategoryName(category)
      } else {
        setPosts(null)
        setOpenCategoryName(category)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const deleteCategoryItem = async (getPostId) => {
    try {
      await api.delete(`/bookmark/message/deletion/${openCategoryName}/${getPostId}?UserId=${myUserId}`);
      getCategoryFile(openCategoryName);
    } catch (err) {
      console.log(err)
    }
  }

  const Refresh = () => {
    getFlagged(myUserId)
  }

  const divMouseDown = (e) => {
    setStartPos(e.clientY)
    setControl(true);
  }

  const divMouseUp = (e) => {
    setControl(false);
  }

  const divMouseMove = (e) => {
    if (control) {
      let diff = startPos - e.clientY
      setTopHeight(prev => `${document.getElementById("top").clientHeight - diff}px`)
      setBottomHeight(prev => `${document.getElementById("bottom").clientHeight + diff}px`)
      setStartPos(prev => prev - diff)
    }
  }

  const dragDrop = async (e, category) => {
    e.persist();
    e.target.style.borderColor = '';
    const getDragItemId = dragItem[0]
    const getCategoryName = dragItem[1]
    if (getCategoryName === 'BookMark') {
      try {
        await api.post(`/bookmark/message/move/${category}/${getDragItemId}?UserId=${myUserId}`);
      } catch (err) {
        console.log(err)
      }
    }
    else {
      if (getCategoryName !== category) {
        try {
          await api.post(`/bookmark/message/move/${category}/${getDragItemId}?UserId=${myUserId}`);
          await deleteCategoryItem(getDragItemId)
        } catch (err) {
          console.log(err)
        }
      }
    }
  };

  const Post = () => {
    if (posts !== null) {
      return (
        posts
          .map((postId) => {
            return (
              <>
                <PostCard
                  key={postId}
                  postid={postId}
                  Refresh={Refresh}
                  myUserId={myUserId}
                  dragItem={setDragItem}
                  openCategoryName={openCategoryName}
                  deleteCategoryItem={deleteCategoryItem}
                />
              </>
            )
          })
      )
    } else {
      return (
        <Styled.NoResultContainer>Empty</Styled.NoResultContainer>
      )
    }
  }

  useEffect(() => {
    if (myUserId === null) {
      getMyUser()
    }

    if (myUserId !== null) {
      getFlagged(myUserId)
    }
  }, [myUserId])

  return (
    <>
      <div id="content_container" onMouseMove={divMouseMove} onMouseUp={divMouseUp} style={{ height: '100%' }}>
        <div id="top" style={{ width: 'auto', height: topHeight, padding: '10px' }}>
          <Scrollbars>
            <div>
              <div>
                <Category dragDrop={dragDrop} getCategoryFile={getCategoryFile} myUserId={myUserId} getFlagged={getFlagged} baseUrl={baseUrl} />
              </div>
            </div>
          </Scrollbars>
        </div>
        <Styled.MiddleLine id='middle' onMouseDown={divMouseDown} />
        <div id="bottom" style={{ width: 'auto', height: bottomHeight, padding: '10px', position: 'relative' }}>
          {openCategoryName === 'BookMark' &&
            <i
              class="fa fa-refresh fa-lg"
              aria-hidden="true"
              style={{ top: '10px', right: '10px', position: "absolute", cursor: "pointer", color: "rgb(170, 170, 170)" }}
              onClick={Refresh}
            ></i>
          }
          <div>
            <Styled.FolderIcon className='fa fa-folder-open fa-lg' aria-hidden="true"></Styled.FolderIcon>
            <Styled.FolderTitle>{openCategoryName}</Styled.FolderTitle>
          </div>
          <Scrollbars
            autoHide={true}
            autoHideTimeout={500}
            autoHideDuration={500}
          >
            <div>
              {Post()}
            </div>
          </Scrollbars>
        </div>
      </div>
    </>
  );
}

export default RHSView