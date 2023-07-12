export default function timeDifference(previous) {
    const unixPreviosTime = new Date(previous).getTime()
    const current = Date.now()
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;
    
    var elapsed = current - unixPreviosTime;
    
    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';   
    }
    
    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }
    
    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
         return + Math.round(elapsed/msPerDay) + ' days ago';   
    }
    
    else if (elapsed < msPerYear) {
         return + Math.round(elapsed/msPerMonth) + ' months ago';   
    }
    
    else {
         return + Math.round(elapsed/msPerYear ) + ' years ago';   
    }

}