import { ethers } from 'hardhat'
import * as dotenv from 'dotenv'

dotenv.config()

async function main() {
  console.log('Start deploying...')
  const [deployer] = await ethers.getSigners()
  const Factory = await ethers.getContractFactory('UniswapV2Factory', deployer)
  const feeToSetterAddress = process.env.FEE_TO_SETTER_ADDRESS || deployer.address
  const contract = await Factory.deploy(feeToSetterAddress)
  console.log(`Deploying at tx ${contract.deploymentTransaction()?.hash}`)

  await contract.waitForDeployment()
  console.log(`Deployer address: ${await deployer.getAddress()}`)
  console.log('Contract deployed at address:', contract.target)
  console.log('Contract deployed at block:', await ethers.provider.getBlockNumber())

  const UniswapV2Pair = await ethers.getContractFactory("UniswapV2Pair");
  const bytecode = UniswapV2Pair.bytecode;
  const INIT_CODE_PAIR_HASH = ethers.keccak256(bytecode);

  console.log("Init code pair hash:", INIT_CODE_PAIR_HASH);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
