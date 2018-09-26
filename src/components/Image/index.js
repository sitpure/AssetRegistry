import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Paper } from 'material-ui'
import imagePlaceholderSvg from 'assets/images/image-placeholder.svg'
import ProgressIndicator from 'components/ProgressIndicator'

/* component styles */
import { styles } from './styles.scss'

class Image extends Component {
    constructor(props) {
        super(props)
        this.state = {
            src: this.props.src,
            mainImage: null,
            imageContainer: <ProgressIndicator
                type="circle"
                size={60}
                thickness={6} />
        }
    }

    componentDidMount() {
        this.setImage()
        this.showImage()
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ src: nextProps.src })
        // let current thread to finish before rendering image
        setTimeout(() => {
            this.setImage()
            this.showImage()
        }, 50)
    }

    render() {
        const { imageContainer } = this.state

        return (
            <div className={styles}>
                         {imageContainer}
            </div>
        )
    }

    setImage = () => {
        const { src } = this.state
        if (!src ) {
            this.setState({ mainImage: <img src={imagePlaceholderSvg} className="img-placeholder" /> })
        } else {
            this.setState({
                mainImage: <img className="img-uploaded" src={src} ref={img => this.img = img} onError={() => { this.img.src = imagePlaceholderSvg; this.img.className = "img-placeholder" } } /> })
        }
    }

    showImage = () => {
        setTimeout(() => {
            const { mainImage } = this.state
            this.setState({ imageContainer: mainImage })
        }, 500)
    }
}

function mapStateToProps(state) {
    return {
        src: state.src
    }
}
Image.propTypes = {
    src: PropTypes.string
}

export default Image
