import constants        from 'core/types'
import contract         from 'truffle-contract'
import AssetRepo from 'contracts/AssetRepo.json'
import sha256           from 'sha256'
import ipfs from 'core/utils/util-ipfs';

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

export function addAsset(assetURLData, assetImgBuffer, assetHash) {
  return {
    type: constants.ADD_ASSET,
      assetURLData: assetURLData,
      assetImgBuffer: assetImgBuffer,
      assetHash: assetHash
  }
}

export function addAssetHash(assetHash) {
    return {
        type: constants.ADD_ASSET_HASH,
        assetHash: assetHash
    }
}


export function setAssetData(desc, tags, price, name, email){
    return {
        type: constants.ADD_ASSET_DETAILS,
        desc: desc,
        tags: tags,
        price: price,
        name: name,
        email: email
    }
}

export function clear() {
  return {
    type: constants.CLEAR_ASSETS
  }
}


function _checkIfRegistered(AssetRepoContract, assetHash, resolve, reject) {

  AssetRepoContract.deployed().then((poe) => {
    return poe.checkIfRegistered(assetHash)
  })
  .then((exists) => {
    const assetExists = exists ? true : false
    resolve(assetExists)
  })
  .catch((error) => {
    reject(error)
  })
}

function _register(AssetRepoContract, assetImgBuffer, assetHash, desc, tags, price, name, email, resolve, reject) {
    AssetRepoContract.deployed().then((poe) => {
            // 'files' will be an array of objects containing paths and the multihashes of the files added
            return poe.registerAsset(assetHash, desc, tags, price, name, email) 
  })
  .then(result => {
    const transaction = (result !== null) ? result : null
    resolve(transaction)
  })
  .catch((error) => {
    reject(error)
  })
}


// send redux reducer a message that some data has been changed. 
function dispatchAssetAlreadyExists(dispatch) {
  dispatch((() => {
    return {
      type: constants.CHECK_ASSET,
      alreadyExists: true
    }
  })())
}

function dispatchAssetDoesNotExist(assetHash, dispatch) {
  dispatch((() => {
    return {
      type: constants.CHECK_ASSET,
      alreadyExists: false,
      assetHash: assetHash
    }
  })())
}





// dispatch to reducer so that reducer can update redux store 
function dispatchAssetCreated(transaction,id, assetHash, desc, tags, price, name, email, dispatch) {
  dispatch((() => {
    return {
      type: constants.CREATE_ASSET,
        success: true,
        error : null,
        transaction, id, assetHash, desc, tags, price, name, email      
    }
  })())
}

function dispatchCreationError(transaction, dispatch) {
  dispatch((() => {
    return {
        type: constants.CREATE_ASSET,
        error: null,
        transaction: transaction,
      success: false
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


export function checkIfRegistered(assetHash) {
    return (dispatch, getState) => {

    
    return new Promise((resolve, reject) => {
        _checkIfRegistered(getAssetRepoContract(getState), assetHash, resolve, reject)
    })
    .then((assetExists) => {
      if (assetExists) {
        dispatchAssetAlreadyExists(dispatch)
      } else {
        dispatchAssetDoesNotExist(assetHash, dispatch)
      }
    })
    .catch((error) => {
      dispatchError(error, dispatch)
    })
  }
}
//https://truffleframework.com/docs/truffle/getting-started/interacting-with-your-contracts
export function register() {
  return (dispatch, getState) => {
      const { assetImgBuffer, assetHash, desc, tags, price, name, email } = getState().asset

      return new Promise((resolve, reject) => {
          ipfs.files.add(assetImgBuffer, function (err, files) {
              _register(getAssetRepoContract(getState), assetImgBuffer, assetHash, desc, tags, price, name, email, resolve, reject)
          })
    })
        .then((result) => {
            if (result && result.receipt && result.receipt.status == "0x1") {
                for (var i = 0; i < result.logs.length; i++) {
                    var log = result.logs[i];
                    if (log.event == "AssetRegisteredEvent") {
                        dispatchAssetCreated(result, log.args.id.toNumber(), log.args.assetHash, log.args.desc, log.args.tags, log.args.price.toNumber(), log.args.ownerName, log.args.ownerEmail, dispatch)
                        break;
                    }
                }                 
              } else {
                dispatchCreationError(result, dispatch) 
              }
          }).catch((error) => {
              dispatchError(error, dispatch)
          })
  }
}

