const getDistance = (i, j, k) => {
    return Math.abs(i - j) + Math.abs(j - k) + Math.abs(k - i);
}
const minimumDistance = function(nums) {
    const num_and_indexs = new Map();
    nums.forEach((value, index) => {
        const index_list = num_and_indexs.get(value) || []//index_list 是一个array
        index_list.push(index)
        num_and_indexs.set(value,index_list);
    });
    let ans = nums.length**3;
    num_and_indexs.forEach((index_list, value) => {
        for(let index = 2; index < index_list.length; index++){
            let i = index_list[index - 2], j = index_list[index - 1], k = index_list[index];
            ans = Math.min(getDistance(i,j,k),ans);
        }
    });
    return ans === nums.length**3 ? -1 : ans;
};
