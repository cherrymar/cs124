import './DeleteAllCompletedButton';
import './Alert.css';
import react from 'react';

function Alert(props) {

    return (
    <div className={"backdrop"}>
        <div className="modal">
            {props.children}
            <div className="alert-buttons">
                <button className={"alert-button alert-cancel"} type={"button"}
                        onClick={props.onClose}>
                    {props.cancelText ? props.cancelText : "Cancel"}
                </button>
                <button className={"alert-button alert-ok"} type={"button"}
                        onClick={props.onOK}>
                    {props.OKText ? props.OKText : "Ok"}
                </button>
            </div>
        </div>
    </div>
    );
}

export default Alert;