# Creditcoin Blockchain Remark Analyzer

This script allows you to monitor and analyze remarks within the Creditcoin blockchain and categorize them based on their content. It is designed to work with the [Creditcoin blockchain](https://creditcoin.org/).


## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js: Make sure you have [Node.js](https://nodejs.org/) installed on your system.


## Installation

1. Clone the repository to your local machine:

   ```shell
   git clone https://github.com/wi-ry/Creditcoin-MonitorBlocksForRemarks.git
   ```

2. Change into the project directory:

    ```shell
    cd Creditcoin-MonitorBlocksForRemarks
    ```

3. Install the required dependencies:

    ```shell
    npm install
    ```

## Usage

1. To use the script, follow these steps:

    Open the monitor-blocks.js file and update the `provider` variable with the WebSocket URL of your Creditcoin blockchain node.

2. Run the script:
    ```shell
    npm start
    ```

3. The script will connect to the specified Creditcoin blockchain node and start monitoring new blocks for remarks.

4. When a remark extrinsic is detected, the script will save it as a binary file in the output folder with a filename like `remark_{blockNumber}_{index}.bin`.

5. The script will then attempt to determine the file type of each saved binary file using file-type. If a file type is detected, it will rename the file with the appropriate extension (e.g. ``.jpg``, ``.pdf``, ``.txt``, etc.).


## Configuration

You can customize the script by modifying the `monitor-blocks.js` file. Here are some configurable options:

- WebSocket Provider URL: Update the `provider` variable with the WebSocket URL of your Creditcoin blockchain node.
- File Type Detection: You can configure additional file type detection logic or modify the plain text detection heuristic in the script.


## Contributing

Contributions are welcome! If you have any ideas, enhancements, or bug fixes, please open an issue or submit a pull request.


## License

This project is licensed under the [GNU General Public License v3.0](LICENSE).


## Acknowledgments

- [Creditcoin](https://creditcoin.org) for providing a powerful blockchain platform.
- [file-type](https://github.com/sindresorhus/file-type) for file type detection.
- Your contributions and feedback!
