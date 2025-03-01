"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@nomicfoundation/hardhat-toolbox");
const config = {
    solidity: '0.5.16',
    networks: {
        'joc-mainnet': {
            url: process.env.RPC_ENDPOINT_URL || '',
            accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : []
        },
        'joc-testnet': {
            url: process.env.RPC_ENDPOINT_URL || '',
            accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : []
        }
    }
};
exports.default = config;
