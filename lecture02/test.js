const my_funcs = require('./index.js');
const test_arr = [5, 5, 5];
const expected_result = 15;

if(my_funcs.sum_array(test_arr) === expected_result) {
    console.log('Test Passed :)')
} else {
    console.log('Test Failed :(')
}