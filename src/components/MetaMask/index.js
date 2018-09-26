import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


import { styles, modalStyles } from './styles.scss'
import metaMaskImg from 'assets/images/metamask.png'


import * as uiActionCreators from 'core/actions/actions-ui'
import * as assetActionCreators from 'core/actions/actions-asset'
import * as providerActionCreators from 'core/actions/actions-provider'


class MetaMask extends Component {
    constructor(props) {
        super(props)

    }

    componentDidMount() {

    }

    render() {
        const { provider, account } = this.props

        if (provider.web3Provider == null) {
            return (
                <div className={styles}>
                    <div className="msg-box">
                        <br />
                        <br />
                        <img className="metamask-logo" src={metaMaskImg} alt="MetaMask logo" />
                        <br />
                        <div className="message">
                            <a href="https://metamask.io/" target="_blank">MetaMask</a>
                            &nbsp;is a wallet and Chrome extension that allows you to make Ethereum transactions from
                regular websites.
                    <br /><br />
                            In order to register your asset on the blockchain, you need to have it installed and sign in.
                    <br /><br />
                            <button type="button" className="btn"
                                onClick={() => {
                                    window.open('https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en', '_blank'); return false;
                                }}
                            >Install MetaMask</button>
                            <br /><br />
                            If you have already installed MetaMask and sign in, please try to refresh the page.
                            <br /><br />
                        </div>
                    </div>
                </div>
            )

        } else if (!account.id) {

            return (
                <div className={styles}>
                    <div className="msg-box">
                        <br />
                        <br />
                        <img className="metamask-logo" src={metaMaskImg} alt="MetaMask logo" />
                        <br />
                        <div className="message">
                            Please sign in to your Metamask chrome extention and refresh the page
                        <br />
                        </div>
                        <br />
                    </div>
                </div >
            )
        } else {
            return (
                <div>
                </div>
            )
        }
    }
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
            ui: bindActionCreators(uiActionCreators, dispatch),
            asset: bindActionCreators(assetActionCreators, dispatch),
            provider: bindActionCreators(providerActionCreators, dispatch)
        }
    }
}

MetaMask.propTypes = {
    actions: PropTypes.object,
    asset: PropTypes.object,
    provider: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(MetaMask)
 
