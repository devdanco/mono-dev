import {getOrCreateInstance} from "./getOrCreateInstance.js";
import {getNodeVersion} from "./getNodeVersion.js";
import {ApiPromise} from "@polkadot/api";

export type MangataInstance = {
    api: () => Promise<ApiPromise>;
    rpc: {
        getNodeVersion: () => Promise<string>;
    }
}

export function createMangataInstance(urls: string[]): MangataInstance {
    const instancePromise = getOrCreateInstance(urls);

    return {
        api:  () => instancePromise,
        rpc: {
            getNodeVersion:  () =>  getNodeVersion(instancePromise)
        }
    }
}