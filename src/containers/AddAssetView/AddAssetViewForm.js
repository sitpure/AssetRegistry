import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AddAssetViewFirstPage from './AddAssetViewFirstPage'
import AddAssetViewSecondPage from './AddAssetViewSecondPage'
import AddAssetViewThirdPage from './AddAssetViewThirdPage'
import AddAssetViewForthPage from './AddAssetViewForthPage'
import metaMaskImg from 'assets/images/metamask.png'
import { styles, modalStyles } from './styles.scss'

/* actions */
import * as uiActionCreators from 'core/actions/actions-ui'
import * as assetActionCreators from 'core/actions/actions-asset'

class AddAssetViewForm extends Component {
    
    constructor(props) {
        super(props)
        this.nextPage = this.nextPage.bind(this)
        this.previousPage = this.previousPage.bind(this)
        this.firstPage = this.firstPage.bind(this)
        this.state = {
            page: 1
    }
    
    }
    nextPage(e) {

        this.setState({ page: this.state.page + 1 })
    }

    previousPage(e) {
        this.setState({ page: this.state.page - 1 })
    }

    firstPage(e) {
        e.preventDefault();
        const { actions } = this.props
        actions.asset.clear()
        this.setState({ page: 1 })
        return true;
    }

    render() {
        const { onSubmit } = this.props
        const { page } = this.state
  
        return (<div className="add-asset-view-form-container">
            {page === 1 && <AddAssetViewFirstPage onSubmit={this.nextPage} />}
            {page === 2 && <AddAssetViewSecondPage firstPage={this.firstPage.bind(this)} previousPage={this.previousPage} onSubmit={this.nextPage} />}
            {page === 3 && <AddAssetViewThirdPage firstPage={this.firstPage.bind(this)} previousPage={this.previousPage} onSubmit={this.nextPage} />}
            {page === 4 && <AddAssetViewForthPage firstPage={this.firstPage.bind(this)} previousPage={this.previousPage} onSubmit={this.onSubmit} />}
            </div>
        )        
    }

}

AddAssetViewForm.propTypes = {
    actions: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        asset: state.asset,
        actions: state.actions,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            ui: bindActionCreators(uiActionCreators, dispatch),
            asset: bindActionCreators(assetActionCreators, dispatch),
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddAssetViewForm)

