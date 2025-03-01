import { ethers } from 'hardhat'
import * as dotenv from 'dotenv'

dotenv.config()

async function main() {
  const [deployer] = await ethers.getSigners()
  

  console.log('Start deploying...')

  const Factory = await ethers.getContractFactory('UniswapV2Factory', deployer)
  const feeToSetterAddress = process.env.FEE_TO_SETTER_ADDRESS || deployer.address
  const contract = await Factory.deploy(feeToSetterAddress)

  console.log(`Deploying at tx ${contract.deploymentTransaction()?.hash}`)
  await contract.waitForDeployment()

  console.log(`Deployer address: ${await deployer.getAddress()}`)
  console.log('Contract deployed at address: ', contract.target)
  console.log('Contract deployed at block: ', await ethers.provider.getBlockNumber())

  const INIT_CODE_HASH = await contract.INIT_CODE_HASH()
  console.log('INIT_CODE_HASH: ', INIT_CODE_HASH)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
