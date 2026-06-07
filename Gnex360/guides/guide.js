document.addEventListener("DOMContentLoaded", () => {

    /* ====================================
       SIDEBAR NAVIGATION
    ==================================== */

    const links =
        document.querySelectorAll(".guide-link");

    const sections =
        document.querySelectorAll(
            ".guide-content section"
        );

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

            link.classList.remove(
                "active"
            );

            if(
                link.getAttribute("href") ===
                "#" + current
            ){
                link.classList.add(
                    "active"
                );
            }

        });

    }

    window.addEventListener(
        "scroll",
        updateActiveLink
    );

    updateActiveLink();

    /* ====================================
       ACCORDION FUNCTIONALITY
    ==================================== */

    const accordionHeaders =
        document.querySelectorAll(
            ".accordion-header"
        );

    accordionHeaders.forEach(header => {

        header.addEventListener("click", () => {

            const currentItem =
                header.parentElement;

            const isOpen =
                currentItem.classList.contains(
                    "active"
                );

            document
                .querySelectorAll(
                    ".accordion-item"
                )
                .forEach(item => {

                    item.classList.remove(
                        "active"
                    );

                });

            if(!isOpen){

                currentItem.classList.add(
                    "active"
                );

            }

        });

    });

    /* ====================================
       OPEN FIRST ACCORDION BY DEFAULT
    ==================================== */

    const firstAccordion =
        document.querySelector(
            ".accordion-item"
        );

    if(firstAccordion){

        firstAccordion.classList.add(
            "active"
        );

    }

});
