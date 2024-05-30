# DEX API Test

This project demonstrates integrating backend APIs with smart contracts.

## Setup Instructions

1. **Clone the Repository**:

    ```sh
    git clone https://github.com/2zilli/dex-api-test.git
    cd dex-api-test
    ```

2. **Install Dependencies**:

    ```sh
    npm install
    ```

3. **Set Up Environment Variables**:
   Copy the `.env.example` file to `.env` and add your Infura project ID:

    ```sh
    cp .env.example .env
    ```

    Then, open the `.env` file and replace `your_infura_project_id` with your actual Infura project ID.

4. **Run the Server**:

    ```sh
    node src/server.js
    ```

5. **Access the API**:
   Open your browser and navigate to the following endpoints:

    - `/api/slot0/:address` - Fetches the `slot0` information of the given Uniswap V3 pool address.
    - `/api/liquidity/:address` - Fetches the liquidity of the given Uniswap V3 pool address.
    - `/api/token0/:address` - Fetches information about the first token in the given Uniswap V3 pool address.
    - `/api/token1/:address` - Fetches information about the second token in the given Uniswap V3 pool address.
    - `/api/price/:address?token=token0` - Fetches the price of `token0` (USDC) in terms of `token1` (WETH) for the given Uniswap V3 pool address.
    - `/api/price/:address?token=token1` - Fetches the price of `token1` (WETH) in terms of `token0` (USDC) for the given Uniswap V3 pool address.

## API Endpoints

### GET `/api/slot0/:address`

Fetches the `slot0` information of the specified Uniswap V3 pool.

### GET `/api/liquidity/:address`

Fetches the liquidity of the specified Uniswap V3 pool.

### GET `/api/token0/:address`

Fetches information about the first token in the specified Uniswap V3 pool.

### GET `/api/token1/:address`

Fetches information about the second token in the specified Uniswap V3 pool.

### GET `/api/price/:address?token=token0`

Fetches the price of `token0` in terms of `token1` for the specified Uniswap V3 pool.

### GET `/api/price/:address?token=token1`

Fetches the price of `token1` in terms of `token0` for the specified Uniswap V3 pool.

#### Explanation of Response Fields

-   **sqrtPriceX96**: The square root of the price ratio in Q64.96 format.
-   **tick**: The current tick of the pool.
-   **liquidity**: The current in-range liquidity of the pool.
-   **symbol**: The symbol of the token (e.g., USDC or WETH).
-   **decimals**: The number of decimal places for the token.
-   **price**: The price of the specified token in terms of the other token.
