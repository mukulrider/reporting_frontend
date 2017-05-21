/**
 * Created by musigma on 20/5/17.
 */
let obj1 = { food: 'pizza', car: 'ford', x: [1,2,3] };
let obj2 = { animal: 'dog', food: 'noi', x: [1,2] };

// obj1.merge(obj2);
Object.assign(obj1, obj2);

console.log(obj1);
console.log(obj2);