document.getElementById("prem").onclick = ()=>{
    location.href ="./premium.html"
}
function slideshow(){
 
let images=[`https://www.myfitnesspal.com/_next/image?url=%2Fpages%2Fhome%2Fvictory-story-1.jpg&w=1920&q=75`,`https://www.myfitnesspal.com/_next/image?url=%2Fpages%2Fhome%2Fvictory-story-2.jpg&w=1920&q=75`,`https://www.myfitnesspal.com/_next/image?url=%2Fpages%2Fhome%2Fvictory-story-3.jpg&w=1920&q=75`]

let imgelement= document.createElement("img")
slideshow_div.append(imgelement);
let i=1;
 setInterval(function(){
if(i==images.length){
    i=0;
}
imgelement.src=images[i];
slideshow_div.append(imgelement);
i++;
 },2000)
}
slideshow();
