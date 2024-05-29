const express = require("express");
const router = express.Router();
const { ethers } = require("ethers");
require("dotenv").config();

const provider = new ethers.JsonRpcProvider(
    `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
);
const uniswapPoolAddress = "0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640"; // WETH/USDC UniV3 Pool

const uniswapV3PoolABI = [
    "function slot0() external view returns (uint160 sqrtPriceX96, int24 tick, uint16 observationIndex, uint16 observationCardinality, uint16 observationCardinalityNext, uint8 feeProtocol, bool unlocked)",
    "function liquidity() external view returns (uint128)",
    "function token0() external view returns (address)",
    "function token1() external view returns (address)",
];

const erc20ABI = [
    "function symbol() external view returns (string)",
    "function decimals() external view returns (uint8)",
];

const priceDecimals = 4n;

router.get("/", async (req, res) => {
    try {
        const poolContract = new ethers.Contract(
            uniswapPoolAddress,
            uniswapV3PoolABI,
            provider
        );

        const [slot0, liquidity, token0Address, token1Address] =
            await Promise.all([
                poolContract.slot0(),
                poolContract.liquidity(),
                poolContract.token0(),
                poolContract.token1(),
            ]);

        const token0Contract = new ethers.Contract(
            token0Address,
            erc20ABI,
            provider
        );
        const token1Contract = new ethers.Contract(
            token1Address,
            erc20ABI,
            provider
        );

        const [symbol0, symbol1, decimals0, decimals1] = await Promise.all([
            token0Contract.symbol(),
            token1Contract.symbol(),
            token0Contract.decimals(),
            token1Contract.decimals(),
        ]);

        const sqrtPriceX96 = BigInt(slot0.sqrtPriceX96.toString());

        const priceX96 = (sqrtPriceX96 ** 2n * BigInt(1e18)) / 2n ** 192n;

        const adjustedPrice =
            priceX96 / (10n ** BigInt(decimals1) / 10n ** BigInt(decimals0));

        const finalPrice = BigInt(10n ** (18n + priceDecimals)) / adjustedPrice;

        const poolData = {
            sqrtPriceX96: slot0.sqrtPriceX96.toString(),
            tick: slot0.tick.toString(),
            liquidity: liquidity.toString(),
            token0: {
                symbol: symbol0,
                decimals: decimals0.toString(),
            },
            token1: {
                symbol: symbol1,
                decimals: decimals1.toString(),
            },
            price: ethers.formatUnits(finalPrice, priceDecimals),
        };

        console.log(poolData);

        res.json(poolData);
    } catch (error) {
        console.error("Failed to query Uniswap pool:", error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
