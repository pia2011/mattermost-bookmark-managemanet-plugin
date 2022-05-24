import React, { useState, useEffect } from 'react';
import Styled from './post_content.styled.jsx'

import ProfileImg from '../profile_img/profile_img';
import UserName from '../user_name/user_name';
import JumpToPost from '../jump_to_post/jump_to_post.jsx';
import PostFile from '../post_file/post_file';

const PostContent = ({ userId, message, teamName, postId, createAt, Refresh, myUserId, files, openCategoryName, deleteCategoryItem }) => {
    var date = new Date(createAt)

    const formatAMPM = (date) => {
        var options = { month: 'long' }

        let month = new Intl.DateTimeFormat('en-US', options).format(date)
        let day = date.getDate();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours %= 12;
        hours = hours || 12;
        minutes = minutes < 10 ? `0${minutes}` : minutes;

        const strTime = `${month} ${day} ${hours}:${minutes} ${ampm}`;

        return strTime;
    };

    return (
        <Styled.Content>
            <ProfileImg
                userId={userId}
            />
            <Styled.ContentBox>
                <Styled.PostHeader>
                    <UserName
                        userId={userId}
                    />
                    <Styled.PostTime>{formatAMPM(date)}</Styled.PostTime>
                    <JumpToPost
                        teamName={teamName}
                        postId={postId}
                        Refresh={Refresh}
                        userId={userId}
                        myUserId={myUserId}
                        openCategoryName={openCategoryName}
                        deleteCategoryItem={deleteCategoryItem}
                    />
                </Styled.PostHeader>
                <div>{message}</div>
                {files &&
                    <PostFile files={files} />
                }
            </Styled.ContentBox>
        </Styled.Content>
    )
}

export default PostContent