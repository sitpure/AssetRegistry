import { default as Unixfs } from 'ipfs-unixfs';
import { DAGNode } from 'ipld-dag-pb';
import ipfs from 'core/utils/util-ipfs';


    /**
     *  Generates offline IPFS's multi-hash of a buffered data 
     *
     *  @param    {Object}                  buffer  Buffered content
     *  @return   {Promise<String, Error>}          A promise that resolves with the multihash or rejects with an error
     */
export function getMultiHash(buffer) {

        const unixFs = new Unixfs("file", buffer)
        return new Promise((resolve, reject) => {
            DAGNode.create(unixFs.marshal(), (err, dagNode) => {
                if (err) reject(err)
                else resolve(dagNode.toJSON().multihash)
            })
        })
    }


export function getMultiHashFromFile(assetImgBuffer) {

        return new Promise((resolve, reject) => {
            ipfs.files.add(assetImgBuffer, { onlyHash: true }, function (err, files) {
                resolve(files[0].hash);
             })
        })
        
}


export function getMultiHashFromFilexxx(assetImgBuffer) {

    return new Promise((resolve, reject) => {

    })

}

/*
 * //https://github.com/ipfs/js-ipfs/issues/1205
'use strict'

const series = require('async/series')
const IPFS = require('ipfs')
const {
  DAGNode,
  DAGLink
} = require('ipld-dag-pb')

const node = new IPFS()
let fileMultihash

series([
  (cb) => node.on('ready', cb),
  (cb) => node.version((err, version) => {
    if (err) { return cb(err) }
    console.log('Version:', version.version)
    cb()
  }),
  (cb) => DAGNode.create(Buffer.from('Hello'), (err, dagNode) => {
    if (err) {
      return cb(err)
    }
    const mh = dagNode.toJSON().multihash
    console.log('\nComputed hash (dagnode):', mh)
    cb(null, mh)
  }),
  (cb) => node.object.put(Buffer.from('Hello'), (err, dagNode) => {
    if (err) {
      return cb(err)
    }
    const mh = dagNode.toJSON().multihash
    console.log('\nComputed hash (put):', mh)
    console.log('\nBuffer (put):', dagNode.toJSON().data)
    cb(null, mh)
  }),
  (cb) => node.files.add(Buffer.from('Hello'), (err, filesAdded) => {
    if (err) { return cb(err) }
    console.log('\nAdded file:', filesAdded[0].path, filesAdded[0].hash)
    fileMultihash = filesAdded[0].hash
    cb()
  }),
  (cb) => node.object.get(fileMultihash, (err, dagNode) => {
    if (err) {
      return cb(err)
    }
    console.log('\nBuffer (get after add):', dagNode.toJSON().data)
    cb(null, dagNode.toJSON().multihash)
  }),
  (cb) => node.files.cat(fileMultihash, (err, data) => {
    if (err) { return cb(err) }
    console.log('\nFile content:')
    process.stdout.write(data)
  })
])
 * */