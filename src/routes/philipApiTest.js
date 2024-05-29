const express = require("express");
const router = express.Router();
const { ethers } = require("ethers");

const provider = new ethers.providers.JsonRpcProvider(
    `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
);
const contractAddress = "0xYourContractAddress";
const contractABI = [
    // Your contract ABI here
];

router.get("/philipapitest", async (req, res) => {
    try {
        const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            provider
        );
        const data = await contract.yourMethodName(); // Replace 'yourMethodName' with actual method name

        res.json({ data });
    } catch (error) {
        console.error("Error fetching contract data:", error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
