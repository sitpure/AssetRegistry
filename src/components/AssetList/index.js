import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Asset from 'components/Asset'
import { styles } from './styles.scss'

class AssetList extends Component {


    render() {

        const { assetList, assetClicked } = this.props
        var items = assetList.items;
        if (assetList.error) {
            return (
                <div className="notification">
                    <h2>Sorry, there's an error!</h2>
                    <br />
                    <span className="error">{assetList.error.message}. Please logged into Metamask and refresh the page.</span>
                    
                </div>
            )
        } else {

            //https://codepen.io/jensimmons/pen/BKPGov?editors=1100
            return (
                <div className={styles}>
                    <ul>
                        {items.map((item) => (
                            <li key={item.id}>
                                <Asset {...item} key={item.id} onClick={() => assetClicked(item.id)} />
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }

    }
}

AssetList.propTypes = {    
    assetList: PropTypes.object,
    assetClicked: PropTypes.func
}

export default AssetList