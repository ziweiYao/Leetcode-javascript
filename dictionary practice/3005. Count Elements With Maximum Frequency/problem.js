// https://leetcode.com/problems/count-elements-with-maximum-frequency?envType=daily-question&envId=2025-10-17

/**
 * @param {number[]} nums
 * @return {number}
 */



var maxFrequencyElements = function(nums) {
    const freqs = new Map()
    nums.forEach((num) => {
        freqs.set(num, (freqs.get(num)||0) +1);
        console.log([num,freqs.get(num)])
    })
    console.log(freqs)
    let max_freq = Math.max(...freqs.values())
    console.log("max freq = "+ max_freq)
    let ans = 0;
    for ([num,freq] of freqs){
        if(freq === max_freq){
            ans += freq;
        }
    }
    return ans;
};