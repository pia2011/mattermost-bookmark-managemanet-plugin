import styled from 'styled-components'

const ChannelContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: baseline;
    padding: 16px 0 12px;
`

const ChannelTitle = styled.div`
    overflow: hidden;
    font-weight: 600;
    flex-shrink: 1;
    opacity: 0.72;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-transform: capitalize;
`

const TeamTitle = styled.div`
    overflow: hidden;
    flex-shrink: 1;
    padding: 0 8px;
    border-left: 1px solid rgba(var(--center-channel-color-rgb), 0.5);
    margin: 0 0 0 8px;
    font-size: 12px;
    font-weight: 400;
    opacity: 0.5;
    text-overflow: ellipsis;
    white-space: nowrap;
`

export default {ChannelTitle, ChannelContainer, TeamTitle}