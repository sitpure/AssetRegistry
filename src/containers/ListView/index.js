import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import assetListPropType from 'core/types'

/* component styles */
import { styles } from './styles.scss'
import metaMaskImg from 'assets/images/metamask.png'
import AssetList from 'components/AssetList'
import MetaMask from 'components/MetaMask'

/* actions */
import * as uiActionCreators from 'core/actions/actions-ui'
import * as assetListActionCreators from 'core/actions/actions-assetList'
import * as accountActionCreators from 'core/actions/actions-account'
import * as providerActionCreators from 'core/actions/actions-provider'

class ListView extends Component {
    lastCount = 0;

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.getAssetCount();   
    }

    componentDidUpdate() {
        const { actions, assetList } = this.props
        
        if (assetList.assetCount != this.lastCount) {
            this.lastCount = assetList.assetCount;
            for (let i = 0; i < this.lastCount; i++) {
                actions.assetList.getAssetByIndex(i);
            }
        }
        
    }


    render() {
        const { assetList } = this.props
        const { provider, account } = this.props

        if (provider == null || provider.web3Provider == null || account == null || !account.id) {
            return (
                <MetaMask ></MetaMask>
            )

        } else {
            return (
                <div className={styles}>
                    <h2>Registered Assets</h2>
                    <span>Assets are registered using smart contract on Ethereum blockchain network. All images and documents are stored on decentralised IPFS servers.</span>
                    <br /><br />
                    <AssetList assetList={assetList} assetClicked={() => assetClicked()} />
                </div>
            )
    }
  }


    getAssetCount =()=> {
        const { actions } = this.props
        actions.assetList.getAssetCount()
    }
}

function assetClicked() {
    return false;
}


ListView.propTypes = {
    assetList: PropTypes.object,   
    actions: PropTypes.object,
    provider: PropTypes.object
}

function getVisibleAssetList(assetList, filter) {
    switch (filter) {
        default:           
            return assetList;
    }
}

function mapStateToProps(state) {
    return {
        assetList: getVisibleAssetList(state.assetList, state.visibilityFilter),
        account: state.account,
        provider: state.provider
    }
}

function mapDispatchToProps(dispatch) {
    return {
        assetClicked: id => dispatch(assetClicked(id)),
        actions: {
            ui: bindActionCreators(uiActionCreators, dispatch),
            assetList: bindActionCreators(assetListActionCreators, dispatch),
            account: bindActionCreators(accountActionCreators, dispatch),
            provider: bindActionCreators(providerActionCreators, dispatch)
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ListView)



