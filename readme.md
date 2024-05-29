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
   Open your browser and navigate to `http://localhost:5000/api/philipapitest` to see the response from the new API endpoint.

## API Endpoint

### GET `/api/philipapitest`

Fetches data from the specified Uniswap V3 pool.

#### Response

The API will return a JSON object with the following structure:

```json
{
    "sqrtPriceX96": "1292389693305732460320817308629856",
    "tick": "194003",
    "liquidity": "17333230102837283116",
    "token0": {
        "symbol": "USDC",
        "decimals": "6"
    },
    "token1": {
        "symbol": "WETH",
        "decimals": "18"
    },
    "price": "3758.1334"
}
```

#### Explanation of Response Fields

-   **sqrtPriceX96**: The square root of the price ratio in Q64.96 format.
-   **tick**: The current tick of the pool.
-   **liquidity**: The current in-range liquidity of the pool.
-   **token0**: Information about the first token in the pool.
    -   **symbol**: The symbol of the token (e.g., USDC).
    -   **decimals**: The number of decimal places for the token.
-   **token1**: Information about the second token in the pool.
    -   **symbol**: The symbol of the token (e.g., WETH).
    -   **decimals**: The number of decimal places for the token.
-   **price**: The price of WETH in terms of USDC, formatted to 4 decimal places.

## How It Works

-   **Infura Setup**: The application uses Infura to connect to the Ethereum mainnet. Ensure you have an Infura project ID set up in the `.env` file.
-   **Uniswap V3 Pool**: The application interacts with a specific Uniswap V3 pool (WETH/USDC) to fetch the latest pool data.
-   **ethers.js**: The application uses `ethers.js` to interact with the Ethereum blockchain and fetch data from the Uniswap smart contracts.
-   **API Endpoint**: The `/api/philipapitest` endpoint queries the Uniswap V3 pool and returns the pool data as a JSON response.
