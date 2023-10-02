import { Mangata } from './sdk.js';
import {expect} from "vitest";

describe('sdk', () => {
  it('should work', async () => {
    const mangata = Mangata.instance(['wss://kusama-archive.mangata.online'])
    const api = await mangata.api()
    expect(api.isConnected).toBe(true)
  });
});
