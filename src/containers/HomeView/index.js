import React, { Component }   from 'react'
import PropTypes              from 'prop-types'
import { connect }            from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter }         from 'react-router-dom'
import { UploadBox }          from 'components/UploadBox'
import Button                 from 'components/Button'
import metaMaskImg            from 'assets/images/metamask.png'

/* component styles */
import { styles, modalStyles } from './styles.scss'

/* actions */
import * as uiActionCreators    from 'core/actions/actions-ui'
import * as assetActionCreators from 'core/actions/actions-asset'

class HomeView extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }



  render() {
    return (
      <div className={styles}>
        <div id="home-view">            
                <h2> Demo - Asset Registry on Ethereum blockchain using IPFS and ReactJs</h2>
                <br />
                <span>This demo is the proof of concept that any asset can be registered on blockchain and access it when needed. </span>
                <br /><br />
                <h3> Assumptions </h3>

                <ul>
                    <li>Authorization to upload documents and Authenticity of documents is done outside this application</li>
                    <li>Only authorised people can upload documents</li>
                    <li>Only image files are accepted in this version</li>
                </ul>
                <br />

                <h3> Possible use cases </h3>
                <ul>
                    <li>Land Registry - Land Registry department can upload land registry document to blockchain to be accessed by public</li>
                    <li>Birth, Death, Cast and other certificates - Respective department can upload certificate to blockchain to be accessed by public</li>
                    <li>University Degree - Univercity can upload degree certificates to blockchain to be accessed by public</li>
                    <li>Asset Digitization - Custodian of physical assets such as art, collectibles, can upload certificat of ownership and possession to blockchain to be accessed by public</li>
                </ul>
                <br />
                <h3> How to use this demo application </h3>
                <ul>
                    <li>Please install metamask chrome extension by clicking <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en" target="_blank">here</a></li>
                    <li>Create your metamask account, copy it</li>
                    <li>Obtain faucet (dummy ETH) from <a href="https://gitter.im/kovan-testnet/faucet" target="_blank">Kovan Testnet Gitter</a> by pasting your account </li>
                    <li>Click on Assets link of this application to browse existing registered assets</li>
                    <li>Click on Register Asset link to register new asset</li>
                    </ul>

        </div>
      </div>
    )
  }

}

HomeView.propTypes = {
}

function mapStateToProps(state) {
  return {
    provider: state.provider
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeView))
