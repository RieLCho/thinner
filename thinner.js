htmlTags = document.getElementsByTagName("html")
for(var i=0; i < htmlTags.length; i++) {
    console.log(htmlTags[i]);
    console.log(htmlTags[i].style);
    console.log(htmlTags[i].style.scrollBarWidth);
    htmlTags[i].style.scrollBarWidth = "thin";
    console.log(htmlTags[i].style.scrollBarWidth);
}