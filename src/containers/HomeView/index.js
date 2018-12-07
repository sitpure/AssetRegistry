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
                <span>A proof of concept to showcase that asset in digitalised form can be registered on blockchain to be accessed later.</span>
                <br /><br />
                <h3> Notes and assumptions for this demo </h3>

                <ul>
                    <li>Authorization and Authenticity of the actual assets and their digitalization are handled outside this application by relevant authorities</li>
                    <li>Only authorised people can upload documents</li>
                    <li>Only image files are accepted in this version of application</li>
                </ul>
                <br />

                <h3> Possible use cases </h3>
                <ul>
                    <li>Land Registry - Land Registry department can upload land registry document to blockchain to be accessed by public</li>
                    <li>Birth, Death, Cast and other certificates - Respective authorities can upload certificate to blockchain to be accessed by public</li>
                    <li>University Degree - Universities can upload degree certificates to blockchain to be accessed by public</li>
                    <li>Asset Digitization - Custodian of physical assets such as art, collectibles can issue certificat of ownership and possession to blockchain and made it available for trading in open market or further asset tokenization</li>
                </ul>
                <br />
                <h3> How to use this demo application </h3>
                <ul>
                    <li>Install metamask chrome extension and create wallet by following instructions from 
                    <a href="https://blog.wetrust.io/how-to-install-and-use-metamask-7210720ca047" target="_blank"> this</a> blog post</li>

                    <li>In metamask, switch to Kovan testnet networks by clicking "Main Network" in the left hand corner of the wallet pop up screen, and selecting Kovan Test Network</li>
                    <li>Obtain faucet (dummy ETH) from <a href="https://gitter.im/kovan-testnet/faucet" target="_blank">Kovan Testnet Gitter</a> by pasting your wallet account number to chat window. In few minutes your wallet will be credited with few faucet</li>
                    <li>To register new asset, follow below steps
                        <ul>
                        <li>From top menu of this application, click on Register Asset link</li>
                        <li>Upload the asset certificate image</li>
                        <li>Enter asset specific details in the form and click Next button</li>
                        <li>Review the details and click Next button</li>
                        <li>Chrome will present metamask dialog box with estimated gas fees for submitted transaction</li>
                        <li>Click Confirm button and wait for a minute. Metamask will present transaction confirmation notification at the bottom right corner of the screen</li>
                        </ul>
                    </li>
                    <li>From top menu of this application, click on Assets link to browse existing registered assets</li>
                    
                </ul>
                <br />
                Please note that after registering asset, it takes a while for asset to appear in asset list. This time is depends on transaction confirmation time of the network.
                 <br /> <br /> <br />
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
