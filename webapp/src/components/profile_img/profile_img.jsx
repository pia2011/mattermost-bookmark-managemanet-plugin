import React, {useState, useEffect} from 'react';
import Styled from './profile_img.styled.jsx'
import UserStatus from '../user_status/user_status'

import {Client4} from 'mattermost-redux/client';

const ProfileImg = ({userId}) => {
    const [profileImg, setProfileImg] = useState(null)
    const [userStatus, setUserStatus] = useState(null)

    const getProfileImg = async(postid) => {
        try {
            const res = await Client4.getProfilePictureUrl(postid);
            setProfileImg(res)
        } catch (err) {
            console.log(err)
        }
    };
    
    const getUserStatus = async(postid) => {
        try {
            const res = await Client4.getStatus(postid);
            setUserStatus(res)
        } catch (err) {
            console.log(err)
        }
    };

    useEffect(() => {
        getProfileImg(userId)
        getUserStatus(userId)
    }, [])

    return (
        <>  
            <Styled.ImgBox>
                <Styled.Avatar
                    alt="img"
                    src={"http://k6s206.p.ssafy.io:8065/" + profileImg}
                />
                
                <Styled.Status>
                    {userStatus !== null &&
                        <UserStatus
                            status={userStatus.status}
                        />
                    }
                </Styled.Status>
            </Styled.ImgBox>
        </> 
    )
}

export default ProfileImg