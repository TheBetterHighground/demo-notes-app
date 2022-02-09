export function calculatedCost(storage) {
    // if storage <= 10 return 4, else if storage <= 100 return 2, else return 1
    const rate = storage <= 10 ? 4 : storage <= 100 ? 2 : 1;
    // rate will either be 4, 2, or 1 depending on storage size
    return rate * storage * 100;
}