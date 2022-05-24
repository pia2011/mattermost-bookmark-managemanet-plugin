import React, {useState, useEffect} from 'react';

import Styled from './user_name.styled.jsx'

import {Client4} from 'mattermost-redux/client';

const UserName = ({userId}) => {
    const [user, setUser] = useState(null);
    
    // user 정보
    const getUserData = async(id) => {
        try {
            const res = await Client4.getUser(id);
            setUser(res)
        } catch (err) {
            console.log(err)
        }
    };

    useEffect(() => {
        getUserData(userId)
    }, [])

    return (
        <>
            {user !== null ? (
                <Styled.Name>
                    {user.username}
                </Styled.Name>
            ): <>loading...</>}
        </>
    )
}

export default UserName