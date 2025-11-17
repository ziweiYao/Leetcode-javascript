//https://leetcode.com/problems/maximum-frequency-of-an-element-after-performing-operations-i/

function maxFrequency(nums, k, numOperations) {
    const freqs = new Map();
    sorted = nums.sort((a, b) => a - b)
    const minrange = Math.min(...sorted) - k;
    const maxrange = Math.max(...sorted) + k;
    let ans = 0;

    for (const num of sorted) {
        freqs.set(num, (freqs.get(num) || 0) + 1);
    }
    for (const [num, freq] of freqs) {
        let temp = 0;
        for (const [neighbor, n_freq] of freqs) {
            if (num - k <= neighbor && neighbor <= num + k && neighbor != num) {
                temp = Math.min(numOperations, temp + n_freq)
                if (temp === numOperations) {
                    break;
                }
            }
        }
        ans = Math.max(temp + freq, ans)
    }

    return ans;
}
//自己写的，错的
//以下为正确答案
var maxFrequency = function (nums, k, numOperations) {
    // cnt: 记录每个数字在原始数组中出现的频率
    const cnt = new Map();
    // diff: 差分数组，用于记录每个位置的变化量
    const diff = new Map();

    nums.forEach((item) => {
        // 统计每个数字的出现次数
        if (cnt.has(item)) {
            cnt.set(item, cnt.get(item) + 1);
        } else {
            cnt.set(item, 1);
        }

        // 初始化当前数字的差分值为0（如果不存在）
        diff.set(item, (diff.get(item) || 0));
        // 在 [item-k, item+k] 范围内，所有数字都可以通过操作变成item
        // 所以在这个范围的起点 item-k 处 +1
        diff.set(item - k, (diff.get(item - k) || 0) + 1);
        // 在范围结束的下一个位置 item+k+1 处 -1，表示范围结束
        diff.set(item + k + 1, (diff.get(item + k + 1) || 0) - 1);
    })

    // 获取所有差分关键点并排序
    const sortDiff = [...diff.keys()];
    sortDiff.sort((a, b) => a - b);

    let ans = 0;
    let sumDiff = 0;  // 当前累计的覆盖次数

    sortDiff.forEach((item) => {
        // 累加差分值，得到当前数字位置被多少个 [x-k, x+k] 范围覆盖
        sumDiff += diff.get(item);

        // 计算当前位置可能的最大频率：
        // 1. sumDiff: 有多少个数字可以通过操作变成当前数字
        // 2. (cnt.get(item) || 0): 当前数字本身的出现次数
        // 3. numOperations: 额外的操作次数限制
        // 取三者中的最小值
        // (cnt.get(item) || 0) + numOperations 是当前数字能出现的最大频率，
        // 因为你有 numOperations 次操作可以把其他数字变成它，有cnt.get(item)个本身
        // 而 sumDiff 是理论上能变成它的数字总数（不考虑操作次数限制）
        // 所以如果sumDiff 超过了 (cnt.get(item) || 0) + numOperations，
        // 说明我们用超过了numOperations的次数来实现了，此时我们只能用理论最大频率来算
        // 也就是刚刚说的 (cnt.get(item) || 0) + numOperations，
        const ss = Math.min(sumDiff, (cnt.get(item) || 0) + numOperations);

        ans = Math.max(ans, ss);
    })

    return ans;
};

//和
var maxFrequency = function (nums, k, numOperations) {
    nums.sort((a, b) => a - b);

    let ans = 0;
    const numCount = new Map();

    let lastNumIndex = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== nums[lastNumIndex]) {
            numCount.set(nums[lastNumIndex], i - lastNumIndex);
            ans = Math.max(ans, i - lastNumIndex);

            lastNumIndex = i;
        }
    }

    numCount.set(nums[lastNumIndex], nums.length - lastNumIndex);
    ans = Math.max(ans, nums.length - lastNumIndex);

    const leftBound = (value) => {
        let left = 0;
        let right = nums.length - 1;
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (nums[mid] < value) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return left;
    };

    const rightBound = (value) => {
        let left = 0;
        let right = nums.length - 1;
        while (left < right) {
            const mid = Math.floor((left + right + 1) / 2);
            if (nums[mid] > value) {
                right = mid - 1;
            } else {
                left = mid;
            }
        }
        return left;
    };

    for (let i = nums.at(0); i <= nums.at(-1); i++) {
        const [l, r] = [leftBound(i - k), rightBound(i + k)];

        let tempAns;

        if (numCount.has(i)) {
            tempAns = Math.min(r - l + 1, numCount.get(i) + numOperations);
        } else {
            tempAns = Math.min(r - l + 1, numOperations);
        }

        ans = Math.max(ans, tempAns);
    }

    return ans;
};

