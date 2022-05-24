import React, {useState, useEffect} from 'react';

import Styled from './user_status.styled.jsx'

import {Client4} from 'mattermost-redux/client';

const UserStatus = ({status}) => {
    

    return (
        <>
            {status === "online" && 
                <svg
                    width='100%'
                    height='100%'
                    viewBox='0 0 20 20'
                    role='img'
                    aria-label='Online Icon'
                    style={{fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: '1.41421'}}
                >
                    <path
                        style={{fill: 'var(--online-indicator)'}}
                        d='M10,0c5.519,0 10,4.481 10,10c0,5.519 -4.481,10 -10,10c-5.519,0 -10,-4.481 -10,-10c0,-5.519 4.481,-10 10,-10Zm6.19,7.18c0,0.208 -0.075,0.384 -0.224,0.53l-5.782,5.64l-1.087,1.059c-0.149,0.146 -0.33,0.218 -0.543,0.218c-0.213,0 -0.394,-0.072 -0.543,-0.218l-1.086,-1.059l-2.891,-2.82c-0.149,-0.146 -0.224,-0.322 -0.224,-0.53c0,-0.208 0.075,-0.384 0.224,-0.53l1.086,-1.059c0.149,-0.146 0.33,-0.218 0.543,-0.218c0.213,0 0.394,0.072 0.543,0.218l2.348,2.298l5.24,-5.118c0.149,-0.146 0.33,-0.218 0.543,-0.218c0.213,0 0.394,0.072 0.543,0.218l1.086,1.059c0.149,0.146 0.224,0.322 0.224,0.53Z'
                    />
                </svg>
            }
            {status === "away" &&
                <svg
                    width='100%'
                    height='100%'
                    viewBox='0 0 20 20'
                    role='img'
                    aria-label='Away Icon'
                    style={{fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: '1.41421'}}
                >
                    <path
                        style={{fill: 'var(--away-indicator)'}}
                        d='M10,0C15.519,0 20,4.481 20,10C20,15.519 15.519,20 10,20C4.481,20 0,15.519 0,10C0,4.481 4.481,0 10,0ZM10.27,3C10.949,3 11.5,3.586 11.5,4.307L11.5,9.379L15.002,12.881C15.492,13.37 15.499,14.158 15.019,14.638L14.638,15.019C14.158,15.499 13.37,15.492 12.881,15.002L8.887,11.008C8.739,10.861 8.636,10.686 8.576,10.501C8.528,10.402 8.5,10.299 8.5,10.193L8.5,4.307C8.5,3.586 9.051,3 9.73,3L10.27,3Z'
                    />
                </svg>
            }
            {status === "dnd" &&
                <svg
                    width='100%'
                    height='100%'
                    viewBox='0 0 20 20'
                    role='img'
                    aria-label='Do Not Disturb Icon'
                    style={{fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: '1.41421'}}
                >
                    <path
                        style={{fill: 'var(--dnd-indicator)'}}
                        d='M10,0c5.519,0 10,4.481 10,10c0,5.519 -4.481,10 -10,10c-5.519,0 -10,-4.481 -10,-10c0,-5.519 4.481,-10 10,-10Zm5.25,8.5l-10.5,0c-0.414,0 -0.75,0.336 -0.75,0.75l0,1.5c0,0.414 0.336,0.75 0.75,0.75l10.5,0c0.414,0 0.75,-0.336 0.75,-0.75l0,-1.5c0,-0.414 -0.336,-0.75 -0.75,-0.75Z'
                    />
                </svg>
            }
            {status === "offline" &&
                <svg
                width='100%'
                height='100%'
                viewBox='0 0 20 20'
                role='img'
                aria-label='Offline Icon'
                style={{fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: '1.41421'}}
            >
                <path
                    style={{fill: 'var(--offline-indicator)'}}
                    d='M10,0c5.519,0 10,4.481 10,10c0,5.519 -4.481,10 -10,10c-5.519,0 -10,-4.481 -10,-10c0,-5.519 4.481,-10 10,-10Zm0,2c4.415,0 8,3.585 8,8c0,4.415 -3.585,8 -8,8c-4.415,0 -8,-3.585 -8,-8c0,-4.415 3.585,-8 8,-8Z'
                />
            </svg>
            }
        </>
    )
}

export default UserStatus