// Simple fallback for Socket.IO - disable real-time features for now
// This prevents build issues with WebSocket dependencies

import { NextApiRequest, NextApiResponse } from 'next'

export const config = {
  api: {
    bodyParser: false,
  },
}

const SocketHandler = (req: NextApiRequest, res: NextApiResponse) => {
  // Return a simple response indicating Socket.IO is disabled
  res.status(200).json({ 
    message: 'Socket.IO disabled for deployment',
    status: 'disabled'
  })
}

export default SocketHandler
