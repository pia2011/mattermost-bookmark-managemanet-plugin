import styled from 'styled-components'
import { Link } from "react-router-dom";

const JumpControls = styled.div`
    background-color: var(--center-channel-bg);
    box-shadow: var(--elevation-1);
    display: flex;
    justify-content: flex-end;
    border-radius: 4px;
    position: absolute;
    top: -8px;
    right: -9px;
    font-size: 13px;
    white-space: normal;
    z-index: 6;
    padding: 4px;
    border: 1px solid transparent;
    border-color: rgba(63, 67, 80, 0.2);
`

const JumpIcon = styled(Link)`
    position: absolute;
    font-size: 12px;
    font-weight: 600;
    right: 0px;
    text-decoration: none;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
        color: rgba(var(--center-channel-color-rgb), 0.4);
    }
`

const JumpIcon2 = styled(Link)`
    font-size: 12px;
    font-weight: 600;
    right: 0px;
    text-decoration: none;
    padding: 3px 4px 0;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
        color: rgba(var(--center-channel-color-rgb), 0.4);
    }
`

const TrashIcon = styled.i`
    color: var(--dnd-indicator);
    cursor: pointer;
    padding: 2px;
    border: 1px solid transparent;
    background-color: transparent;
    border-radius: 4px;
    &:hover {
        background-color: rgba(var(--center-channel-color-rgb), 0.08);
    }
`

const FlagIcon = styled.i`
    color: var(--link-color);
    fill: var(--link-color);
    cursor: pointer;
    padding: 2px;
    border: 1px solid transparent;
    background-color: transparent;
    border-radius: 4px;
    &:hover {
        background-color: rgba(var(--center-channel-color-rgb), 0.08);
    }
`

export default {JumpControls, JumpIcon, JumpIcon2, TrashIcon, FlagIcon}