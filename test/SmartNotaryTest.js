var SmartNotary = artifacts.require("./SmartNotary.sol");

contract('SmartNotary', function(accounts) {
  it("should set and read file hash", function() {
      var instance;
      return SmartNotary.deployed().then(function(_instance) {
        instance = _instance
        instance.set("me", "myHash");
        return instance.get("myHash");
      }).then(function(returnValue) {
          assert.strictEqual(returnValue[1], "me", "owner is not me");
      });
    });
  it("should set another file hash", function() {
        var instance;
        return SmartNotary.deployed().then(function(_instance) {
          instance = _instance
          instance.set("te", "myHash2");
          return instance.get("myHash2");
        }).then(function(returnValue) {
            assert.strictEqual(returnValue[1], "te", "owner is not me");
        });
      });
  it("should get both file hash", function() {
          var instance;
          return SmartNotary.deployed().then(function(_instance) {
            instance = _instance
            return instance.get("myHash2");
          }).then(function(returnValue) {
              assert.strictEqual(returnValue[1], "te", "owner is not me");
          }).then (function() {
            return instance.get("myHash");
          }).then(function(returnValue) {
            assert.strictEqual(returnValue[1], "me", "owner is not me");
          });
  });
  
});
