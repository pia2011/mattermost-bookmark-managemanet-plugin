import styled from 'styled-components'

const Content = styled.div`
    position: relative;
    display: table;
    width: 100%;
    padding: 0 8px 0 5px;
    margin: 0 auto;
`

const PostHeader = styled.div`
    position: relative;
    padding-right: 70px;
    display: flex;
    width: 100%;
    margin-bottom: 2px;
    white-space: nowrap;
`

const ContentBox = styled.div`
    display: table-cell;
    vertical-align: top;
`

const PostTime = styled.div`
    font-size: 13px;
    font-weight: 600;
    color: rgba(var(--center-channel-color-rgb), 0.4);
`


export default {Content, PostHeader, ContentBox, PostTime}