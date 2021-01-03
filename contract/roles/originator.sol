//SPDX-License-Identifier: music

pragma solidity ^0.6.2;
//创作者
import "./Roles.sol";

contract Originator{
  using Roles for Roles.Role;

  // 定义两个事件，一个用于添加创作者，一个用于删除创作者
  event OriginatorAdded(address indexed account);
  event OriginatorRemoved(address indexed account);

  // 通过从“角色”库继承结构来定义结构“创作者”，结构角色
  Roles.Role private originators;

  //在constructor中将部署该合同的地址作为创作者
  constructor() public payable {
    _addOriginator(msg.sender);
  }

  //定义一个修饰符，以检查msg.sender是否具有适当的角色
  modifier onlyOriginator() {
    require(isOriginator(msg.sender),"=====");
    _;
  }

//定义函数“ isOriginator”以检查此角色
  function isOriginator(address account) public view returns (bool) {
    return Roles.has(originators, account);
  }

  //定义一个函数addOriginator来添加这个角色
  function addOriginator(address account) public payable{
    _addOriginator(account);
  }

  //定义一个函数renounceOriginator来放弃这个角色
  function renounceOriginator() public {
    _removeOriginator(msg.sender);
  }

  //定义一个内部函数'_addOriginator'来添加这个角色，由'addOriginator'调用
  function _addOriginator(address account) internal {
    Roles.add(originators, account);
    emit OriginatorAdded(account);
  }

  //定义一个内部函数'_removeOriginator'来删除这个角色，由'removeOriginator'调用
  function _removeOriginator(address account) internal {
    Roles.remove(originators, account);
    emit OriginatorRemoved(account);
  }
}