// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'
import { default as sha1 } from "sha1"

// Import our contract artifacts and turn them into usable abstractions.
import SmartNotary_artifacts from '../../build/contracts/SmartNotary.json'

// SmartNotary is our usable abstraction, which we'll use through the code below.
var SmartNotary = contract(SmartNotary_artifacts);

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;

window.App = {
  start: function() {
    var self = this;

    // Bootstrap the SmartNotary abstraction for Use.
    SmartNotary.setProvider(web3.currentProvider);
    
    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      account = accounts[0];
      SmartNotary.defaults({from: account});
      self.setStatus("Init");
    });
  },

  setStatus: function(message) {
    var status = document.getElementById("status");
    status.innerHTML = message;
  },
  
  setTxMessage: function(data, hash) {
      if(data[0] == 0 && data[1] == "") {
          self.setStatus("File not found");
      } else {
          var newDate = new Date();
          newDate.setTime(data[0]*1000);
          var dateString = newDate.toUTCString();
          this.setStatus("Timestamp: " + dateString + "<br>Owner: " + data[1] + "<br>file hash:" + hash);
      }
  },

  get: function() {
      var self = this;
      var file = document.getElementById("file").files[0];
      if(file) {
        var reader = new FileReader();
        reader.onload = function (event) {
            var hash = sha1(event.target.result);
            SmartNotary.deployed().then(function(instance) {
                return instance.get(hash);
            }).then(function(data){
                self.setTxMessage(data, hash);
        });
        };
        reader.readAsText(file);
      } else {
        alert("Please select a file");
      }
  },

  withdraw: function() {
      var self = this;
      SmartNotary.deployed().then(function(instance) {
          return instance.withdraw();
      }).then(function(result){
          self.setStatus("withdraw processed<br>result:" + JSON.stringify(result, null, 4));
      });
  },

  set: function() {
        var self = this;
    
        this.setStatus("Initiating transaction... (please wait)");
    
        var meta;
        
        var file = document.getElementById("file").files[0];
        if(file) {
                var reader = new FileReader();
                reader.onload = function (event) {
                    var fileHash = sha1(event.target.result);
                    SmartNotary.deployed().then(function(instance) {
                       return instance.set(fileHash, {value: web3.toWei(document.getElementById("amount").value, "ether")});
                    }).then(function(result) {
                        self.setStatus("added fileHash" + fileHash + "<br>result:" + JSON.stringify(result, null, 4));
                    }).catch(function(e) {
                        console.log(e);
                        self.setStatus("Error invoking contract; see log.");
                    });
                };
                reader.readAsText(file);

        } else {
            alert("Please select a file");
        }
  },

};


window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 ReportBallot, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  App.start();
});
