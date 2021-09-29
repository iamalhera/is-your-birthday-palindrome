const inputDate = document.querySelector("#input");
const checkButton = document.querySelector("#check-button");
const output1 = document.querySelector("#output1");
const output2 = document.querySelector("#output2");
const output3 = document.querySelector("#output3") ;

function checkButtonHandler(){
    var inputDateStr = inputDate.value ;

    if(inputDateStr !=''){
        var listOfInputDate = inputDateStr.split('-');
        var dateO = {day:Number(listOfInputDate[2]),
                     month:Number(listOfInputDate[1]),
                     year:Number(listOfInputDate[0])
                    };
       
        if(checkPalindromeforAllDateFormats(dateO) === true){
            output1.innerText = "YAYY!! Your BirthDate Is PALINDROME ";
            output2.style.display = "none";
            output3.style.display = "none"; 
        }
        else{
            var nextPalindromeArray = getNextPalindromeDate(dateO);
            var previousPalindromeArray = getPreviousPalindromeDate(dateO);

            output1.innerText = "Your BirthDate is NOT Palindrome!!" ;
            output2.style.display = "block";
            output3.style.display = "block";
            output2.innerText = "Next Palindrome Date is "+nextPalindromeArray[1].day+"-"+nextPalindromeArray[1].month+"-"+nextPalindromeArray[1].year+" and it is after "+nextPalindromeArray[0]+ " days" ; 

            output3.innerText = "Previous Palindrome Date is "+previousPalindromeArray[1].day+"-"+previousPalindromeArray[1].month+"-"+previousPalindromeArray[1].year+" and it is before "+previousPalindromeArray[0]+ " days" ; 
        }
        
    }
}

checkButton.addEventListener("click", checkButtonHandler);



function checkpalindrome(str){
    var charList = str.split('');
    var reversedCharList = charList.reverse() ;
    var reverseStr = reversedCharList.join('');
    return reverseStr === str
    }


function convertDateToString(date){
    var dateStr = {day:"",month:"",year:""};
    if (date.day <10){
        dateStr.day = '0'+ date.day;
    }
    else{
        dateStr.day = date.day.toString();
    }
    if (date.month <10){
        dateStr.month = '0'+ date.month;
    }
    else{
        dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();

    return dateStr ;
}

function convertDateToAllFormats(date){
    var dateStr = convertDateToString(date);

    var ddmmyyyy = dateStr.day +dateStr.month + dateStr.year ;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year ;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day ;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2) ;
    var mmddyy = dateStr.month + dateStr.day +dateStr.year.slice(-2) ;
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day ;

    return [ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd] 
}
function checkPalindromeforAllDateFormats(data){
    var listOfDates = convertDateToAllFormats(data);
    isPalindrome = false ;
    for(let i=0 ; i<listOfDates.length ; i++){
        if(checkpalindrome(listOfDates[i])){
            isPalindrome = true ;
            break ;
        }
    }
    return isPalindrome
     
}



function isLeapYear(year){
    if(year%400===0){
        return true
    }
    if(year%4===0){
        return true
    }
    if(year%100===0){
        return false
    }

    return false
}

function getNextDate(data){
    var day = data.day +1 ;
    var month = data.month ;
    var year = data.year ;
    
    var daysInMonth =[31,28,31,30,31,30,31,30,30,31,30,31] ; 
        //0-11
    if(month===2){
       if(isLeapYear(year)){
        if(day>29){
            day=1;
            month=month+1;
        }
        }
        else{
            if(day>28){
                day=1;
                month=month+1;
            }
        }

    }
    else{
        if(day>daysInMonth[month -1]){
            day=1;
            month=month+1 ;
        }

    }

    if(month>12){
        month=1;
        year=year+1;
    }
    var newData={ day:day,month:month,year:year};
    return newData

}

function getPreviousDate(data){
    var day = data.day -1 ; 
    var month = data.month ; 
    var year = data.year ; 
    
    var daysInMonth =[31,28,31,30,31,30,31,30,30,31,30,31] ; 


    if(month===3){
            if(day<1){
                    if(isLeapYear(year)){
                        day=29;
                        month=month-1;
                    }
                    else{
                        day=28;
                        month=month-1;
                    }
                }
            }

        if(day<1){
            if(month===1){
                day=31;
                month=12;
                year=year-1 ;
            }
            else{
            month=month-1 ;
            day=daysInMonth[month-1];
          }
        }

   
    var newDate={ day:day,month:month,year:year};
    return newDate

}


function getNextPalindromeDate(date){
    var counter = 0;
    var nextDate = getNextDate(date);


    while(1){
        counter++ ;
        var checkPalindrome = checkPalindromeforAllDateFormats(nextDate);
        if(checkPalindrome===true){
            break ;
        }

        nextDate = getNextDate(nextDate) ;
    }

    return [counter,nextDate];
}

function getPreviousPalindromeDate(date){
    var counterP = 0 ;
    var previousDate = getPreviousDate(date);

    while(1){
        counterP++ ;
        var checkPalindrome = checkPalindromeforAllDateFormats(previousDate);
        if(checkPalindrome===true){
            break;
        }

        previousDate = getPreviousDate(previousDate) ;
    }
    return [counterP ,previousDate]
}

// var datefarzi = {
//     day : 9,
//     month : 02,
//     year : 2001
// };
// console.log(getNextPalindromeDate(datefarzi));
// console.log(getPreviousPalindromeDate(datefarzi));