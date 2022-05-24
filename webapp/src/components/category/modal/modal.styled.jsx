import styled, { keyframes } from 'styled-components'

const Modal = styled.div`
    display: none;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.6);
`

const Button = styled.button`
    outline: none;
    cursor: pointer;
    border: 0;
`

const Section = styled.section`
    width: 90%;
    max-width: 450px;
    margin: 0 auto;
    border-radius: 0.3rem;
    background-color: #fff;
    overflow: hidden;
`

const Header = styled.header`
    position: relative;
    padding: 16px 64px 16px 16px;
    background-color: #f1f1f1;
    font-weight: 700;
`

const HeaderButton = styled.button`
    outline: none;
    cursor: pointer;
    border: 0;
    position: absolute;
    top: 15px;
    right: 15px;
    width: 30px;
    font-size: 21px;
    font-weight: 700;
    text-align: center;
    color: #999;
    background-color: transparent;
`

const Main = styled.main`
    padding: 16px;
    border-bottom: 1px solid #dee2e6;
    border-top: 1px solid #dee2e6;
`

const Footer = styled.footer`
    padding: 12px 16px;
    text-align: right;
`

const OpenModal = styled.div`
    display: none;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
`

const FooterButton = styled.button`
    outline: none;
    cursor: pointer;
    border: 0;
    padding: 6px 12px;
    color: #fff;
    background-color: #6c757d;
    border-radius: 3px;
    font-size: 13px;
    margin: 4px;
`

const DeleteButton = styled.button`
    outline: none;
    cursor: pointer;
    border: 0;
    padding: 6px 12px;
    color: #fff;
    background-color: #d9534f;;
    border-radius: 3px;
    font-size: 13px;
    margin: 4px;
`

// const ModalShow = keyframes`
//     from {
//         opacity: 0;
//         margin-top: -50px;
//     }
//     to {
//         opacity: 1;
//         margin-top: 0;
//     }
// `

// const ModalBgShow = keyframes`
//     from {
//         opacity: 0;
//     }
//     to {
//         opacity: 1;
//     }
// `

export default {
    Modal,
    Button,
    Section,
    Header,
    HeaderButton,
    Main,
    Footer,
    OpenModal,
    FooterButton,
    DeleteButton,
}