import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import ProgressIndicator from 'components/ProgressIndicator'
import { Link } from 'react-router-dom'
import { getString } from 'core/utils/util-assets'
import { Field, reduxForm, formValueSelector, SubmissionError  } from 'redux-form'
import renderField from './renderField'
import Button from 'components/Button'

/* component styles */
import { styles, modalStyles } from './styles.scss'

/* actions */
import * as uiActionCreators from 'core/actions/actions-ui'
import * as assetActionCreators from 'core/actions/actions-asset'

class AddAssetViewThirdPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            nextBtnDisabled: true
        }
    }

    render() {
        const { asset, account, alreadyExists, handleSubmit, pristine, previousPage, firstPage, submitting, error} = this.props

        const { assetHash, name, email, desc, tags, price} = asset
        let content = (
                <div id="registration-details">
                    <h2>Confirm Transaction</h2>
                    <div >
                        <ul>
                            <li>
                                <span className="title">Asset Owner:&nbsp;</span>
                                <span>{name}</span>
                            </li>
                            <li>
                                <span className="title">Email:&nbsp;</span>
                                <span>{email}</span>
                            </li>
                            <li>
                                <span className="title">Asset Description:&nbsp;</span>
                                <span>{desc}</span>
                            </li>
                            <li>
                                <span className="title">Tags:&nbsp;</span>
                                <span>{tags}</span>
                            </li>
                            <li>
                                <span className="title">Price:&nbsp;</span>
                                <span>{price}</span>
                            </li>
                            <li>
                                <span className="title">MetaMask ID:&nbsp;</span>
                                <span>{account.id}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            )
                
            return (
                <div>
                    <form onSubmit={handleSubmit(this.submit.bind(this))}>
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
                            <Button
                                type="raised"
                                label="Next"
                                primary
                                className="btn-next"
                            />
                        </div>

                    </form>
                </div>
            )
     }


    submit(values) {
        const { actions, handleSubmit } = this.props
        return new Promise((resolve, reject) => {
            handleSubmit()
        }).catch((error) => {
            throw new SubmissionError(error);
        });
    }
}


AddAssetViewThirdPage.propTypes = {
    account: PropTypes.object,
    actions: PropTypes.object.isRequired,
    alreadyExists: PropTypes.bool,
    asset: PropTypes.object,
}


function mapStateToProps(state) {
    const selector = formValueSelector('wizard')

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

export default reduxForm({
    form: 'wizard',                 // <------ same form name
    destroyOnUnmount: false,        // <------ preserve form data
    forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
    //validate
})(connect(mapStateToProps, mapDispatchToProps)(AddAssetViewThirdPage))



