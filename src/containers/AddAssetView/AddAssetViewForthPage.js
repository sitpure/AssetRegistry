import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import ProgressIndicator from 'components/ProgressIndicator'
import { Link } from 'react-router-dom'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import renderField from './renderField'
import Button from 'components/Button'


/* component styles */
import { styles, modalStyles } from './styles.scss'

/* actions */
import * as uiActionCreators from 'core/actions/actions-ui'
import * as assetActionCreators from 'core/actions/actions-asset'

class AddAssetViewForthPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            submitted : 0
        }
    }

    componentDidMount() {
        const { actions, asset } = this.props

        //if (asset.transaction) {
            setTimeout(() => this.registerAsset(), 0);
        //}
    }
    // This is listener for redux store state change. It get's called only when fields declared in mapStateToProps is changed at redux store.
    componentWillReceiveProps(nextProps) {
        const { asset} = nextProps
        const { alreadyExists} = asset
        this.setState({ submitted : 1 }) // to force rerender after state changes             
    }


    render() {
        const { asset, account } = this.props
        const { alreadyExists, error, success, transaction } = asset
        const { handleSubmit, previousPage, firstPage} = this.props
        let content
        let showNavBtn = false
        if(!this.state.submitted) {
            content = (
                <div>
                    <h2>Wait! Asset is being registered on blockchain.</h2>
                    <div id="hash-progress-indicator">
                        <ProgressIndicator type="linear" />
                        <span className="blink-me">Please hold on...</span>
                    </div>
                </div>
            )
        } else if (error) {
            showNavBtn = true
            content = (
                <div className="notification">
                    <h2>Sorry, there's an error!</h2>
                    <br/>
                    <span className="error">{error.message.substring(error.message.lastIndexOf("Error:"))}</span>                    
                </div>
            )
        } else if (alreadyExists) {
            showNavBtn = true
            content = (
                <div className="notification">
                    <h2>Sorry, someone already registered this asset!</h2>
                    <span className="action"><Link to="/home" >Upload a new asset</Link></span>
                </div>
            )
        } else if (!success) {
            showNavBtn = true
            content = (
                <div className="notification">
                    <h2>Sorry, there's an error!</h2>
                    <br />
                    <span className="error">{transaction}</span>
                    <span className="action"><Link to="/home" > Please try again</Link></span>
                </div>
            )

        } else {
            content = (
                <div className="notification">
                    <h2>Congratulations! Your asset has been successfully registered.</h2>
                    <span className="action"><Link to="/assets" >See your assets</Link></span>
                </div>
            )
        }

        if (showNavBtn) {
            return (
                <div>
                    <form onSubmit={handleSubmit}>
                        {content}
                        <div className="wiz-btn-container">
                            <Button
                                type="raised"
                                label="Previous"
                                primary
                                disabled={false}
                                onClick={previousPage}
                                className="btn-pre"
                            />
                        </div>
                    </form>
                </div>
            )
        } else {
            return (
                <div>
                    <form onSubmit={handleSubmit}>
                        {content}
                    </form>
                </div>
            )
        }
    }

    registerAsset = () => {
        const { actions } = this.props
        actions.asset.register()
    }
}



AddAssetViewForthPage.propTypes = {
    account: PropTypes.object,
    actions: PropTypes.object.isRequired,
    alreadyExists: PropTypes.bool,
    asset: PropTypes.object,
}


function mapStateToProps(state) {
    return {
        account: state.account,
        asset: state.asset,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            asset: bindActionCreators(assetActionCreators, dispatch)
        }
    }
}


AddAssetViewForthPage = reduxForm({
    form: 'wizard',                 // <------ same form name
    destroyOnUnmount: false,        // <------ preserve form data
    //forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
    //validate
})(connect(mapStateToProps, mapDispatchToProps)(AddAssetViewForthPage))

// Decorate with connect to read form values
const selector = formValueSelector('wizard') // <-- same as form name
AddAssetViewForthPage = connect(
    state => {
        const { name, email, desc, tags, price } = selector(state, 'name', 'email', 'desc', 'tags', 'price')
        return {
            name, email, desc, tags, price
        }
    }
)(AddAssetViewForthPage)

export default AddAssetViewForthPage

