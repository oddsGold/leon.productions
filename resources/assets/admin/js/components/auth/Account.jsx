import React from "react";
import {connect} from "react-redux";
import AccountFormFieldEmail from "./components/AccountFormFieldEmail";
import AccountFormFieldPassword from "./components/AccountFormFieldPassword";

const Account = ({user, settings}) => {

    const {login, email, role} = user;

    return (
        <div className="account">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="title h4">
                        Редактировать информацию профиля
                    </div>
                </div>
            </div>
            <div className="row ">
                <div className="col-md-8 offset-md-0">

                    <div className="form">
                        <div className="row">
                            <div className="col-md-6 text-end">
                                <div className="field">Логин:</div>
                            </div>
                            <div className="col">{login}</div>
                        </div>
                        <AccountFormFieldEmail />
                        <div className="row">
                            <div className="col-md-6 text-end">
                                <div className="field">Роль:</div>
                            </div>
                            <div className="col">{role}</div>
                        </div>

                        <AccountFormFieldPassword />

                    </div>

                </div>
            </div>

        </div>
    );
};

export default connect(state => ({user: state.auth, settings: state.settings}))(Account);
