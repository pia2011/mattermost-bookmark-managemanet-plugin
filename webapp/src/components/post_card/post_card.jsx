import React, { useState, useEffect } from 'react';
import ChannelName from '../channel_name/channel_name';
import PostContent from '../post_content/post_content';
import Styled from './post_card.styled.jsx'
import { Client4 } from 'mattermost-redux/client';
import FileIcon from '../../../images/file.png'

const PostCard = ({ key, postid, Refresh, myUserId, dragItem, openCategoryName, deleteCategoryItem }) => {
  const [post, setPost] = useState(null);
  const [teamName, setTeamName] = useState(null);
  const IMG = new Image();
  IMG.src = FileIcon

  const getMyPost = async (postid) => {
    try {
      const res = await Client4.getPost(postid);
      setPost(res)
    } catch (err) {
      console.log(err)
    }
  };

  const saveTeamName = (team_name) => {
    setTeamName(team_name)
  }

  const dragStart = (e, Id) => {
    e.persist();
    e.dataTransfer.setDragImage(IMG, 0, 0);
    dragItem([Id, openCategoryName])
  }

  useEffect(() => {
    getMyPost(postid)
  }, [])

  return (
    <>
      {post &&
        <Styled.CardBox key={key} draggable="true" onDragStart={(e) => { dragStart(e, post.id) }}>
          <ChannelName
            channelId={post.channel_id}
            postId={post.id}
            saveTeamName={saveTeamName}
          />
          <PostContent
            userId={post.user_id}
            message={post.message}
            teamName={teamName}
            postId={post.id}
            createAt={post.create_at}
            Refresh={Refresh}
            myUserId={myUserId}
            files={post.metadata.files}
            openCategoryName={openCategoryName}
            deleteCategoryItem={deleteCategoryItem}
          />
        </Styled.CardBox>
      }
      {!post &&
        <Styled.CardBox>Loading</Styled.CardBox>
      }
    </>
  )
}

export default PostCard