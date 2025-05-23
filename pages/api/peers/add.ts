import type { NextApiRequest, NextApiResponse } from 'next';
import { getBlockchainInstance } from '../../../lib/blockchainInstance';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { peerUrl } = req.body;
    if (!peerUrl || typeof peerUrl !== 'string') {
      return res.status(400).json({ error: 'Invalid peer URL' });
    }

    const blockchainInstance = await getBlockchainInstance();
    blockchainInstance.addPeer(peerUrl);
    res.status(200).json({ message: `Peer ${peerUrl} added successfully` });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}