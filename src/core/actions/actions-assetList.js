import constants        from 'core/types'
import contract         from 'truffle-contract'
import AssetRepo from 'contracts/AssetRepo.json'
import sha256           from 'sha256'

// this thunk perform's a action and updatest redux store


var AssetRepoContract
function getAssetRepoContract(getState) {

    if (typeof AssetRepoContract == 'undefined') {
        const { web3Provider } = getState().provider
        AssetRepoContract = contract(AssetRepo)

        AssetRepoContract.setProvider(web3Provider.currentProvider)
        AssetRepoContract.defaults({ from: web3Provider.eth.defaultAccount })
    }
    return AssetRepoContract;
}

function _getAssetCount(AssetRepoContract, resolve, reject) {
    AssetRepoContract.deployed().then((poe) => {
        return poe.getAssetCount()
    })
        .then((assetCount) => {
            resolve(assetCount)
        })
        .catch((error) => {
            reject(error)
        })
}

function _getAssetByIndex(AssetRepoContract, idx, resolve, reject) {
    AssetRepoContract.deployed().then((poe) => {
        return poe.getAssetByIndex(idx)
    })
        .then((asset) => {
            resolve(asset)
        })
        .catch((error) => {
            reject(error)
        })
}



function dispatchAssetassetCount(assetCount, dispatch) {
    dispatch((() => {
        return {
            type: constants.GET_ASSET_COUNT,
            assetCount: assetCount
        }
    })())
}


function dispatchAsset(asset, dispatch) {
    dispatch((() => {
        return {
            type: constants.GET_ASSET,
            asset: asset
        }
    })())
}

function dispatchError(error, dispatch) {
  dispatch((() => {
    return {
      type: constants.ASSET_ERROR,
      error: error
    }
  })())
}


export const getAssetCount = () => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            _getAssetCount(getAssetRepoContract(getState), resolve, reject)
        })
            .then((assetCount) => {
                    dispatchAssetassetCount(assetCount, dispatch)
            })
            .catch((error) => {
                dispatchError(error, dispatch)
            })
    }
}

export const getAssetByIndex = (idx) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            _getAssetByIndex(getAssetRepoContract(getState), idx, resolve, reject)
        })
            .then((asset) => {
                dispatchAsset(asset, dispatch)
            })
            .catch((error) => {
                dispatchError(error, dispatch)
            })
    }
}
