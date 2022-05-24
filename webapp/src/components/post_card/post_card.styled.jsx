import styled from 'styled-components'

const CardBox = styled.div`
    position: relative;
    overflow: hidden;
    border: 1px solid;
    border-color: rgba(63, 67, 80, 0.15);
    border-radius: 4px;
    max-width: 100%;
    height: auto;
    padding-top: 0px;
    padding-right: 1em;
    padding-bottom: 16px;
    padding-left: 1em;
    margin: 8px 0;
    box-shadow: var(--elevation-1);
    background-color: transparent;
    transition: all ease 0.4s;
    &:hover {
        transition: all ease 0.3s;
        background-color: rgba(var(--center-channel-color-rgb), 0.05);
    }

`

export default {CardBox}
