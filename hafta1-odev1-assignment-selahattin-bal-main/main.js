const nums=[3,0,3,4]
const target=6

// BRUTE FORCE(Time comp. O(n^2))

//Bütün değerleri 2 döngüyle sıralı şekilde toplayıp target'a eşit olup olmadığı kontrolü.

function sum(nums, target){
let firstIndex=0
let secondIndex=0
    for(let i=0;i<nums.length-2;i++){
     firstIndex=i
        for(let k=i+1;k<nums.length;k++){
        secondIndex=k
            if(nums[i]+nums[k]===target){
            console.log(firstIndex,secondIndex)
            }
         }
    }
}
sum(nums,target)

// HASH (Time comp. O(n))

// Array'daki değerler sırayla objeye indexleriyle beraber ekleniyor. Her ekleme aşamasında difference objede olup olmadığı kontrol ediliyor. Uygun fark değeri olunca o ve fark değerinin indexleri döndürülüyor.

function twoSum(nums, target) {
    let numObj = {};
    for (let i = 0; i < nums.length; i++) {
        let difference = target - nums[i];
        if (numObj[difference] !== undefined) {
         console.log(numObj[difference], i);
        }
    numObj[nums[i]] = i;
    }
}
    twoSum(nums, target)
