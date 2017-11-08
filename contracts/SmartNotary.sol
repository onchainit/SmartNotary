pragma solidity ^0.4.4;


contract SmartNotary
{

    struct Bid {
        address bidder;
        uint value;
    }

    struct FileDetails {
        uint timestamp;
        address owner;
    }

    address notaryOwner = msg.sender;

    mapping (string => Bid[]) bids;
    
    mapping (string => FileDetails) files;

    uint fees;
    
    event logFileAddedStatus(bool status, uint timestamp, address owner, string fileHash);

    modifier onlyBy(address _account)
    {
        require(msg.sender == _account);
        _;
    }

    //this is used to store the owner of file at the block
    function set(string fileHash) payable
    {
        require(files[fileHash].timestamp == 0);
        require(msg.value >= 0.1 ether );
        files[fileHash] = FileDetails(block.timestamp, msg.sender);
        fees = fees + msg.value;
        logFileAddedStatus(true, block.timestamp, msg.sender, fileHash);

    }
    //this is used to get file information
    function get(string fileHash) constant returns (uint timestamp,
                                                    address owner,
                                                    address[] returnBidders,
                                                    uint[] returnBidValues,
                                                    bool youOwn){
        address[] memory bidders = new address[](bids[fileHash].length);
        uint[] memory bidValues = new uint[](bids[fileHash].length);

        if(msg.sender == files[fileHash].owner) {

            for (uint i; i < bids[fileHash].length; i++) {
                bidders[i] = (bids[fileHash][i].bidder);
                bidValues[i] = (bids[fileHash][i].value);
            }
            return (files[fileHash].timestamp, files[fileHash].owner, bidders, bidValues, true);
        } else {

            for (uint j; j < bids[fileHash].length; j++) {
                if (bids[fileHash][j].bidder == msg.sender) {
                    bidders[j] = (bids[fileHash][j].bidder);
                    bidValues[j] = (bids[fileHash][j].value);
                }
            }
            return (files[fileHash].timestamp, files[fileHash].owner, bidders, bidValues, false);
        }
    }

    function withdraw() onlyBy(notaryOwner) {
        msg.sender.transfer(fees);
    }

    function offer(string fileHash) payable {
        require(files[fileHash].timestamp != 0);
        require(files[fileHash].owner != msg.sender);
        require(bids[fileHash].length < 5);
        for (uint i = 0; i < bids[fileHash].length; i ++) {
            if(bids[fileHash][i].bidder == msg.sender) {
                revert();
            }
        }
        bids[fileHash].push(Bid(msg.sender, msg.value));
    }

    function acceptOffer(string fileHash, address acceptedBidder) {
        require(files[fileHash].owner == msg.sender);

        for (uint i = 0; i < bids[fileHash].length; i ++) {
            uint transferValue = bids[fileHash][i].value;
            address bidder = bids[fileHash][i].bidder;
            // Remember to zero the pending refund before
            // sending to prevent re-entrancy attacks
            delete bids[fileHash][i];
            if (bidder == acceptedBidder) {
              uint transferFee = 0.1 ether;
              files[fileHash].owner = bidder;
              files[fileHash].timestamp = now;
              fees = fees + transferFee;
              msg.sender.transfer(transferValue - transferFee);

            } else {
                bidder.transfer(transferValue);
            }
        }
        bids[fileHash].length = 0;
    }

    function removeOffer(string fileHash) {
        for (uint i = 0; i < bids[fileHash].length; i ++) {
            if(bids[fileHash][i].bidder == msg.sender) {
                delete bids[fileHash][i];
            }
        }
    }


}
