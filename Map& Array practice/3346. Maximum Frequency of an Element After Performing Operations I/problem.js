//https://leetcode.com/problems/maximum-frequency-of-an-element-after-performing-operations-i/

function maxFrequency(nums, k, numOperations) {
    const freqs = new Map();
    sorted = nums.sort((a,b) => a-b)
    const minrange = Math.min(...sorted)-k;
    const maxrange = Math.max(...sorted)+k;
    let ans = 0;
    
    for(const num of sorted){
        freqs.set(num, (freqs.get(num) || 0) + 1);
    }
    for(const [num, freq] of freqs){
        let temp = 0;
        for(const [neighbor, n_freq] of freqs){
            if( num - k <= neighbor && neighbor <= num + k && neighbor != num ){
                temp = Math.min(numOperations, temp + n_freq)
                if(temp === numOperations){
                    break;
                }
            }
        }
        ans = Math.max(temp + freq, ans)
    }

    return ans;
}

// 优化版本
function maxFrequencys(nums, k, numOperations) {
    const freqs = new Map();
    sorted = nums.sort((a,b) => a-b)
    const minrange = Math.min(...sorted)-k;
    const maxrange = Math.max(...sorted)+k;
    let ans = 0;
    
    for(const num of sorted){
        freqs.set(num, (freqs.get(num) || 0) + 1);
    }

    for(const [num, freq] of freqs){
        let temp_ans = 0;
        let rightRange= num + k;
        let left_index = num - k;
        while( left_index <= rightRange){
            if (  freqs.get(left_index) && freqs.get(left_index) > 0 && left_index != num ){
                temp_ans = Math.min(temp_ans + freqs.get(left_index), numOperations );
            }
            left_index += 1;
            if(temp_ans === numOperations)
            {
                break;
            }
        }
        ans = Math.max(temp_ans + freq, ans)
        console.log(ans)
    }

    return ans;
}