import React, {useState, useEffect} from 'react';

import TeamName from '../team_name/team_name'

import Styled from './channel_name.styled.jsx'

import {Client4} from 'mattermost-redux/client';

const ChannelName = ({channelId, postId, saveTeamName}) => {
    const [channel, setChannel] = useState(null);

    const getChannelData = async(id) => {
        try {
            const res = await Client4.getChannel(id);
            setChannel(res)
        } catch (err) {
            console.log(err)
        }
    };

    useEffect(() => {
        getChannelData(channelId)
    }, [])

    return (
        <>
            {channel !== null ? (
                <Styled.ChannelContainer>
                    <Styled.ChannelTitle>{channel.name}</Styled.ChannelTitle>
                    <TeamName
                        teamId = {channel.team_id}
                        postId = {postId}
                        saveTeamName = {saveTeamName}
                    />
                </Styled.ChannelContainer>
            ) : <>loading...</>}
        </>
    )

}

export default ChannelName