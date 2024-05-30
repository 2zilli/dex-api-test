const express = require("express");
const router = express.Router();
const { ethers } = require("ethers");
require("dotenv").config();

const provider = new ethers.JsonRpcProvider(
    `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
);

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

router.get("/slot0/:address", async (req, res) => {
    const { address } = req.params;
    try {
        const poolContract = new ethers.Contract(
            address,
            uniswapV3PoolABI,
            provider
        );
        const slot0 = await poolContract.slot0();
        res.json({
            sqrtPriceX96: slot0.sqrtPriceX96.toString(),
            tick: slot0.tick.toString(),
        });
    } catch (error) {
        console.error("Failed to query slot0:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/liquidity/:address", async (req, res) => {
    const { address } = req.params;
    try {
        const poolContract = new ethers.Contract(
            address,
            uniswapV3PoolABI,
            provider
        );
        const liquidity = await poolContract.liquidity();
        res.json({ liquidity: liquidity.toString() });
    } catch (error) {
        console.error("Failed to query liquidity:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/token0/:address", async (req, res) => {
    const { address } = req.params;
    try {
        const poolContract = new ethers.Contract(
            address,
            uniswapV3PoolABI,
            provider
        );
        const token0Address = await poolContract.token0();
        const token0Contract = new ethers.Contract(
            token0Address,
            erc20ABI,
            provider
        );
        const symbol = await token0Contract.symbol();
        const decimals = await token0Contract.decimals();
        res.json({
            address: token0Address,
            symbol,
            decimals: decimals.toString(),
        });
    } catch (error) {
        console.error("Failed to query token0:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/token1/:address", async (req, res) => {
    const { address } = req.params;
    try {
        const poolContract = new ethers.Contract(
            address,
            uniswapV3PoolABI,
            provider
        );
        const token1Address = await poolContract.token1();
        const token1Contract = new ethers.Contract(
            token1Address,
            erc20ABI,
            provider
        );
        const symbol = await token1Contract.symbol();
        const decimals = await token1Contract.decimals();
        res.json({
            address: token1Address,
            symbol,
            decimals: decimals.toString(),
        });
    } catch (error) {
        console.error("Failed to query token1:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/price/:address", async (req, res) => {
    const { address } = req.params;
    const { token } = req.query; // Accept token query parameter
    try {
        const poolContract = new ethers.Contract(
            address,
            uniswapV3PoolABI,
            provider
        );
        const [slot0, token0Address, token1Address] = await Promise.all([
            poolContract.slot0(),
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
        const [decimals0, decimals1] = await Promise.all([
            token0Contract.decimals(),
            token1Contract.decimals(),
        ]);

        console.log("Slot0:", slot0);
        console.log("Token0 Address:", token0Address);
        console.log("Token1 Address:", token1Address);
        console.log("Decimals0:", decimals0);
        console.log("Decimals1:", decimals1);

        const sqrtPriceX96 = BigInt(slot0.sqrtPriceX96.toString());
        const priceX96 = (sqrtPriceX96 ** 2n * BigInt(1e18)) / 2n ** 192n;
        let finalPrice;

        const adjustedPrice =
            priceX96 / (10n ** BigInt(decimals1) / 10n ** BigInt(decimals0));
        if (token === "token0") {
            finalPrice = adjustedPrice;
        } else if (token === "token1") {
            finalPrice = BigInt(10n ** 36n) / adjustedPrice;
        } else {
            return res
                .status(400)
                .send("Invalid token parameter. Use 'token0' or 'token1'.");
        }

        console.log("Final Price:", finalPrice);

        res.json({ price: ethers.formatUnits(finalPrice, 18) });
    } catch (error) {
        console.error("Failed to query price:", error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
