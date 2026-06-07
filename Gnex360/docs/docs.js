document.addEventListener("DOMContentLoaded", () => {

    const links =
        document.querySelectorAll(".member-docs-link");

    const sections =
        document.querySelectorAll(
            ".member-docs-content section"
        );

    links.forEach(link => {

        link.addEventListener("click", e => {

            e.preventDefault();

            const target =
                document.querySelector(
                    link.getAttribute("href")
                );

            target.scrollIntoView({
                behavior:"smooth",
                block:"start"
            });

        });

    });

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 150;

            if(window.scrollY >= top){
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

    });

});