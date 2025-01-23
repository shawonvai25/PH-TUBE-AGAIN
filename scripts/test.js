
// const isVerified = "";

// // if(isVerified == true){
// //     console.log("user is verified")
// // }
// // else{
// //     console.log("user is not verified");
// // }

// console.log(`${isVerified == true ? "user is done":"user lost"}`)


function getTimeString(time){

    //get hour and rest seconds 
    const hour = parseInt(time/3600);
    let remainingSecond = (time % 3600);
    const minute = parseInt(remainingSecond / 60);
    const second = remainingSecond % 60;
    return `${hour} hour ${minute}minute ${second} second ago`;
}

console.log(getTimeString(7865));