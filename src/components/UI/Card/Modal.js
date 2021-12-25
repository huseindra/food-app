import { Fragment } from 'react/cjs/react.production.min'
import classes from './Modal.module.css'
import ReactDOM from 'react-dom'

const Backdrop = () => {
    return <div className={classes.backdrop} />
}

const ModalOverlay = props => {
    return <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>
}
const Modal = (props) => {
    const portalElement = document.getElementById('overlays')
    return(
        <Fragment>
            {ReactDOM.createPortal(<Backdrop /> , portalElement)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
        </Fragment>
    )
}

export default Modal