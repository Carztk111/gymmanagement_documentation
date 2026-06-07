document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       SIDEBAR NAVIGATION
    ========================= */

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

    /* =========================
       ACTIVE SIDEBAR LINK
    ========================= */

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
                link.getAttribute("href")
                === "#" + current
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

    /* =========================
       ACCORDION
    ========================= */

    const accordionHeaders =
        document.querySelectorAll(
            ".accordion-header"
        );

    accordionHeaders.forEach(header => {

        header.addEventListener("click", () => {

            const item =
                header.parentElement;

            const isOpen =
                item.classList.contains(
                    "active"
                );

            document
                .querySelectorAll(
                    ".accordion-item"
                )
                .forEach(acc => {

                    acc.classList.remove(
                        "active"
                    );

                });

            if(!isOpen){

                item.classList.add(
                    "active"
                );

            }

        });

    });

    /* =========================
       BACK TO TOP BUTTON
    ========================= */

    const backToTop =
        document.getElementById(
            "backToTop"
        );

    if(backToTop){

        window.addEventListener(
            "scroll",
            () => {

                if(
                    window.scrollY > 500
                ){

                    backToTop.classList.add(
                        "show"
                    );

                }else{

                    backToTop.classList.remove(
                        "show"
                    );

                }

            }
        );

        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({

                    top:0,

                    behavior:"smooth"

                });

            }
        );

    }

});
