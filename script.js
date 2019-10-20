function initSlider(){
    let body = document.querySelector("body");

    let background = document.createElement("div");
    let iframe = document.createElement("iframe");
    let projectPage1 = document.querySelector("#projects__slide1");
    let projectPage2 = document.querySelector("#projects__slide2");

    background.className = "iframe__background";
    iframe.className = "iframe__block";

    background.appendChild(iframe);
    body.appendChild(background);

    let buttonsContainer = document.createElement("div");

    let buttonToggle = document.createElement("button");
    let buttonExit = buttonToggle.cloneNode();

    buttonsContainer.className = "res_buttons__container";
    buttonToggle.className = "res_button";
    buttonExit.className = "res_button";

    buttonExit.innerText = "back";

    buttonsContainer.appendChild(buttonToggle);
    buttonsContainer.appendChild(buttonExit);

    body.appendChild(buttonsContainer);

    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const isDesktop = width > 1023;
    /*
    function isDesktop(){
        const width  = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        //console.log("width", width)
        return width > 1023;
    }
    */
    function assignButton(mobileWidth, desktopWidth){
        let toggleState = 1;
        
        let BUTTON_CONFIG = [
            {
                buttonName: "to desktop", 
                buttonAction: () => {
                    iframe.width = mobileWidth;
                }
            },
            {
                buttonName: "to mobile", 
                buttonAction: () => {
                    iframe.width = desktopWidth;
                }
            }
        ];

        let state = BUTTON_CONFIG[toggleState % BUTTON_CONFIG.length];
        buttonToggle.innerText = state.buttonName;
        buttonToggle.onclick = function(){
            ++toggleState;
            state = BUTTON_CONFIG[toggleState % BUTTON_CONFIG.length];
            buttonToggle.innerText = state.buttonName;
            state.buttonAction();
        }
    }

    function showElems(){
        background.style.display = "flex";
        if (isDesktop){
            buttonToggle.style.display = "block";
        }
        buttonExit.style.display = "block";
        buttonsContainer.style.display = "grid";
    }

    function hideElems(){
        background.style.display = "none";
        buttonToggle.style.display = "none";
        buttonsContainer.style.display = "none";
        buttonExit.style.display = "none";
    }

    buttonExit.onclick = hideElems;

    /*
    projectPage1.addEventListener("click", () => {
        showElems();
        let mobileWidth = projectPage1.getAttribute("minWidth");
        let desktopWidth = projectPage1.getAttribute("maxWidth");
        iframe.src = projectPage1.getAttribute("pathToSrc");
        if (isDesktop){
            iframe.width = desktopWidth;
        } else {
            iframe.width = mobileWidth;
        }
        assignButton(mobileWidth, desktopWidth);
    });

    projectPage2.addEventListener("click", () => {
        showElems();
        let mobileWidth = projectPage2.getAttribute("minWidth");
        let desktopWidth = projectPage2.getAttribute("maxWidth");
        iframe.src = projectPage2.getAttribute("pathToSrc");
        if (isDesktop){
            iframe.width = desktopWidth;
        } else {
            iframe.width = mobileWidth;
        }
        assignButton(mobileWidth, desktopWidth);
    });
    */

    /*Hide-open*/
    let HOButton1 = document.querySelector("#button__mobile__description1")
    let HOButton2 = document.querySelector("#button__mobile__description2")

    const SHOWING_SLIDE_DESCRIPTION = "projetcs__slide__description__content__showing";

    HOButton1.innerText = "show";
    HOButton2.innerText = "show";
    
    function HOButtonClick(){
        const forItem = document.querySelector(`#${this.getAttribute("data-for")}`);
        let text = "";
        if (forItem.classList.contains(SHOWING_SLIDE_DESCRIPTION)){
            forItem.classList.remove(SHOWING_SLIDE_DESCRIPTION)
            text = "show";
        } else {
            forItem.classList.add(SHOWING_SLIDE_DESCRIPTION)
            text = "hide";
        }
        this.innerText = text;
        console.log("click:", this);
    }

    HOButton1.onclick = HOButtonClick;
    HOButton2.onclick = HOButtonClick;
    const educationBlock = document.querySelector("#list_toggle_block");
    const educationToggler = document.querySelector("#toggler");
    const educationList = document.querySelector("#list_block");

    const LIST_CLOSED = "list__closed";
    const TOGGLER_ROTATED = "education__transformed";

    educationBlock.addEventListener("click", () => {
        console.log("toggle list closing")
        if (educationList.classList.contains(LIST_CLOSED)){
            educationList.classList.remove(LIST_CLOSED);
            educationToggler.classList.add(TOGGLER_ROTATED);
        } else {
            educationList.classList.add(LIST_CLOSED);
            educationToggler.classList.remove(TOGGLER_ROTATED);
        }
    })

    const slideList = document.querySelector("#slide_list");
    const slides = document.querySelectorAll("#slide_list > .projetcs__slide");
    //let slideInterval = setInterval(nextSlide, 2000);

    const step = 1;
    let currentSlide = 0;

    //const NORMAL_CLASS_NAME = "projetcs__slide";

    const SHOWING_CLASS_NAME = "projects__slide__showing";

    slides[currentSlide].classList.add(SHOWING_CLASS_NAME)

    function swapSlide(n) {
        slides[currentSlide].classList.remove(SHOWING_CLASS_NAME);
        currentSlide = Math.abs(slides.length + n) % slides.length;
        slides[currentSlide].classList.add(SHOWING_CLASS_NAME);
    }

    function nextSlide(){
        swapSlide(currentSlide + step);
    }

    function prevSlide(){
        swapSlide(currentSlide - step);
    }


    const arrowLeft = document.querySelector("#arrow_left");
    const arrowRight = document.querySelector("#arrow_right");

    arrowLeft.addEventListener("click", prevSlide);
    arrowRight.addEventListener("click", nextSlide);

    function addSwipe(slides, maxTime, minColisionX, maxColisionY){
        let startTime = 0;
        let startX = 0;
        let startY = 0;

        function imageOnClick(){
            let currentTime = new Date().getTime();
            if ((currentTime - startTime) > 100){
                return;
            }
            showElems();
            let mobileWidth = this.getAttribute("minWidth");
            let desktopWidth = this.getAttribute("maxWidth");
            iframe.src = this.getAttribute("pathToSrc");
            if (isDesktop){
                iframe.width = desktopWidth;
            } else {
                iframe.width = mobileWidth;
            }
            assignButton(mobileWidth, desktopWidth);
        }
        projectPage1.addEventListener("click", imageOnClick);
        projectPage2.addEventListener("click", imageOnClick);

        function mouseDown(e){
            //console.log("mouseDown", currentSlide)
            e.preventDefault();
            startX = e.clientX;
            startY = e.clientY;

            startTime = new Date().getTime();
        }
        
        function mouseUp(e){
            //console.log("mouseUp", currentSlide)
            e.preventDefault();
            let newX = e.clientX;
            let newY = e.clientY;

            let currentTime = new Date().getTime();
            let timeDifference = currentTime - startTime; 

            if (timeDifference < maxTime){
                let colisionX = Math.abs(startX - newX);
                let colisionY = startY - newY;
                //console.log("1st Step")
                //console.log(colisionX, '<', minColisionX, colisionY, ">", maxColisionY)
                if (colisionX > minColisionX && Math.abs(colisionY) < maxColisionY){
                    //console.log("2nd step");
                    //console.log(colisionY);
                    if (colisionY > 0){
                        nextSlide();
                    } else {
                        prevSlide();
                    }
                }
            }
        }
        slides.addEventListener("mousedown", mouseDown);
        slides.addEventListener("mouseup", mouseUp);
    }
    
    addSwipe(slideList, 700, 50, 200);
}

initSlider();