import { environment } from '@atrium/env';
import { Observable } from 'rxjs';

/**
 * The storage types available for usage
 *
 * @export
 * @enum {number}
 */
export enum StorageType {
    LOCAL,
    SESSION
}

// The reference to the storage objects available in the window scope
const StorageObjects = {
    LOCAL: window.localStorage,
    SESSION: window.sessionStorage
};

/**
 * Utility class to handle session storage related tasks
 *
 * @export
 * @abstract
 * @class StorageUtil
 */
export abstract class StorageUtil {

    /**
     * Checks if the storage type is supported
     *
     * @static
     * @param {StorageType} storageType - The storage type to use
     * @returns {boolean}
     *
     * @memberOf StorageUtil
     */
    public static isSupported(storageType: StorageType): boolean {
      const storage: Storage = StorageObjects[StorageType[storageType]];
      try {
        storage.setItem('test', 'test');
        return true;
      } catch (e) {
        return false;
      }
    }

    /**
     * Check if the object with the mentioned key exist in the storage
     *
     * @static
     * @param {StorageType} storageType - The storage type to use
     * @param {string} key - The identifier for the object
     * @returns {boolean}
     * @memberOf StorageUtil
     */
    public static hasAttribute(storageType: StorageType, key: string): boolean {
        const storage: Storage = StorageObjects[StorageType[storageType]];
        if (storage) {
            // Check if the SessionStorage has the item
            return storage.hasOwnProperty(key);
        } else {
            throw new Error(`Invalid storage type - ${StorageType[storageType]}`);
        }
    }

    /**
     * Fetch an item from the specified storage. This method return a promise which
     * gets resolved with the storage data
     *
     * @static
     * @template T
     * @param {StorageType} storageType - The storage type to use
     * @param {string} key - The identifier for the object
     * @returns {Promise<T>} - A promise that resolves the data
     * @memberOf StorageUtil
     */
    public static getAttributePromise<T>(storageType: StorageType, key: string): Promise<T> {
        if (!key) { return; }

        const storage = StorageObjects[StorageType[storageType]];

        if (storage) {
            let data;
            try {
                data = JSON.parse(storage.getItem(key));
            } catch (e) {
                data = storage.getItem(key);
            }

            // Return a promise which resolves the SessionStorage item
            return new Promise(resolve => {
                resolve((data) as T);
            });
        } else {
            throw new Error(`Invalid storage type - ${StorageType[storageType]}`);
        }
    }

    /**
     * Fetch an item from the specified storage
     *
     * @static
     * @template T
     * @param {StorageType} storageType - The storage type to use
     * @param {string} key - The identifier for the object
     * @returns {T} - The data
     * @memberOf StorageUtil
     */
    public static getAttribute<T>(storageType: StorageType, key: string): T {
        if (!key) { return; }

        const storage: Storage = StorageObjects[StorageType[storageType]];
        if (storage) {
            let data;
            try {
                data = JSON.parse(storage.getItem(key));
            } catch (e) {
                data = storage.getItem(key);
            }
            return (data) as T;
        } else {
            throw new Error(`Invalid storage type - ${StorageType[storageType]}`);
        }
    }

    /**
     * Add or update an item in the storage
     *
     * @static
     * @param {StorageType} storageType - The storage type to use
     * @param {string} key - The identifier for the object
     * @param {*} value - The data to be stored
     * @returns {number} - The size of the storage
     *
     * @memberOf StorageUtil
     */
    public static setAttribute(storageType: StorageType, key: string, value: any): void {
        if (!key) { return; }

        const storage = StorageObjects[StorageType[storageType]];

        if (storage) {
            // add storage format version when storing data in Local storage,
            if (storage === StorageObjects.LOCAL) {
                value = {data: value};
            }

            // Stringify the object
            const data: string = ('string' === typeof value) ? value : JSON.stringify(value);

            // Set the stringified object to SessionStorage
            storage.setItem(key, data);
        } else {
            throw new Error(`Invalid storage type - ${StorageType[storageType]}`);
        }
    }

    /**
     * Fetch an item from the SessionStorage
     *
     * @static
     * @param {StorageType} storageType - The storage type to use
     * @memberOf StorageUtil
     */
    public static clear(storageType: StorageType): void {
        const storage: Storage = StorageObjects[StorageType[storageType]];

        if (storage) {
            // Clear the SessionStorage
            storage.clear();
        } else {
            throw new Error(`Invalid storage type - ${StorageType[storageType]}`);
        }
    }


    /**
     * Remove an item from the Storage
     *
     * @static
     * @param {StorageType} storageType - The storage type to use
     * @memberOf StorageUtil
     */
    public static removeAttribute(storageType: StorageType, key: string): void {
        if (!key) { return; }

        const storage = StorageObjects[StorageType[storageType]];

        if (storage) {
            storage.removeItem(key);
        } else {
            throw new Error(`Invalid storage type - ${StorageType[storageType]}`);
        }
    }

}
