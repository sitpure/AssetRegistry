import React, { Component }                 from 'react'
import PropTypes                            from 'prop-types'
import { DropTarget as reactDnDDropTarget}  from 'react-dnd'
import Button                               from 'components/Button'
import Icon                                 from 'components/Icon'

const boxTarget = {
  drop(props, monitor) {
    if (props.onDrop) {
      props.onDrop(props, monitor)
    }
  }
}

@reactDnDDropTarget(props => props.accepts, boxTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))
class DropTarget extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    accepts: PropTypes.arrayOf(PropTypes.string).isRequired,
    onDrop: PropTypes.func
  }

  constructor(props) {
    super(props)

    this.state = {
      files: []
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.files !== this.props.files) {
      this.setState({ files: nextProps.files })
    }
  }

  getFileList(files) {
      const list = files.map(file =>
        /*
        <li key={file.name}>
          {`${file.name}, of size ${file.size}, and type ${file.type}`}
        </li>*/
          <li key={file.name}>
              {`${file.name}`}
          </li>
      )

    return <ul id="file-list">{list}</ul>
  }

  getHelperText=() => {
    let helperText
    const { files } = this.state
    const isActive = this.isActive()

    if (isActive) {
      helperText = 'Release to drop'
    } else if (!isActive && files.length === 0) {
      helperText = 'or drag asset image here'
    }

    return <span>{helperText}</span>
  }

  render() {
    const { connectDropTarget} = this.props
    const { files } = this.state
    const fileList = this.getFileList(files)
    const isActive = this.isActive()
    const helperText = this.getHelperText()
    const containerClassName = isActive ? 'drop' : ''
    //const disabled = files.length === 0 ? false : true
    const disabled = false  // we want upload to be active all the times so that user can change Asset Image if required
    return connectDropTarget(
      <div id="upload-container" className={containerClassName}>
        <div id="upload-actions">
          <Icon icon="upload" className="upload-icon" />
                    <Button
                    type="raised-button"
                        label="Upload Asset Image"
                        onClick={this.showUploadDialogBox}
                        primary
                        className="btn-next"
                    />
          <input
            name="myFile"
            type="file"
            ref={(input) => { this.inputElement = input }}
            onChange={this.handleFileUpload} />
                <div id="upload-text">
          {fileList}
                    {helperText}
                    </div>
        </div>
      </div>
    )
  }

  showUploadDialogBox=() => {
    const { files } = this.props
      event.preventDefault();
    if (files.length === 0) {
      this.inputElement.click()
    }
      return false;
  }

    handleFileUpload = (evt) => {
      
    const files = evt.target.files
    const { onDrop, setUploadedFile } = this.props

    if (files.length) {
      onDrop()
      setUploadedFile(files)
      this.setState({ files: [files[0]] })
    }
  }

  isActive=() => {
    const { canDrop, isOver } = this.props
    return canDrop && isOver
  }
}

DropTarget.propTypes = {
  files: PropTypes.array,
  setUploadedFile: PropTypes.func
}

export default DropTarget
