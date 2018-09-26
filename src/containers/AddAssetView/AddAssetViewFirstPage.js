import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import renderField from './renderField'
import { UploadBox } from 'components/UploadBox'
import metaMaskImg from 'assets/images/metamask.png'
import Button from 'components/Button'
import { getFileData, getString } from 'core/utils/util-assets'

import ipfs from 'core/utils/util-ipfs';
import { getMultiHash } from 'core/utils/util-multiHash';

/* component styles */
import { styles, modalStyles } from './styles.scss'

/* actions */
import * as uiActionCreators from 'core/actions/actions-ui'
import * as assetActionCreators from 'core/actions/actions-asset'

const validate = values => {
    const errors = {}    
    return errors
}

class AddAssetViewFirstPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fileAdded: false,
            asset: null
        }
    }

    onDrop = () => {
        this.setState({
            fileAdded: true
        })
    }

    setUploadedFile = (file) => {
        const { actions } = this.props

        getFileData(file[0]).then((assetImgBuffer) => {
            getString(file[0], (imageUrl) => {
                getMultiHash(assetImgBuffer).then((assetHash) => {
                    actions.asset.clear()
                    actions.asset.addAsset(imageUrl, assetImgBuffer, assetHash)
                    actions.asset.checkIfRegistered(assetHash)
                })
            })
        })
  }

    render() {

        const { handleSubmit, asset } = this.props;
        let content
        if (asset.alreadyExists) {
            content = (
                <div className="notification">
                    <span className="error">Sorry, someone has already registered this asset!, Upload a new asset</span>
                </div>
            )
        } 
        return (
            <form onSubmit={handleSubmit}>
                {content}
                <UploadBox onDrop={this.onDrop} setUploadedFile={this.setUploadedFile} />
                <div className="wiz-btn-container">
                    <Button
                        type="raised"
                        label="Next"
                        primary
                        disabled={asset.assetHash === undefined || asset.assetHash === ''}
                        className="btn-next"
                    />
                </div>
            </form>
        )
    }
}

AddAssetViewFirstPage.propTypes = {
    actions: PropTypes.object,
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
            ui: bindActionCreators(uiActionCreators, dispatch),
            asset: bindActionCreators(assetActionCreators, dispatch)
        }
    }
}

export default reduxForm({
    form: 'wizard',                 // <------ same form name
    destroyOnUnmount: false,        // <------ preserve form data
    forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
    //validate
})(connect(mapStateToProps, mapDispatchToProps)(AddAssetViewFirstPage))
