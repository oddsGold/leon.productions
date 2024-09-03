import React, {useEffect} from "react";
import {connect} from "react-redux";
import {changeEmail, hideEmailForm, setEmailFormField, showEmailForm} from "../redux/actions";

const AccountFormFieldEmail = ({show, data, user, changeEmail, setEmailFormField, showEmailForm, hideEmailForm}) => {

    const {login, email, role} = user;


    const submitHandler = () => {
        if(data.email.value.length > 0 && email !== data.email.value){
            changeEmail(data.email.value);
        }
    };

    const changeInputHandler = (e) => {
        e.persist();
        setEmailFormField(e.target.name, e.target.value)
    };


    return (
        <React.Fragment>
            <div className="row email-filed">
                <div className="col-md-6 text-end">
                    <div className="field">Email:</div>
                </div>
                <div className="col">
                    {show ? <div className="edit" onClick={() => {hideEmailForm()}}>отмена</div> : <React.Fragment>
                        <div className="value">
                            {email}
                        </div>
                        <div
                            className="edit icon"
                            onClick={() => {showEmailForm()}}
                        >
                            <i className="fas fa-pen" />
                        </div>
                    </React.Fragment>}
                </div>
            </div>
            {show && <div className="row email-filed">
                <div className="col-md-6 text-end">
                    <div className="field">Новый email:</div>
                </div>
                <div className="col">
                    <input
                        type="text"
                        className="form-control input-sm"
                        placeholder="Email"
                        name="email"
                        value={data.email.value}
                        onChange={changeInputHandler}
                    />
                </div>
            </div>}
            {show && <div className="row">
                <div className="col"/>
                <div className="col">
                    <button type="button" onClick={submitHandler} className="btn btn-success btn-sm">Сохранить</button>
                </div>
            </div>}
        </React.Fragment>
    );
};


export default connect(
    state => ({
        show: state.auth.forms.email.show,
        data: state.auth.forms.email.data,
        user: state.auth
    }),
    {changeEmail, setEmailFormField, showEmailForm, hideEmailForm}
)(AccountFormFieldEmail);

