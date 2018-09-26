import React from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import Checkbox from 'material-ui/Checkbox'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'


    export const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
        <TextField hintText={label}
            floatingLabelText={label}
            errorText={touched && error}
            {...input}
            {...custom}
        />
    )

    export const renderCheckbox = ({ input, label }) => (
        <Checkbox label={label}
            checked={input.value ? true : false}
            onCheck={input.onChange} />
    )

    export const renderRadioGroup = ({ input, ...rest }) => (
        <RadioButtonGroup {...input} {...rest}
            valueSelected={input.value}
            onChange={(event, value) => input.onChange(value)} />
    )

    export const renderSelectField = ({ input, label, meta: { touched, error }, children, ...custom }) => (
        <SelectField
            floatingLabelText={label}
            errorText={touched && error}
            {...input}
            onChange={(event, index, value) => input.onChange(value)}
            children={children}
            {...custom} />
    )

export const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} placeholder={label} type={type} />
            {touched && error && <span>{error}</span>}
        </div>
    </div>
)

