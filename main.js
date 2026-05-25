
const lerp = (from, to, x) => from * (1.0 - x) + to * x;

const pages = {nav1:"Home.html",nav2:"Games.html",nav3:"Tools.html",nav4:"About.html"};

var selectedNav;
var navLerpbar;
var pageContent;
var targetPage = "Home.html";

function init() {
    navSelect("nav1");
    navLerpbar = document.getElementById("navSelect");
    pageContent = document.getElementById("pageContent");
    navLerpbar.style.left = selectedNav.offsetLeft + "px";
}

function process() {
    if (selectedNav && navLerpbar) {
        navLerpbar.style.paddingRight = selectedNav.offsetWidth + "px";
        var NewMargin = lerp(navLerpbar.offsetLeft, selectedNav.offsetLeft, 0.2);
        navLerpbar.style.left = NewMargin + "px";
    }
    
    if(pageContent == null){
        return;
    }
    
    if (!pageContent.src.endsWith(targetPage)){
        if (pageContent.style.opacity > 0.01){
            pageContent.style.opacity = lerp(pageContent.style.opacity, 0.0, 0.2);
        } else {
            pageContent.src = targetPage;
            pageContent.style.opacity = 0.0;
        }
    } else if (pageContent.style.opacity < 1.0) {
        pageContent.style.opacity = lerp(pageContent.style.opacity, 1.0, 0.1);
    }
}

function navSelect(id) {
    var Unselected = document.getElementsByClassName("navbutton");
    var Selected = document.getElementsByClassName("navbuttonSelected");
    for (const i of Unselected) {
        if (i.id == id) {i.className = "navbuttonSelected"; selectedNav = i;}
    }
    for (const i of Selected) {
        if (i.id != id) {i.className = "navbutton"; }
    }
    targetPage = pages[id];
}

setInterval(process, 16);

window.onload = init;
