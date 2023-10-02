import { Mangata } from './sdk.js';

describe('sdk', () => {
  it('should work', async () => {
    const mangata = Mangata.instance(['wss://kusama-archive.mangata.online'])
    const api = await mangata.api()
    console.log(api.isConnected)
  });
});
