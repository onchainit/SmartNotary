var SmartNotary = artifacts.require("./SmartNotary.sol");

contract('SmartNotary', function(accounts) {
  it("should set and read file hash", function() {
      var instance;
      return SmartNotary.deployed().then(function(_instance) {
        instance = _instance
        instance.set("myHash", {from: web3.eth.accounts[0]});
        return instance.get("myHash");
      }).then(function(returnValue) {
          assert.strictEqual(returnValue[1], web3.eth.accounts[0], "owner is not web3.eth.accounts[0]");
      });
    });
  it("should set another file hash", function() {
        var instance;
        return SmartNotary.deployed().then(function(_instance) {
          instance = _instance
          instance.set( "myHash2", {from: web3.eth.accounts[1]});
          return instance.get("myHash2");
        }).then(function(returnValue) {
            assert.strictEqual(returnValue[1], web3.eth.accounts[1], "owner is not web3.eth.accounts[1]");
        });
      });
  it("should get both file hash", function() {
          var instance;
          return SmartNotary.deployed().then(function(_instance) {
            instance = _instance
            return instance.get("myHash2");
          }).then(function(returnValue) {
              assert.strictEqual(returnValue[1], web3.eth.accounts[1], "owner is not web3.eth.accounts[1]");
          }).then (function() {
            return instance.get("myHash");
          }).then(function(returnValue) {
            assert.strictEqual(returnValue[1], web3.eth.accounts[0], "owner is not web3.eth.accounts[0]");
          });
  });
  
});
