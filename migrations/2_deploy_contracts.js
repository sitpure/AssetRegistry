var AssetRepo = artifacts.require("./AssetRepo.sol");

module.exports = function(deployer) {
    deployer.deploy(AssetRepo);
};
