
pragma solidity ^0.4.18;

pragma experimental ABIEncoderV2;

contract AssetRepo {

  struct Asset{
		string desc;
		string tags;
		uint32 id;
		uint32 price;
		string assetHash;		
	}	
	
	
	struct Transaction {
		string id;
		address from;
		address to;
		uint32  tr_date;
		uint32 price;
	}

	struct AssetOwner{
		string name;
		string email;
		address owner;
		uint32 ownerSince;
	}

	struct Data {
		uint32 [] assets;
		uint32 [] purchases;
		uint32 [] sales;	
	}

	
   mapping (address => Data) private allData;
   mapping (uint32 => Asset) private assets;
   uint32[] assets_key;
   
   mapping (string => uint32) private assets_hash;
   mapping (uint32 => AssetOwner[]) private assetOwners;
   mapping (uint32 => Transaction) private transactions;
   
  function checkIfRegistered(string assetHash) constant returns (bool) {
    return assets_hash[assetHash] > 0;
  }
  
  function calculaions2() constant returns (uint32) {
    return 23;
  }
   
   
  event AssetRegisteredEvent(uint32 id, string assetHash, string desc, string tags, uint32 price, string ownerName, string ownerEmail);
  

  function registerAsset(string assetHash, string desc, string tags, uint32 price, string ownerName, string ownerEmail) public {
	//require(assetHash.length >= 10);		
	Asset memory asset;
	
	asset.id = uint32(random() + assets_key.length); // random number workaround
	asset.desc = desc;
	asset.tags = tags;
	asset.price = price;
	asset.assetHash = assetHash;
	assets_key.push(asset.id); // solidity does not allow to iterate mappings. Hence storing keys  
    assets_hash[assetHash] = asset.id; // opps, too much of duplicate data just because no iteration allowed in solidity
	assets[asset.id] = asset;	
    allData[msg.sender].assets.push(asset.id);
	transferAsset(asset.id, msg.sender, ownerName, ownerEmail);

	// it is not possible to modify data and return result same time. Alternative is to raise event
	AssetRegisteredEvent(asset.id, assetHash, desc, tags, price, ownerName, ownerEmail);
  }
  
  
  function transferAsset(uint32 assetId, address newOwner, string ownerName, string ownerEmail) public{
	  AssetOwner memory nOwner;
	  nOwner.owner = newOwner;
	  nOwner.ownerSince =uint32(now);
	  nOwner.email = ownerEmail;
	  nOwner.name = ownerName;

	  assetOwners[assetId].push(nOwner); 
  }

  
  function getAssetCount() public view returns (uint32) {
      return uint32(assets_key.length);
  }
  
  function getAssetId(uint32 index) public view returns (uint32)  {
	return assets_key[index];
  }
  
  
  
  function getAssetIds() public view returns (uint32[]) {
      return assets_key;
  }


  function getAssetByIndex(uint32 index) public view returns (string desc, string tags,uint32 id,uint32 price, string assetHash)  {

	  Asset memory a = assets[assets_key[index]];

	  return (a.desc, a.tags, uint32(a.id), uint32(a.price), a.assetHash);
			
  }
      
  function getAssetById(uint32 id) public view returns (Asset)  {
	return assets[id];		
  }
  
  uint32[] randomnumbers ;
  
  function randowms() public view returns (uint32 []){
     
     for(uint32 i = 0; i < 100; i++) {
		randomnumbers.push(random() + i );		
	}
      return randomnumbers;
  }
  
  function random() public view returns (uint32) {
  // This is very basic random number generator. It returns same number if you call it multiple times in quick succession	
		return uint32(uint32(keccak256(abi.encodePacked(block.timestamp + now, block.difficulty))));
   }
   
}
