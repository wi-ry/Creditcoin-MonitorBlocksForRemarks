import fs from 'node:fs';
import { fileTypeFromStream } from 'file-type';
import { ApiPromise, WsProvider } from '@polkadot/api';

async function monitorBlocksForRemarks() {
  const provider = new WsProvider('wss://rpc.mainnet.creditcoin.network/ws');
  const api = await ApiPromise.create({ provider });

  // Subscribe to new blocks
  api.rpc.chain.subscribeNewHeads(async (header) => {
    const blockHash = header.hash;
    const blockNumber = header.number.toNumber();

    const block = await api.rpc.chain.getBlock(blockHash);

    const remarkExtrinsics = block.block.extrinsics.filter((extrinsic) => {
      return extrinsic.method.section === 'system' && extrinsic.method.method === 'remark';
    });

    if (remarkExtrinsics.length > 0) {
      console.log('Block Number:', blockNumber);

      for (let index = 0; index < remarkExtrinsics.length; index++) {
        const hexRemark = remarkExtrinsics[index].args[0].toHex();
        const content = hexToBuffer(hexRemark);

        const filename = `output/remark_${blockNumber}_${index}.bin`;
        saveBinaryToFile(content, filename);
        console.log(`Remark ${index + 1} (Binary) saved to ${filename} for analysis`);

        const stream = fs.createReadStream(filename);
        const detectedFileType = await fileTypeFromStream(stream);

        // Check if it's likely plain text
        const isPlainText = isLikelyPlainText(content);

        if (isPlainText) {
          const newFilename = `output/remark_${blockNumber}_${index}.txt`;
          fs.renameSync(filename, newFilename);
          console.log(`Remark ${index + 1} renamed to ${newFilename}`);
        } else if (detectedFileType) {
          // Rename to the detected file type
          const newFilename = `output/remark_${blockNumber}_${index}.${detectedFileType.ext}`;
          fs.renameSync(filename, newFilename);
          console.log(`Remark ${index + 1} renamed to ${newFilename}`);
        }
      }
    }
  });
}

function hexToBuffer(hex) {
  return Buffer.from(hex.substring(2), 'hex');
}

function saveBinaryToFile(data, filename) {
  fs.writeFileSync(filename, data);
}

function isLikelyPlainText(data) {
  // A simple heuristic to check if the data looks like plain text
  const text = data.toString('utf-8');
  return /^[a-zA-Z0-9\s.,;!?]+$/.test(text);
}

if (!fs.existsSync('output')) {
  fs.mkdirSync('output');
}

monitorBlocksForRemarks().catch(console.error);
