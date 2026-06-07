document.addEventListener("DOMContentLoaded", () => {

    const links =
        document.querySelectorAll(".guide-link");

    const sections =
        document.querySelectorAll(
            ".guide-content section"
        );

    // Smooth scrolling when clicking sidebar links
    links.forEach(link => {

        link.addEventListener("click", e => {

            e.preventDefault();

            const target =
                document.querySelector(
                    link.getAttribute("href")
                );

            if(target){

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });

    // Highlight active section while scrolling
    function updateActiveLink(){

        let current = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 180;

            const sectionHeight =
                section.offsetHeight;

            if(
                window.scrollY >= sectionTop &&
                window.scrollY <
                sectionTop + sectionHeight
            ){
                current = section.id;
            }

        });

        links.forEach(link => {

            link.classList.remove("active");

            if(
                link.getAttribute("href") ===
                "#" + current
            ){
                link.classList.add("active");
            }

        });

    }

    window.addEventListener(
        "scroll",
        updateActiveLink
    );

    updateActiveLink();

});