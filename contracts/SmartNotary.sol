pragma solidity ^0.4.4;


contract SmartNotary
{
    struct FileDetails {
        uint timestamp;
        address owner;
    }

    address notaryOwner = msg.sender;
    
    mapping (string => FileDetails) files;
    
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
        logFileAddedStatus(true, block.timestamp, msg.sender, fileHash);

    }
    //this is used to get file information
    function get(string fileHash) constant returns (uint timestamp, address owner){
        return (files[fileHash].timestamp, files[fileHash].owner);
    }

    function withdraw() onlyBy(notaryOwner) {
        msg.sender.transfer(this.balance);
    }


}
