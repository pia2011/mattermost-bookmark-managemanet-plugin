import React, {useState, useEffect} from 'react';

import Styled from './team_name.styled.jsx'

import {Client4} from 'mattermost-redux/client';

const TeamName = ({teamId, postId, saveTeamName}) => {
    const [team, setTeam] = useState(null);
    
    // team 정보
    const getTeamData = async(id) => {
        try {
            const res = await Client4.getTeam(id);
            setTeam(res)
            saveTeamName(res.name)
        } catch (err) {
            console.log(err)
        } 
    };

    useEffect(() => {
        getTeamData(teamId)
    }, [])


    return (
        <>
            {team !== null ? (
                <div>
                    <Styled.TeamTitle>
                        {team.name}
                    </Styled.TeamTitle>
                </div>
                
            ): <>loading...</>}
        </>
        
    )
}

export default TeamName