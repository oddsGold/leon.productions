import React from "react";
import {Form, Formik} from "formik";

export default function GenericForm ({current, defaultCurrent, onSubmit, enableReinitialize = true, validation, children, withoutForm = false}){


    return (
        <div className="row">
            <div className="col">

                <Formik
                    initialValues={
                        current ? current : defaultCurrent}
                    onSubmit={(values, actions) => {
                        onSubmit(values);
                        actions.setSubmitting(false);
                    }}
                    enableReinitialize={enableReinitialize}
                    validationSchema={validation}
                >
                    {withoutForm ? children : ({ isSubmitting}) => (
                        <Form>
                            {children}
                            <div>
                                <button type="submit" className="btn btn-success" disabled={isSubmitting}>
                                    Сохранить
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>

            </div>
        </div>
    );

}
