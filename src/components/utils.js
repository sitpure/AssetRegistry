import validator from 'validator';
export const val_required = (value) => {
    if (!value || (props.isCheckable && !props.checked)) {
        return <span className="form-error is-visible">Required</span>;
    }
};

export const val_email = (value) => {
    if (!isEmail(value)) {
        return <span className="form-error is-visible">${value} is not a valid email.</span>;
    }
};

export const val_lt = (value, props) => {
  // get the maxLength from component's props
  if (value.toString().trim().length > props.maxLength) {
    // Return jsx
      return <span className="form-error is-visible">The value exceeded {props.maxLength} symbols.</span>
  }
};

export const val_password = (value, props, components) => {
    const bothUsed = components.password[0].isUsed && components.confirm[0].isUsed;
    const bothChanged = components.password[0].isChanged && components.confirm[0].isChanged;

    if (bothChanged && bothUsed && components.password[0].value !== components.confirm[0].value) {
        return <span className="form-error is-visible">Passwords are not equal.</span>;
    }
};