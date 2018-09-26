import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Image from 'components/Image'
import AddAssetViewForm from './AddAssetViewForm'


import { styles, modalStyles } from './styles.scss'

import * as accountActionCreators from 'core/actions/actions-account'
import * as assetActionCreators from 'core/actions/actions-asset'
import * as providerActionCreators from 'core/actions/actions-provider'
import MetaMask from '../../components/MetaMask';


class AddAssetView extends Component {
    constructor(props) {
        super(props)
        this.submit = this.submit.bind(this)
        this.state = {
            asset: this.props.asset
        }
    }

    componentWillUnmount() {
        const { actions } = this.props
        if (actions) {            
            actions.asset.clear()
        }
    }

    // This is listener for redux store state change. It get's called only when fields declared in mapStateToProps is changed at redux store.
    componentWillReceiveProps(nextProps) {
        const { asset } = nextProps
        this.setState({
            asset: asset
        })
    }


    render() {
        const { provider, account } = this.props

        if (provider == null || provider.web3Provider == null || account== null || !account.id) {
            return (
                <MetaMask ></MetaMask>
            )

        } else if (this.state.asset && this.state.asset.assetURLData) {
           
                return (
                    <div className={styles}>
                        <div id="add-asset-view">   
                            <Image src={this.state.asset.assetURLData}> </Image>            
                        <div id="add-asset-view-form-containts">
                                <AddAssetViewForm onSubmit={this.submit} />
                            </div>
                        </div>
                    </div>
                )
            
        } else {
            return (
                <div className={styles}>
                    <div id="add-asset-view">    
                    <Image src={null}> </Image>                 
                    <div id="add-asset-view-form-containts">
                            <AddAssetViewForm onSubmit={this.submit} />
                        </div>
                    </div>
                </div>
            )
        }

      
    }

    submit = values => {
        // print the form values to the console
        console.log('-----------------------')
        console.log(values)

    }
}

AddAssetView.propTypes = {
    asset: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    location: PropTypes.object,
    provider: PropTypes.object

}

function mapStateToProps(state) {
    return {
        account: state.account,
        asset: state.asset,
        provider: state.provider
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            account: bindActionCreators(accountActionCreators, dispatch),
            asset: bindActionCreators(assetActionCreators, dispatch),
            provider: bindActionCreators(providerActionCreators, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddAssetView)
