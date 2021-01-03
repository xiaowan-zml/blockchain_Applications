//SPDX-License-Identifier: music

pragma solidity ^0.6.2;
//听众

import "./Roles.sol";

contract Audience {
  using Roles for Roles.Role;

  // 定义两个事件，一个用于添加听众，一个用于删除听众
  event AudienceAdded(address indexed account);
  event AudienceRemoved(address indexed account);

  //通过继承'Roles'库，struct Role定义一个结构体'听众'
  Roles.Role private audiences;

  //在构造函数中，将部署这个合约的地址设置为听众
  constructor() public {
    _addAudience(msg.sender);
  }

  //定义一个修饰符来检查msg.sender是否具有适当的角色
  modifier onlyAudience() {
    require(isAudience(msg.sender),"======");
    _;
  }
  
  //定义一个函数'isAudience'来检查这个角色
  function isAudience(address account) public view returns (bool) {
    return Roles.has(audiences, account);
  }

   //定义添加“ addAudience”的函数
  function addAudience(address account) public payable {
    _addAudience(account);
  }

  //定义一个函数renounceAudience来放弃这个角色
  function renounceAudience() public {
    _removeAudience(msg.sender);
  }

  //定义一个内部函数'_addAudience'来添加这个角色，由'addAudience'调用
  function _addAudience(address account) internal {
    // require(isAudience(msg.sender), "error here");
    Roles.add(audiences, account);
    emit AudienceAdded(account);
  }

  //定义一个内部函数'_removeAudience'来删除这个角色，由'removeAudience'调用
  function _removeAudience(address account) internal {
    Roles.remove(audiences, account);
    emit AudienceRemoved(account);
  }
}