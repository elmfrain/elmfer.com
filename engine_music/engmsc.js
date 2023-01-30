function onLoad()
{
    document.querySelector(".banner").classList.add("banner_onload");
    onResize();
}

function onResize()
{
    if(window.innerWidth < 700)
    {
        document.querySelector("#banner_background").style.height = "2in";
        document.querySelectorAll(".img_content").forEach(e => e.style.transform = "translate(-50%, 0px) scale(0.8)");
        document.querySelector(".tab_content").style.height = "2.5in";
        document.querySelectorAll(".img_view").forEach(e => e.style.height = "1.25in");
        document.querySelectorAll(".img_view").forEach(e => e.style.fontSize = "10px");
    }
    else
    {
        document.querySelector("#banner_background").style.height = "3in";
        document.querySelectorAll(".img_content").forEach(e => e.style.transform = "translate(-50%, 0px) scale(1.0)");
        document.querySelector(".tab_content").style.height = "3in";
        document.querySelectorAll(".img_view").forEach(e => e.style.height = "2.25in");
        document.querySelectorAll(".img_view").forEach(e => e.style.fontSize = "14px");
    }
}

window.onload = onLoad;
window.onresize = onResize;