import bcrypt from 'bcrypt';

let num = 0;
while (num < 10){
    console.log(await bcrypt.hash('password', 10));
    num++;
}