var SmartNotary = artifacts.require("./SmartNotary.sol");

contract('SmartNotary', function(accounts) {
  it("should set and read file hash", function() {
      var instance;
      return SmartNotary.deployed().then(function(_instance) {
        instance = _instance
        instance.set("myHash", {from: web3.eth.accounts[0], value: web3.toWei("0.1", "ether")});
        return instance.get("myHash");
      }).then(function(returnValue) {
          assert.strictEqual(returnValue[1], web3.eth.accounts[0], "owner is not web3.eth.accounts[0]");
      });
    });
  it("should set another file hash", function() {
        var instance;
        return SmartNotary.deployed().then(function(_instance) {
          instance = _instance
          instance.set( "myHash2", {from: web3.eth.accounts[1], value: web3.toWei("0.2", "ether")});
          return instance.get("myHash2");
        }).then(function(returnValue) {
            assert.strictEqual(returnValue[1], web3.eth.accounts[1], "owner is not web3.eth.accounts[1]");
        });
      });
  it("should revert w/ less than 0.1 eth", function() {
          var instance;
          return SmartNotary.deployed().then(function(_instance) {
            instance = _instance
            return instance.set( "myHash23", {from: web3.eth.accounts[1], value: web3.toWei("0.05", "ether")});
          }).then(function(returnValue) {
              //assert(false, "should fail tx");
          }).catch(function(error) {
              if(error.toString().indexOf("revert") != -1) {
                //console.log("We were expecting a Solidity throw (aka an invalid JUMP), we got one. Test succeeded.");
              } else {
                // if the error is something else (e.g., the assert from previous promise), then we fail the test
                assert(false, error.toString());
              }
          })

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

  it("should revert withdraw from wrong account", function() {

      return SmartNotary.deployed().then(function(instance) {
          return instance.withdraw({from:web3.eth.accounts[3]});
          }).then(function(cap) {
            assert(false, "testThrow was supposed to throw but didn't.");
          }).catch(function(error) {
            if(error.toString().indexOf("revert") != -1) {
              //console.log("We were expecting a Solidity throw (aka an invalid JUMP), we got one. Test succeeded.");
            } else {
              // if the error is something else (e.g., the assert from previous promise), then we fail the test
              assert(false, error.toString());
            }
      });
  });
  it("should withdraw from primary accounts and set correct balances for accounts and contract", function() {
    var instance;
    var account0Balance = parseInt(web3.eth.getBalance(web3.eth.accounts[0]));
    var totalCollectedAmount = web3.toWei("0.3", "ether");
    var expectingAccount0Balance = parseInt(totalCollectedAmount + account0Balance);

    return SmartNotary.deployed().then(function(_instance) {
        instance = _instance;
        return instance.withdraw({from:web3.eth.accounts[0]});
        }).then(function() {
         assert.equal(web3.eth.getBalance(instance.address).valueOf(), 0, "Contract balance wasn't 0");
         //assert.equal(parseInt(web3.eth.getBalance(web3.eth.accounts[1])), expectingAccount0Balance, "Account 1 balance wasn't incremented by withdraw:" + web3.eth.getBalance(web3.eth.accounts[1]).valueOf());
        });

    });

  
});
