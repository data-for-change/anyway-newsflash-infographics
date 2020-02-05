import React, { FunctionComponent, useRef } from 'react'
import Card from '@material-ui/core/Card'
import SvgIcon from '@material-ui/core/SvgIcon'
import widgetToJpeg from '../../services/to-image.service'

interface IProps {}

const AnyWayCard: FunctionComponent<IProps> = ({ children }) => {
    const cardStyles: object = {
        padding: '20px',
        margin: '10px',
        borderRadius: '15px',
        width: '360px',
        height: '440px',
        display: 'flex',
        justifyContent: 'space-evenly',
        flexDirection: 'column'
    };
    const btnStyle = {
        display: 'block',
        textDecoration: 'none',
        border: 'none',
        cursor: 'pointer',
        backgroundColor: 'transparent'
    }
    const widget = useRef<HTMLDivElement>(null)
    const imgDownloadHandler = () => {
        widgetToJpeg(widget)
    };
    return (
        <Card ref={widget} style={cardStyles}>
            {children}
            <button style={btnStyle} onClick={imgDownloadHandler}>
                <SvgIcon viewBox='0 0 24 24'>
                    <path
                        fill='#000000'
                        d='M13,5V11H14.17L12,13.17L9.83,11H11V5H13M15,3H9V9H5L12,16L19,9H15V3M19,18H5V20H19V18Z'
                    />
                </SvgIcon>
            </button>
        </Card>
    )
};
export default AnyWayCard
