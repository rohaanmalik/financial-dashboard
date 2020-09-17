import * as React from 'react';
import styles from './header.module.scss';
import headerBg from '../../images/header-bg.svg';
import { classNames } from '@progress/kendo-react-common';
import userImg from '../../images/user.jpg';
import { Link } from 'react-router-dom';

export const Header: React.FunctionComponent<any> = () => {

    return (
        <header
            className={classNames(styles.header, styles['currency-input'], 'py-3')}
            style={{ background: `url(${headerBg})` }}
        >
            <div className="container pt-4 pb-2">
                <div className="row">
                    <div className="col-9">
                        <h1 className="mb-0 header-title">My Stocks Portfolio</h1>
                    </div>
                    <div className="col-3">
                        <div className="text-right">
                            <Link to="/profile">
                                <img src={userImg} alt="user"/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header >
    )
}