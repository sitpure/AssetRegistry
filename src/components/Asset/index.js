import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Image from 'components/Image'
import { styles } from './styles.scss';

class Asset extends Component {

    render() {
        const { onClick, desc, id, tags, price, name, email, assetHash } = this.props
        return (
            <div onClick={onClick} key={id} className={styles} >
                <div className="item"  >
                    <div className="desc">{desc}</div>
                    <Image src={"https://gateway.ipfs.io/ipfs/" + assetHash}> </Image>
                </div>
            </div>
        )
    }
}

Asset.propTypes = {    
    onClick: PropTypes.func,
    desc: PropTypes.string,  
    id: PropTypes.number,
    tags: PropTypes.string,
    price: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    assetHash: PropTypes.string
}

export default Asset

