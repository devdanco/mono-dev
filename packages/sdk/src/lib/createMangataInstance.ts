import {getOrCreateInstance} from "./getOrCreateInstance.js";
import {ApiPromise} from "@polkadot/api";
import {getNodeVersion} from "./getNodeVersion.js";
import {getNodeName} from "./getNodeName.js";

export type MangataInstance = {
    api: () => Promise<ApiPromise>;
    rpc: {
        getNodeVersion: () => Promise<string>;
        getNodeName: () => Promise<string>;
    }
}

export function createMangataInstance(urls: string[]): MangataInstance {
    const instancePromise = getOrCreateInstance(urls);

    return {
        api:  () => instancePromise,
        rpc: {
            getNodeVersion:  () =>  getNodeVersion(instancePromise),
            getNodeName: () => getNodeName(instancePromise)
        }
    }
}