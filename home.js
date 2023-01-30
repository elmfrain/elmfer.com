var projects;

function onLoad()
{
    document.querySelector(".logo_pre_load").classList.add("logo");
    projects = document.querySelectorAll(".project");


    projects.forEach(project =>
        {
            project.addEventListener("mouseover", onProjOver);
            project.addEventListener("mouseout", onProjOut);
            project.addEventListener("click", onProjClick);
        })
}

function onProjClick(event)
{
    var project = event.target;
    while(project.className != "project")
    {
        project = project.parentNode;
    }

    switch(project.id)
    {
        case "parkour_recorder":
            window.open("https://prmod.elmfer.com", "_self");
            break;
        case "teensy_stopwatch":
            window.open("teensy_stopwatch/", "_self");
            break;
        case "engmsc":
            window.open("engine_music/", "_self");
            break;
    }
}

function onProjOver(event)
{
    document.body.style.cursor = "pointer";

    var project = event.target;
    while(project.className != "project")
    {
        project = project.parentNode;
    }

    var img = project.querySelector("img");
    var tab = project.querySelector(".project_tab");
    var tabP = tab.querySelector(".project_tab_p");
    var h3 = project.querySelector(".project_desc").querySelector("h3");

    img.classList.add("project_img_hover");
    tab.classList.add("project_tab_hover");
    tabP.classList.add("project_tab_p_hover");
    h3.classList.add("project_desc_h3_hover");
}

function onProjOut(event)
{
    document.body.style.cursor = "default";

    var project = event.target;
    while(project.className != "project")
    {
        project = project.parentNode;
    }

    var img = project.querySelector("img");
    var tab = project.querySelector(".project_tab");
    var tabP = tab.querySelector(".project_tab_p");
    var h3 = project.querySelector(".project_desc").querySelector("h3");

    img.classList.remove("project_img_hover");
    tab.classList.remove("project_tab_hover");
    tabP.classList.remove("project_tab_p_hover");
    h3.classList.remove("project_desc_h3_hover");
}

window.onload = onLoad;