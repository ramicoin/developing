
// config/index.tsx

import { cookieStorage, createStorage, http } from '@wagmi/core'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { bsc } from '@reown/appkit/networks'

// Get projectId from https://cloud.reown.com
export const projectId = '9afc37d7e285ff8c0388b1efa10a6f6a'

if (!projectId) {
  throw new Error('Project ID is not defined')
}

export const networks = [bsc]

const INFURA_API_KEY = 'testnet api'


//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage
  }),
  ssr: true,
  projectId,
  networks,
  transports: {
    [bsc.id]: http(),
  },
})

export const config = wagmiAdapter.wagmiConfig
