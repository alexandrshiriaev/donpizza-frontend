export const calculateTotalItems = (items: { count: number }[]) => {
    let totalCount = 0;

    items.forEach((item) => {
        totalCount += item.count;
    });

    return totalCount;
};
