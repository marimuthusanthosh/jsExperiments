const hourEle= document.getElementById('hour');
const minEle= document.getElementById('minute'); 
const secEle= document.getElementById('second'); 

const timer = ()=>{

  const currentTime = new Date(); 
  hourEle.innerText=currentTime.getHours(); 
  minEle.innerText=currentTime.getMinutes();
  secEle.innerText=currentTime.getSeconds();
}

setInterval(timer,1000);