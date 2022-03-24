console.log("Hello Boss");
// Get Variable 
const lanPage = document.querySelector(".landing-page");
const settBox = document.querySelector(".sett-box");
const setticon = document.querySelector(".sett-box .circle");
const colorli = document.querySelectorAll(".sett-cont i");
const bulletsSection = document.querySelector('.nav-bullets');
const ranBackEl = document.querySelectorAll(".back-color span");
const AllBullets = document.querySelectorAll('.nav-bullets .bullet');
const SkillProgress = document.querySelector(".skills");
const aboutSection = document.querySelector(".about");
const AllNavLink = document.querySelectorAll(".landing-page .ul-nav a");
const sections = document.querySelectorAll('section');
const bulletsSpan = document.querySelectorAll(".set-bullets span");


// Local Storage Save 
    // Save last Color
    let mainColor = localStorage.getItem("change-color");
    console.log(mainColor + " Color From Local Storage");
    if(mainColor !== null) { // Check on mainColor Contain On Value or no
        // Change Color To color Save on Local Storage
        document.documentElement.style.setProperty("--main-color", mainColor);
        document.documentElement.style.setProperty("--background-color-shadow", localStorage.getItem("Change-shadow"))

        // Remove all Class and Add Class Active On Color Save in Local Storage
        colorli.forEach(ele => {
            ele.classList.remove('active');
            if(ele.dataset.color === mainColor){
                ele.classList.add('active');
            }   
        });
    }

    // Save Last Background
    let mainBackground = localStorage.getItem("background-change");
    console.log("background " + mainBackground);
    if(mainBackground !== null){
        document.documentElement.style.setProperty("--background-image", 'url(../img/' + mainBackground +')');
    }

    // Save Bullets in Local Storage
    let bulletsDisplay = localStorage.getItem("bullets-show");
    if (bulletsDisplay !== null) {
        bulletsSection.style.display = bulletsDisplay;
        document.querySelector('.set-bullets .yes').classList.remove('active');
        if (bulletsDisplay === 'block'){
            document.querySelector(".set-bullets .yes").classList.add("active");
        }else {
            document.querySelector(".set-bullets .no").classList.add("active");
        }
    }


// Setting Box
    // Open Seting
    setticon.addEventListener("click", (e) => {
        settBox.classList.toggle("open");
        setticon.classList.toggle("fa-spin");
        if(settBox.getAttribute('class') === 'sett-box open'){
            console.log('open setting Done');
        } else {
            console.log('Close setting Done');
        }
    });

    // Change Color
    colorli.forEach(i => {
        i.addEventListener("click", (e) => { // Loop for all items
            let collor = e.target.dataset.color;
            let backgroundColorShadow = e.target.dataset.shadow;
            document.documentElement.style.setProperty("--main-color", collor);
            document.documentElement.style.setProperty("--background-color-shadow", backgroundColorShadow);
            console.log('Change Color To ' + collor);

            // Set Color on Local Storage
            let SetColor = localStorage.setItem("change-color", collor);
            localStorage.setItem("Change-shadow", backgroundColorShadow);
            
            // Add Class Active
            handleActive(e);

            // Skill Progress Animation When Change Color
            let allskills = document.querySelectorAll(".progr span");
            console.log(allskills);
            allskills.forEach(skill => {
                if(skill !== null) {
                    skill.style.width = "0";
                    skill.style.overflow = "hidden";
                }
            });
            
        });
    });

    // Check Background
    ranBackEl.forEach(span => {
        span.addEventListener("click", (e) => { // Loop for all items
            
            // Add Class Active
            handleActive(e);

            // Fixed Backgrond after click No
            let backgrou = e.target.dataset.backg;
            if(backgrou === 'yes'){
                backoption = true;
                backinter();
            }else {
                backoption = false;
                clearInterval(theInterval);
            }
        });
    });

    // Show and Hiden Bullets
    bulletsSpan.forEach(span => {
        span.addEventListener("click", (e) => {
            if(span.dataset.bullet === 'show') {
                localStorage.setItem("bullets-show", bulletsSection.style.display = 'block');
            }else {
                localStorage.setItem("bullets-show", bulletsSection.style.display = 'none');
            }
        });
    });

    // Button Reset Local Storage
    document.querySelector("#reset").onclick = function () {
        localStorage.removeItem("change-color");
        localStorage.removeItem("Change-shadow");
        localStorage.removeItem("background-change");
        localStorage.removeItem("bullets-show");
        window.location.reload();
    };

// Bullets and Navbar Links
ScrollToLink (AllBullets);
ScrollToLink (AllNavLink);

// Change background landing Page
let imgArr = ["1.jpg", "2.jpg", "3.jpg", "4.jpg"];
function backinter() {
    if(backoption === true){
        theInterval = setInterval(() => {
            let randArr = imgArr[Math.floor(Math.random() * imgArr.length)]
            localStorage.setItem("background-change", randArr);
            lanPage.style.backgroundImage = "url(img/"+ randArr +")";
            console.log("Change background landing Page to " + randArr);
        }, 4000);
    }
}


// Skills Section \\ Scroll Progress
window.onscroll = function () {
    let skillsOfSetTop = SkillProgress.offsetTop;
    let SkillOurHeight = SkillProgress.offsetHeight;
    let windowHeight = this.innerHeight;
    let windowScrollTop = this.pageYOffset;
    if(windowScrollTop > (skillsOfSetTop + SkillOurHeight - windowHeight)) {
        console.log((skillsOfSetTop + SkillOurHeight - windowHeight))
        // Skills Progress Full
        let allskills = document.querySelectorAll(".progr span");
        allskills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        });
    }
};


// Section My Work
    // Create Overlay and popup-box dynamic
    let myWork = document.querySelectorAll(".image-box img"); // Select image
    myWork.forEach(img => { // Loop on image
        img.addEventListener("click", (e)=> { // Event When Click on Image
            // Create Overlay
            let overlay = document.createElement("div");
            overlay.className = "popup-overlay";
            document.body.appendChild(overlay);

            // Create The Popup Box
            let popupBox = document.createElement("div");
            popupBox.className = "popup-box";
            //Create Bottom Close popup-box
            popupBox.innerHTML = '<i class="fa fa-times-circle close-popup" aria-hidden="true"></i>';
            

            // Add image Select To Popup
            let imageSelect = document.createElement("img");
            imageSelect.src = img.src;
            popupBox.appendChild(imageSelect);
            document.body.appendChild(popupBox);

            // Create Bottom For Convert to Link Project 
            let bottomLink = document.createElement("a");
            bottomLink.className = "bottomLink";
            let bottomLinkText = document.createTextNode("Link Website");
            bottomLink.appendChild(bottomLinkText);
            popupBox.appendChild(bottomLink);
            bottomLink.setAttribute("href", img.alt);
            bottomLink.setAttribute("target", "_blank");

        });
    });

    // Close Popup-box and Overlay
    document.addEventListener("click", (close)=> {
        if (close.target.className == 'fa fa-times-circle close-popup') {
            close.target.parentNode.remove();
            document.querySelector(".popup-overlay").remove();
        }
    });


//function use 

    // Function To Scroll Smooth on Link
    function ScrollToLink (AllLinls) {
        AllLinls.forEach(link => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                handleActive(e);
                document.querySelector(e.target.dataset.section).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    };

    // Function Handle Class Active
    function handleActive(eve) {
        // Remove All Class Active
        eve.target.parentElement.querySelectorAll('.active').forEach(element => {
            element.classList.remove('active');
        });

        // Add Class Active on Selected
        eve.target.classList.add('active');
    }



// Test Code