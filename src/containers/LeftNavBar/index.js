import React, { Component }   from 'react';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter }         from 'react-router-dom';
import { Drawer, AppBar }     from 'material-ui';
import { appConfig }          from 'core/configs/config-app';
import { Link } from 'react-router-dom'

/* component styles */
import { styles } from './styles.scss';

/* actions */
import * as uiActionCreators from 'core/actions/actions-ui';

class LeftNavBar extends Component {
  constructor(props) {
    super(props);
  }

  closeNav=() => {
    this.props.actions.ui.closeLeftNav();
  }

  render() {
    return (
      <div className={styles} >
        <Drawer
          docked={false}
          disableSwipeToOpen={true}
          open={this.props.ui.leftNavOpen}
          onRequestChange={this.closeNav}>
          <AppBar title={appConfig.name} />
          <div id="left-nav-container">
                    <Link to="/home" >Home</Link><br /><br />
                    <Link to="/assets" >Assets</Link><br /><br />
                    <Link to="/addasset" >Register Asset</Link><br /><br />
          </div>
        </Drawer>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    ui: state.ui
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      ui: bindActionCreators(uiActionCreators, dispatch)
    }
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LeftNavBar));
