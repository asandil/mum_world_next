document.addEventListener("DOMContentLoaded", function () {
    const allLinks = document.querySelectorAll(".head");
    const fullPathname = window.location.pathname;

    // Extract the base pathname (e.g., "/blog")
    const basePathname = fullPathname.split("/")[1];
    const trimmedBasePathname = basePathname ? `/${basePathname}` : "/";

    allLinks.forEach((link) => {
        const href = link.getAttribute("href").split("/")[1];
        const comphref = href ? `/${href}` : "/"
        if (trimmedBasePathname === comphref) {
            // Modify the styling or add a class for the active link
            link.classList.add("active-link");
            // Check if the current link is one of the tools
            if (href === "baby-vaccination-chart" || href === "due-date-calculator") {
                const parentListItem = link.closest("li");
                // parentListItem.classList.add("active-link")
                if (parentListItem) {
                    const dropdown = parentListItem.querySelector(".child");
                    if (dropdown) {
                        dropdown.classList.add("active-link");
                    }
                }
            }
        }
    });


});

//for mobilemenu
const hamburger = document.getElementById("hamburger");
const mobilemenu = document.getElementById("mobilemenu");
const close = document.getElementById("closemenu");
hamburger.addEventListener("click", () => {
    mobilemenu.classList.remove("hidden");
});
close.addEventListener("click", () => {
    mobilemenu.classList.add("hidden");
});

document.addEventListener("DOMContentLoaded", function () {
    const allLinks = document.querySelectorAll(".mobileHead");
    const fullPathname = window.location.pathname;

    // Extract the base pathname (e.g., "/blog")
    const basePathname = fullPathname.split("/")[1];
    const trimmedBasePathname = basePathname ? `/${basePathname}` : "/";

    allLinks.forEach((link) => {
        const href = link.getAttribute("href");
        if (trimmedBasePathname === href) {
            // Modify the styling or add a class for the active link
            link.classList.add("active-link");
        }
    });
});