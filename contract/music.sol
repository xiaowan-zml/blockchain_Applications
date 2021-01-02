//SPDX-License-Identifier: music
pragma solidity ^0.6.2;

contract music {
    uint256 public test1;   //保存指定地址的合约的余额
    struct Music {
        uint256 id;
        address payable author;
        uint256 date;
        string music;
        address maddress;
        uint256 price;
        bytes32[] hashtags;  //音乐的标签，里面可以存好多音乐
    }

    event MusicAdded(uint256 indexed id, address indexed author, uint256 indexed date, string music,address maddress, bytes32[] hashtags,uint256 price);

    mapping(address => bytes32[]) public boughtHashtags;
    mapping(bytes32 => uint256) public hashtagScore; // The number of times this hashtag has been used, used to sort the top hashtags
    mapping(bytes32 => Music[]) public musicByHashtag;
    mapping(uint256 => Music) public musicById;
    mapping(bytes32 => Music) public musicById1;
    mapping(bytes32 => bool) public doesHashtagExist;
    mapping(address => bool) public doesUserExist;
    address[] public users;
    Music[] public musics;
    bytes32[] public hashtags;
    uint256 public latestMusicId;

constructor() public payable{
    test1 = 0;
        
    }
    
    //添加音乐
    function addMusic(string memory _music, bytes32[] memory _hashtags,uint256 _price) public {
        require(bytes(_music).length > 0, 'The music cannot be empty');
        Music memory newMusic = Music(latestMusicId, msg.sender, now, _music,msg.sender,_price,_hashtags);

        if(_hashtags.length == 0) {
            musicByHashtag['general'].push(newMusic);
            hashtagScore['general']++;
            if(!doesHashtagExist['general']) {
                hashtags.push('general');
                doesHashtagExist['general'] = true;
            }
            newMusic.hashtags[0] = 'general';
        } else {
            for(uint256 i = 0; i < _hashtags.length; i++) {
                musicByHashtag[_hashtags[i]].push(newMusic);
                hashtagScore[_hashtags[i]]++;
                if(!doesHashtagExist[_hashtags[i]]) {
                    hashtags.push(_hashtags[i]);
                    doesHashtagExist[_hashtags[i]] = true;
                }
            }
        }
        hashtags = sortHashtagsByScore();
        musicById[latestMusicId] = newMusic;
        musics.push(newMusic);
        if(!doesUserExist[msg.sender]) {
            users.push(msg.sender);
            doesUserExist[msg.sender] = true;
        }
        emit MusicAdded(latestMusicId, msg.sender, now, _music,msg.sender, _hashtags,_price);
        latestMusicId++;
    }

// // 定义一个修饰符，检查支付的金额是否足以覆盖价格
//      modifier paidEnough(uint _price) { 
//     require(msg.value >= _price); 
//     _;
//   }
  

  
    function buyToHashtag(bytes32 _hashtag) public payable{
        //未实现:在购买那里加一个一旦下载一次就向music.address转账，转账金额以每一个创作者填的价格为准
        //paidEnough(musicById1[_hashtag].price);
        if(!checkExisting(_hashtag)) {
        if(!checkExistingBuy(_hashtag)) {
            boughtHashtags[msg.sender].push(_hashtag);
             
            address payable addr = address(uint160(0x565486818BD325ab280BB206560D6aB236353352));
        //输入地址，给相应地址转账5 个以太币，这里是的单位是Gwei,addr是收款地址
        addr.transfer(5* 10**18);
    
    
            hashtagScore[_hashtag]++;
            hashtags = sortHashtagsByScore();
        }
    }
}
//输入地址，获取整个地址的余额
    function getblance(address payable addr)public payable returns(uint256 test1){
        test1 = addr.balance;
    }
    
    function getTopHashtags(uint256 _amount) public view returns(bytes32[] memory) {
        bytes32[] memory result;
        if(hashtags.length < _amount) {
            result = new bytes32[](hashtags.length);
            for(uint256 i = 0; i < hashtags.length; i++) {
                result[i] = hashtags[i];
            }
        } else {
            result = new bytes32[](_amount);
            for(uint256 i = 0; i < _amount; i++) {
                result[i] = hashtags[i];
            }
        }
        return result;
    }

   
    function getFollowedHashtags() public view returns(bytes32[] memory) {
        return boughtHashtags[msg.sender];
    }

   
    function getMusicIdsByHashtag(bytes32 _hashtag, uint256 _amount) public view returns(uint256[] memory) {
        uint256[] memory ids = new uint256[](_amount);
        for(uint256 i = 0; i < _amount; i++) {
            ids[i] = musicByHashtag[_hashtag][i].id;
        }
        return ids;
    }


    function getMusicById(uint256 _id) public view returns(uint256, address, uint256, string memory,string memory, bytes32[] memory,uint256) {
        Music memory c = musicById[_id];
     //未实现:如果这个人买了，就返回maddress,如果没有就返回null
        return (c.id, c.author, c.date, c.music,"null", c.hashtags,c.price);
    }

   
    function sortHashtagsByScore() public view returns(bytes32[] memory) {
        bytes32[] memory _hashtags = hashtags;
        bytes32[] memory sortedHashtags = new bytes32[](hashtags.length);
        uint256 lastId = 0;
        for(uint256 i = 0; i < _hashtags.length; i++) {
            for(uint j = i+1; j < _hashtags.length; j++) {
                if(hashtagScore[_hashtags[i]] < hashtagScore[_hashtags[j]]) {
                    bytes32 temporaryhashtag = _hashtags[i];
                    _hashtags[i] = _hashtags[j];
                    _hashtags[j] = temporaryhashtag;
                }
            }
            sortedHashtags[lastId] = _hashtags[i];
            lastId++;
        }
        return sortedHashtags;
    }

    
    function checkExistingBuy(bytes32 _hashtag) public view returns(bool) {
        for(uint256 i = 0; i < boughtHashtags[msg.sender].length; i++) {
            if(boughtHashtags[msg.sender][i] == _hashtag) return true;
        }
        return false;
    }
    
    function checkExisting(bytes32 _hashtag) public view returns(bool) {
        for(uint256 i = 0; i < hashtags.length; i++) {
            if(hashtags[i] == _hashtag) return true;
        }
        return false;
    }
}
