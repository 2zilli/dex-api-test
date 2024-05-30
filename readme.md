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
    - `/api/price/:address?token=token0` - Fetches the price of `token0` in terms of `token1` for the given Uniswap V3 pool address.
    - `/api/price/:address?token=token=token1` - Fetches the price of `token1` in terms of `token0` for the given Uniswap V3 pool address.

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

#### Example

For the USDC/WETH pool at address `0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640`:

-   **To get the price of USDC (token0) in terms of WETH (token1)**:

    ```sh
    curl "http://localhost:5000/api/price/0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640?token=token0"
    ```

-   **To get the price of WETH (token1) in terms of USDC (token0)**:
    ```sh
    curl "http://localhost:5000/api/price/0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640?token=token1"
    ```

#### Explanation of Response Fields

-   **sqrtPriceX96**: The square root of the price ratio in Q64.96 format.
-   **tick**: The current tick of the pool.
-   **liquidity**: The current in-range liquidity of the pool.
-   **symbol**: The symbol of the token (e.g., USDC or WETH).
-   **decimals**: The number of decimal places for the token.
-   **price**: The price of the specified token in terms of the other token, correctly adjusted to the appropriate number of decimal places.
