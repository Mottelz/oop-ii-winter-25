function add_two(a, b) {
    return a + b;
}

function sum_array(l) {
    sum = 0;
    for(i = 0; i < l.length; i++) {
        sum = add_two(l[i], sum);
    }
    // console.log(sum);
    return sum;
}

// const lists = [
//     [1,2,3], 
//     [4,5,6], 
//     [7,8,9], 
//     [1,2,3], 
//     [4,5,6]
// ];

// lists.forEach(sum_array);

module.exports = {
    sum_array
}