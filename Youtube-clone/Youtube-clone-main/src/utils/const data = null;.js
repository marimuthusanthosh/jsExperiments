const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open("GET", "https://youtube-v31.p.rapidapi.com/search?part=snippet&order=date&q=react%20js");
xhr.setRequestHeader("x-rapidapi-key", "63e553ee57msh19366e9b8ee1650p1b4a5bjsnba504d8ad221");
xhr.setRequestHeader("x-rapidapi-host", "youtube-v31.p.rapidapi.com");

xhr.send(data);