var Web3 = require('web3');
var web3Provider = null;
var BioHashComparation;

//BioHash Smart Contract ByteCode
//{
//	"linkReferences": {},
//	"object": "608060405234801561001057600080fd5b50610553806100206000396000f30060806040526004361061008e576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063053f9a8a14610093578063200d2ed2146100c657806362737734146100ff5780636db48749146101425780639c0f2e7514610181578063e312eafb146101b4578063fc8aad3514610217578063fc9c8d3914610256575b600080fd5b34801561009f57600080fd5b506100a86102ad565b60405180826000191660001916815260200191505060405180910390f35b3480156100d257600080fd5b506100db6102b3565b604051808260028111156100eb57fe5b60ff16815260200191505060405180910390f35b34801561010b57600080fd5b50610140600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506102c6565b005b34801561014e57600080fd5b5061017f60048036038101908080356000191690602001909291908035600019169060200190929190505050610309565b005b34801561018d57600080fd5b506101966103da565b60405180826000191660001916815260200191505060405180910390f35b3480156101c057600080fd5b506101fd600480360381019080803560001916906020019092919080356000191690602001909291908035151590602001909291905050506103e0565b604051808215151515815260200191505060405180910390f35b34801561022357600080fd5b50610254600480360381019080803560001916906020019092919080356000191690602001909291905050506104b2565b005b34801561026257600080fd5b5061026b610502565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b60025481565b600360009054906101000a900460ff1681565b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550816001816000191690555080600281600019169055506000600360006101000a81548160ff0219169083600281111561037e57fe5b02179055507fef4836229f3b6867cddf112b200574dd61ee95193e2f4ccc63954818a1fa791560015460025460405180836000191660001916815260200182600019166000191681526020019250505060405180910390a15050565b60015481565b60006002600360006101000a81548160ff0219169083600281111561040157fe5b02179055506001546000191684600019161480156104285750600254600019168360001916145b156104a75781600360016101000a81548160ff0219169083151502179055507f64820af31344b4a4ffd726722c6e42507a61e601b9d2acc79bc59922e6cbcf0160015460025484604051808460001916600019168152602001836000191660001916815260200182151515158152602001935050505060405180910390a15b600190509392505050565b6001546000191682600019161480156104d45750600254600019168160001916145b156104fe576001600360006101000a81548160ff021916908360028111156104f857fe5b02179055505b5050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff16815600a165627a7a7230582090ec44352fb88e0241c4f8ce9b627b7bbb42716e384667b8c333ec976ebf7cfa0029",
//	"opcodes": "PUSH1 0x80 PUSH1 0x40 MSTORE CALLVALUE DUP1 ISZERO PUSH2 0x10 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x553 DUP1 PUSH2 0x20 PUSH1 0x0 CODECOPY PUSH1 0x0 RETURN STOP PUSH1 0x80 PUSH1 0x40 MSTORE PUSH1 0x4 CALLDATASIZE LT PUSH2 0x8E JUMPI PUSH1 0x0 CALLDATALOAD PUSH29 0x100000000000000000000000000000000000000000000000000000000 SWAP1 DIV PUSH4 0xFFFFFFFF AND DUP1 PUSH4 0x53F9A8A EQ PUSH2 0x93 JUMPI DUP1 PUSH4 0x200D2ED2 EQ PUSH2 0xC6 JUMPI DUP1 PUSH4 0x62737734 EQ PUSH2 0xFF JUMPI DUP1 PUSH4 0x6DB48749 EQ PUSH2 0x142 JUMPI DUP1 PUSH4 0x9C0F2E75 EQ PUSH2 0x181 JUMPI DUP1 PUSH4 0xE312EAFB EQ PUSH2 0x1B4 JUMPI DUP1 PUSH4 0xFC8AAD35 EQ PUSH2 0x217 JUMPI DUP1 PUSH4 0xFC9C8D39 EQ PUSH2 0x256 JUMPI JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x9F JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0xA8 PUSH2 0x2AD JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 DUP3 PUSH1 0x0 NOT AND PUSH1 0x0 NOT AND DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0xD2 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0xDB PUSH2 0x2B3 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 DUP3 PUSH1 0x2 DUP2 GT ISZERO PUSH2 0xEB JUMPI INVALID JUMPDEST PUSH1 0xFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x10B JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x140 PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 DUP1 DUP1 CALLDATALOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND SWAP1 PUSH1 0x20 ADD SWAP1 SWAP3 SWAP2 SWAP1 POP POP POP PUSH2 0x2C6 JUMP JUMPDEST STOP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x14E JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x17F PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 DUP1 DUP1 CALLDATALOAD PUSH1 0x0 NOT AND SWAP1 PUSH1 0x20 ADD SWAP1 SWAP3 SWAP2 SWAP1 DUP1 CALLDATALOAD PUSH1 0x0 NOT AND SWAP1 PUSH1 0x20 ADD SWAP1 SWAP3 SWAP2 SWAP1 POP POP POP PUSH2 0x309 JUMP JUMPDEST STOP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x18D JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x196 PUSH2 0x3DA JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 DUP3 PUSH1 0x0 NOT AND PUSH1 0x0 NOT AND DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x1C0 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x1FD PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 DUP1 DUP1 CALLDATALOAD PUSH1 0x0 NOT AND SWAP1 PUSH1 0x20 ADD SWAP1 SWAP3 SWAP2 SWAP1 DUP1 CALLDATALOAD PUSH1 0x0 NOT AND SWAP1 PUSH1 0x20 ADD SWAP1 SWAP3 SWAP2 SWAP1 DUP1 CALLDATALOAD ISZERO ISZERO SWAP1 PUSH1 0x20 ADD SWAP1 SWAP3 SWAP2 SWAP1 POP POP POP PUSH2 0x3E0 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 DUP3 ISZERO ISZERO ISZERO ISZERO DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x223 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x254 PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 DUP1 DUP1 CALLDATALOAD PUSH1 0x0 NOT AND SWAP1 PUSH1 0x20 ADD SWAP1 SWAP3 SWAP2 SWAP1 DUP1 CALLDATALOAD PUSH1 0x0 NOT AND SWAP1 PUSH1 0x20 ADD SWAP1 SWAP3 SWAP2 SWAP1 POP POP POP PUSH2 0x4B2 JUMP JUMPDEST STOP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x262 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x26B PUSH2 0x502 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 DUP3 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH1 0x2 SLOAD DUP2 JUMP JUMPDEST PUSH1 0x3 PUSH1 0x0 SWAP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH1 0xFF AND DUP2 JUMP JUMPDEST DUP1 PUSH1 0x0 DUP1 PUSH2 0x100 EXP DUP2 SLOAD DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF MUL NOT AND SWAP1 DUP4 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND MUL OR SWAP1 SSTORE POP POP JUMP JUMPDEST CALLER PUSH1 0x0 DUP1 PUSH2 0x100 EXP DUP2 SLOAD DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF MUL NOT AND SWAP1 DUP4 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND MUL OR SWAP1 SSTORE POP DUP2 PUSH1 0x1 DUP2 PUSH1 0x0 NOT AND SWAP1 SSTORE POP DUP1 PUSH1 0x2 DUP2 PUSH1 0x0 NOT AND SWAP1 SSTORE POP PUSH1 0x0 PUSH1 0x3 PUSH1 0x0 PUSH2 0x100 EXP DUP2 SLOAD DUP2 PUSH1 0xFF MUL NOT AND SWAP1 DUP4 PUSH1 0x2 DUP2 GT ISZERO PUSH2 0x37E JUMPI INVALID JUMPDEST MUL OR SWAP1 SSTORE POP PUSH32 0xEF4836229F3B6867CDDF112B200574DD61EE95193E2F4CCC63954818A1FA7915 PUSH1 0x1 SLOAD PUSH1 0x2 SLOAD PUSH1 0x40 MLOAD DUP1 DUP4 PUSH1 0x0 NOT AND PUSH1 0x0 NOT AND DUP2 MSTORE PUSH1 0x20 ADD DUP3 PUSH1 0x0 NOT AND PUSH1 0x0 NOT AND DUP2 MSTORE PUSH1 0x20 ADD SWAP3 POP POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 LOG1 POP POP JUMP JUMPDEST PUSH1 0x1 SLOAD DUP2 JUMP JUMPDEST PUSH1 0x0 PUSH1 0x2 PUSH1 0x3 PUSH1 0x0 PUSH2 0x100 EXP DUP2 SLOAD DUP2 PUSH1 0xFF MUL NOT AND SWAP1 DUP4 PUSH1 0x2 DUP2 GT ISZERO PUSH2 0x401 JUMPI INVALID JUMPDEST MUL OR SWAP1 SSTORE POP PUSH1 0x1 SLOAD PUSH1 0x0 NOT AND DUP5 PUSH1 0x0 NOT AND EQ DUP1 ISZERO PUSH2 0x428 JUMPI POP PUSH1 0x2 SLOAD PUSH1 0x0 NOT AND DUP4 PUSH1 0x0 NOT AND EQ JUMPDEST ISZERO PUSH2 0x4A7 JUMPI DUP2 PUSH1 0x3 PUSH1 0x1 PUSH2 0x100 EXP DUP2 SLOAD DUP2 PUSH1 0xFF MUL NOT AND SWAP1 DUP4 ISZERO ISZERO MUL OR SWAP1 SSTORE POP PUSH32 0x64820AF31344B4A4FFD726722C6E42507A61E601B9D2ACC79BC59922E6CBCF01 PUSH1 0x1 SLOAD PUSH1 0x2 SLOAD DUP5 PUSH1 0x40 MLOAD DUP1 DUP5 PUSH1 0x0 NOT AND PUSH1 0x0 NOT AND DUP2 MSTORE PUSH1 0x20 ADD DUP4 PUSH1 0x0 NOT AND PUSH1 0x0 NOT AND DUP2 MSTORE PUSH1 0x20 ADD DUP3 ISZERO ISZERO ISZERO ISZERO DUP2 MSTORE PUSH1 0x20 ADD SWAP4 POP POP POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 LOG1 JUMPDEST PUSH1 0x1 SWAP1 POP SWAP4 SWAP3 POP POP POP JUMP JUMPDEST PUSH1 0x1 SLOAD PUSH1 0x0 NOT AND DUP3 PUSH1 0x0 NOT AND EQ DUP1 ISZERO PUSH2 0x4D4 JUMPI POP PUSH1 0x2 SLOAD PUSH1 0x0 NOT AND DUP2 PUSH1 0x0 NOT AND EQ JUMPDEST ISZERO PUSH2 0x4FE JUMPI PUSH1 0x1 PUSH1 0x3 PUSH1 0x0 PUSH2 0x100 EXP DUP2 SLOAD DUP2 PUSH1 0xFF MUL NOT AND SWAP1 DUP4 PUSH1 0x2 DUP2 GT ISZERO PUSH2 0x4F8 JUMPI INVALID JUMPDEST MUL OR SWAP1 SSTORE POP JUMPDEST POP POP JUMP JUMPDEST PUSH1 0x0 DUP1 SWAP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 JUMP STOP LOG1 PUSH6 0x627A7A723058 KECCAK256 SWAP1 0xec DIFFICULTY CALLDATALOAD 0x2f 0xb8 DUP15 MUL COINBASE 0xc4 0xf8 0xce SWAP12 PUSH3 0x7B7BBB TIMESTAMP PUSH18 0x6E384667B8C333EC976EBF7CFA0029000000 ",
//	"sourceMap": "26:1773:0:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;26:1773:0;;;;;;;"
//}


var contract = require('./SmartContract/BioHashComparation.sol');

function init() {
  //initializing web3 to access blockchain
  initweb3();
}

//########################## CHANGE THIS ADDRESS
var SmartContractAddress = "0x6c68d153b9709283e3900e944f1c6677273987c1";

var BioHashComparation;  //SmartContract Intance

function initweb3() {

  if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);

  } else {

    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

  }

  web3.eth.defaultAccount = web3.eth.accounts[1];

  var BioHashComparationContractAddress = SmartContractAddress;

  BioHashComparation = new web3.eth.Contract(contract,BioHashComparationContractAddress );


}


#### Biometric CALL To SMART CONTRACT

function performBiometricValidation(String Hash1, String Hash2){

 //Compare BIOHASH 1 vs BIOHASH 2

  BioHashComparation.validateHash(Hash1, Hash2);

}


####  CALL To CHECK THE RESULT

function getBiometricValidation(String Hash1, String Hash2){

 //Compare BIOHASH 1

  if ( BioHashComparation.status == "0x2"){
    return BioHashComparation.isBiometricMatch;
  } else  {
    return null;
  }

}





