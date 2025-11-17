/**
 * @param {number[]} nums
 * @return {number}
 * https://leetcode.cn/problems/minimum-distance-between-three-equal-elements-i/
 */
const minimumDistance = function(nums) {
    let i = j = k = 0;
    let current_i, current_j, current_k;
    const Alength = nums.length
    let minimumDis = Number.MAX_SAFE_INTEGER;
    for(let index1 = 0; index1 < Alength;index1++){
        i = index1;
        current_i = nums[index1];
        for(let index2 = index1; index2 < Alength; index2++){
            current_j = nums[index2];
            if(index2 > index1 && current_i === current_j ){
                j = index2;
                for(let index3 = index2; index3< Alength; index3++){
                    current_k = nums[index3]
                    if(index3 > index2 && current_j === current_k){
                        k = index3;
                        console.log(i,j,k)
                        let temp = getDistance(i,j,k)
                        if(temp < minimumDis){
                            minimumDis = temp;
                        }
                        //或者Math.min(minimumDis, getDistance(i,j,k))
                    }
                }
            }
        }
    }
    if (minimumDis === Number.MAX_SAFE_INTEGER){
        return -1;
    }
    return minimumDis
};

const 绝对差 = ( a, b ) => { 
    return Math.abs(a-b)
}
const getDistance = (i, j, k) => {
    console.log("(",i,"-",k,")","+","(",j,"-",k,")","+","(",k,"-",i,")")
    return (绝对差(i, j) + 绝对差(j , k) + 绝对差(k , i))
}
//很慢