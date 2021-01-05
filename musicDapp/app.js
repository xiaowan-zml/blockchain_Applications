console.log("音乐+区块链")

let accounts = [];
let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
console.log("web3", web3)

if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
}

console.log("isMetaMask：" + ethereum.isMetaMask)



// music.sol abi
var contractAbi =[
	{
		"inputs": [],
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "AudienceAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "AudienceRemoved",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "author",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "date",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "music",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "maddress",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "bytes32[]",
				"name": "hashtags",
				"type": "bytes32[]"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "MusicAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OriginatorAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OriginatorRemoved",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "addAudience",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_music",
				"type": "string"
			},
			{
				"internalType": "bytes32[]",
				"name": "_hashtags",
				"type": "bytes32[]"
			},
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_maddress",
				"type": "string"
			}
		],
		"name": "addMusic",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "addOriginator",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_hashtag",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "buyToHashtag",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_hashtag",
				"type": "bytes32"
			}
		],
		"name": "checkExistingBuy",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getFollowedHashtags",
		"outputs": [
			{
				"internalType": "bytes32[]",
				"name": "",
				"type": "bytes32[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getMusicById",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "bytes32[]",
				"name": "",
				"type": "bytes32[]"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_hashtag",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "getMusicIdsByHashtag",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "getTopHashtags",
		"outputs": [
			{
				"internalType": "bytes32[]",
				"name": "",
				"type": "bytes32[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "addr",
				"type": "address"
			}
		],
		"name": "getblance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "hashtags",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "isAudience",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "isOriginator",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "latestMusicId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "musics",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "author",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "date",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "music",
				"type": "string"
			},
			{
				"internalType": "bytes32",
				"name": "maddress",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceAudience",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOriginator",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "sortHashtagsByScore",
		"outputs": [
			{
				"internalType": "bytes32[]",
				"name": "",
				"type": "bytes32[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "test1",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "users",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

var contract = new web3.eth.Contract(contractAbi, "0x29F903Fcb7d2E60f3460Ee7651b9cB066C0fC687");

console.log("contract MyDapp", contract)


$(".enableEthereumButton").click(function () {
    // alert("enableEthereumButton")
    // ethereum.request({ method: 'eth_requestAccounts' });
    getAccount()

}
)

ethereum.on('accountsChanged', function (accounts) {
    console.log("accountsChanged");
    getAccount()
});



async function getAccount() {
    accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    // showAccount.innerHTML = account;
    $(".showAccount").html(account);

}

//==================================结合合约============================================

//添加音乐
$("#btn_addMusic").click(function () {
	_music1 = $('#music1').val();
    _p1 = $('#p1' ).val();
	_a1 = $('#a1' ).val();
	_ha2 = $('#ha2' ).val();
	let numbersarr= eval(_ha2);
    console.log("添加音乐", _music1,numbersarr,_p1,_a1);

    contract.methods.addMusic(_music1,numbersarr,_p1,_a1).send({ from: accounts[0] }).then(
        function (result) {
            console.log("addMusic==>", result);
			console.log("addMusic==>", result.transactionHash);
			alert("添加音乐成功")
			$(".addMusic").html("交易hash为："+result.transactionHash);
        }
    )
}
)

//添加创造者
$("#btn_OriginatorAddr").click(function () {
    _OriginatorAddr = $('#OriginatorAddr' ).val();
    console.log("添加创造者", _OriginatorAddr);

    contract.methods.addOriginator(_OriginatorAddr).send({ from: accounts[0] }).then(
        function (result) {
				console.log("OriginatorAddr==>", result);
            console.log("OriginatorAddr transactionHash==>", result.transactionHash);
			alert("添加创造者成功")
			$(".addOriginator").html("交易hash为："+result.transactionHash);
        }
	)
}
)

//添加观众
$("#btn_AudienceAddr").click(function () {
    _AudienceAddr = $('#AudienceAddr' ).val();
    console.log("添加观众", _AudienceAddr);

    contract.methods.addAudience(_AudienceAddr).send({ from: accounts[0] }).then(
        function (result) {
            console.log("AudienceAddr==>", result);
            console.log("AudienceAddr transactionHash==>", result.transactionHash);
			alert("添加观众成功")
			$(".addAudience").html("交易hash为："+result.transactionHash);
        }
	)
}
)

//获取当前依据下载量排名的相关信息
$("#btn_getTopHashtags").click(function () {
	_amount = $('#amount1').val();
    console.log("获取当前依据下载量排名的相关信息",_amount);

    contract.methods.getTopHashtags(_amount).call({ from: accounts[0] }).then(
        function (result) {
            console.log("getTopHashtags***********", result);
			alert("音乐信息查询成功")
			$(".getTopHashtags").html("标签为："+result);
        }
	)
}
)

//根据文章标签获取该作品的ID
$("#btn_getContentIdsByHashtag").click(function () {
	_hash = $('#hash' ).val();
	_amount = $('#amount').val();
    console.log("查询信息", _hash,_amount);

    contract.methods.getContentIdsByHashtag(_hash,_amount).call({ from: accounts[0] }).then(
        function (result) {
            console.log("getContentIdsByHashtag***********", result);
			alert("音乐信息查询成功")
			$(".getContentIdsByHashtag_id").html("id为："+result[0]);
        }
	)
}
)

//根据ID查询音乐
$("#btn-getMusicById").click(function () {
    _ID = $('#ID').val();
    console.log("根据ID查询音乐信息",_ID);

    contract.methods.getMusicById(_ID).call({ from: accounts[0] }).then(
        function (result) {
            console.log("getMusicById***********", result)
			alert("音乐信息查询成功")
			$(".getMusicById_add").html("创作者账户:"+result[1])
			$(".getMusicById_date").html("发布时间:"+result[2])
			$(".getMusicById_music").html("歌曲名称:"+result[3])
			$(".getMusicById_ipad").html("ipfs存放地址:"+result[4])
			$(".getMusicById_ha").html("音乐标签:"+result[5])
        }
    );
}
)

//购买音乐
$("#btn_buyToHashtag").click(function () {
	_hash = $('#hash1' ).val();
	_id = $('#id1').val();
	
    console.log("购买音乐", _hash,_id);

    contract.methods.buyToHashtag(_hash,_id).send({ from: accounts[0] }).then(
        function (result) {
            console.log("buyToHashtag==>", result);
            console.log("buyToHashtag transactionHash==>", result.transactionHash);
			alert("购买该音乐成功")
			$(".buyToHashtag").html("交易hash为："+result.transactionHash);
        }
    )
}
)

//查询是否给购买该音乐
$("#btn_checkExistingBuy").click(function () {
	_hash = $('#hash2' ).val();
    console.log("查询是否购买该音乐", _hash);

    contract.methods.checkExistingBuy(_hash).call({ from: accounts[0] }).then(
        function (result) {
            console.log("checkExistingBuy==>", result);
			alert("查询成功")
			$(".checkExistingBuy").html("是否购买："+result);
        }
    )
}
)
