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
