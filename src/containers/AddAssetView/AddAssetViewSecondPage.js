// https://redux-form.com/6.0.1/examples/material-ui/  form and validation ref

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { Field, reduxForm, SubmissionError, formValueSelector, formValues   } from 'redux-form'
import { renderField, renderTextField} from './renderField'
import Button from 'components/Button'
import { styles } from './styles.scss'
/* actions */
import * as uiActionCreators from 'core/actions/actions-ui'
import * as assetActionCreators from 'core/actions/actions-asset'



//https://redux-form.com/7.4.2/examples/fieldlevelvalidation/
const required = value => (value || typeof value === 'number' ? undefined : 'Required')

const maxLength = max => value =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined
export const minLength = min => value =>
    value && value.length < min ? `Must be ${min} characters or more` : undefined

const number = value =>
    value && isNaN(Number(value)) ? 'Must be a number' : undefined

const minValue = min => value =>
    value && value < min ? `Must be at least ${min}` : undefined

const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Invalid email address'
        : undefined

const alphaNumeric = value =>
    value && /[^a-zA-Z0-9 ]/i.test(value)
        ? 'Only alphanumeric characters'
        : undefined

export const minLength2 = minLength(2)
const maxLength15 = maxLength(15)
const minValue13 = minValue(13)


class AddAssetViewSecondPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            nextBtnDisabled: true
        }
    }


    render() {

        const { handleSubmit, invalid, valid, pristine, reset, submitting, previousPage, asset } = this.props        
        return (
            <div id="registration-details" className={styles}>
                <h2>Enter Asset Details</h2>
                <form onSubmit={handleSubmit(this.submit.bind(this))}>
                    <Field name="name" className="form-field" component={renderTextField} label="Asset Owner" maxLength="100" validate={[required, alphaNumeric]} />
                    <Field name="email" className="form-field" component={renderTextField} label="Email" maxLength="50" validate={[required, email]} />
                    <Field name="desc" className="form-field" component={renderTextField} label="Asset Description" maxLength="250" />
                    <Field name="tags" className="form-field" component={renderTextField} label="Tags" maxLength="100" />
                    <Field name="price" className="form-field" component={renderTextField} label="Price (USD)" type="number" />                    
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
                            disabled={pristine || !valid}
                            className="btn-next"
                        />
                    </div>
                </form>
            </div>
        )
    }

    submit(values) {
        const { actions, handleSubmit } = this.props

        /*
        const selector = formValueSelector('wizard')
        const ItemList = formValues('name')(this)

        values: selector({}, 'name', 'email', 'desc', 'tags', 'price')
        */
            return new Promise((resolve, reject) => {
                actions.asset.setAssetData(values.desc, values.tags, values.price? parseInt(values.price, 10): null, values.name, values.email)
                handleSubmit()
            }).catch((error) => {
                throw new SubmissionError(error);
            });
        }    
}

AddAssetViewSecondPage.propTypes = {
    actions: PropTypes.object,
    initialValues: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
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
    enableReinitialize: true,
    //initialValues: {
    //    name: "new name", email: "new@name.com", desc: "new name desc", tags: "new tags", price: 10,
    //},
    //validate
})(connect(mapStateToProps, mapDispatchToProps)(AddAssetViewSecondPage))
