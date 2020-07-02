import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';

import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const layout = props => {

  const [sideDrawerIsVisible, setSideDrawIsVisible] = useState(false);

  const sideDrawerClosedHandler = () => {
    setSideDrawIsVisible(false);
  }

  const sideDrawerToggleHandler = () => {
    setSideDrawIsVisible(!sideDrawerIsVisible)
  }

  return (
    <Fragment>
      <Toolbar
        isAuth={props.isAuthenticated}
        drawerToggleClicked={sideDrawerToggleHandler} />
      <SideDrawer
        isAuth={props.isAuthenticated}
        open={sideDrawerIsVisible}
        closed={sideDrawerClosedHandler} />
      <main className={classes.Content}>
        {props.children}
      </main>
    </Fragment>
  )
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(layout);
