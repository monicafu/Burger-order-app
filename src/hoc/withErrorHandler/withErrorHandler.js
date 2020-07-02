import React, { useState, Fragment, useEffect } from 'react';
import Modal from '../../components/UI/Modal/Modal'

const withErrorHandler = (WrappedComponent, axios) => {
    
    return props => {
        const [error, setError] = useState(null);

        const requestInterceptor = axios.interceptors.request.use(null, req => {
            setError(null);
            return req;
        });
        const responseInterceptor = axios.interceptors.response.use(res => res, err => {
            setError(err);
        });

        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(this.requestInterceptor);
                axios.interceptors.response.eject(this.responseInterceptor);
            };
        },[requestInterceptor,responseInterceptor]);

        const errorConfirmedHandler = () => {
            setError(null);
        }

        return (
            <Fragment>
                <Modal
                    show={error}
                    modalClosed={errorConfirmedHandler}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Fragment>
        );
    }
}

export default withErrorHandler;
