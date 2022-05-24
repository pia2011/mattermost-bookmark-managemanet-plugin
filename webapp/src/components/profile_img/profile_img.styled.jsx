import styled from 'styled-components'

const ImgBox = styled.div`
    display: table-cell;
    width: 43px;
    text-align: right;
    padding-right: 10px;
    position: relative;
`

const Avatar = styled.img`
    border-radius: 50%;
    width: 32px;
    min-width: 32px;
    height: 32px;
    font-size: 12px;
`

const Status = styled.span`
    position: absolute;
    top: 20px;
    right: 10px;
    bottom: 5px;
    width: 15px;
    height: 15px;
    margin: 0;
    background: var(--center-channel-bg);
    border: 2px solid transparent;
    border-radius: 100px;
    line-height: 0;
    visibility: visible;
    display: inline-block;
`

export default {Avatar, ImgBox, Status}