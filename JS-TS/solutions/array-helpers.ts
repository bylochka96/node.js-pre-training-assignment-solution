/* eslint-disable @typescript-eslint/no-unused-vars */
// Task 02: Mini functional–utility library
// All helpers are declared but not implemented.

export function mapArray<T, R>(source: readonly T[], mapper: (item: T, index: number) => R): R[] {
    if (source === null || source === undefined) throw new Error('TypeError');
    const result: R[] = [];
    let index = 0;
    for (let item of source) {
        result.push(mapper(item, index));
        index++;
    }
    return result

}

export function filterArray<T>(source: readonly T[], predicate: (item: T, index: number) => boolean): T[] {
    if (source === null || source === undefined) throw new Error('TypeError');
    const result: T[] = [];
    let index = 0;
    for (let item of source) {
        if (predicate(item, index)) {
            result.push(item);
        }
        index++;
    }
    return result;
}

export function reduceArray<T, R>(source: readonly T[], reducer: (acc: R, item: T, index: number) => R, initial: R): R {
    if (source === null || source === undefined) throw new Error('TypeError');
    let result: R = initial;
    let index = 0;
    for (let item of source) {
        result = reducer(result, item, index);
        index++;
    }
    return result;
}

export function partition<T>(source: readonly T[], predicate: (item: T) => boolean): [T[], T[]] {
    if (source === null || source === undefined) throw new Error('TypeError');
    let result: [T[], T[]] = [[], []];
    for (let item of source) {
        predicate(item) ? result[0].push(item) : result[1].push(item);
    }
    return result;
}

export function groupBy<T, K extends PropertyKey>(source: readonly T[], keySelector: (item: T) => K): Record<K, T[]> {
    if (source === null || source === undefined) throw new Error('TypeError');
    const result = {} as Record<K, T[]>;
    for (let item of source) {
        let key = keySelector(item);
        if (result[key] === undefined) {
            result[key] = [];
        }
        result[key].push(item);
    }
    return result
}
