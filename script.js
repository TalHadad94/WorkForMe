// Smooth Scrolling
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default behavior
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    });
});

// Navbar Highlighting on Scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLinks[index]?.classList.add('active');
        }
    });
});

// Language Toggle
const translations = {
    en: {
        navHome: "Home",
        navAbout: "About Me",
        navProjects: "Projects",
        navContact: "Contact",
        headerTitle: "EveryTal",
        aboutTitle: "About Me",
        aboutContent: "I am Tal Hadad, a passionate Full Stack Developer and AI enthusiast. I create innovative web applications and AI-driven projects.",
        projectsTitle: "My Projects",
        projectName: "Pic2Peak",
        projectDescription: "Convert 2D landscape images into 3D environments using TensorFlow, Python, and Blender.",
        contactTitle: "Contact Me",
        formName: "Name:",
        formEmail: "Email:",
        formMessage: "Message:",
        formButton: "Send",
        footer: "© 2024 Tal Hadad. All rights reserved.",
    },
    he: {
        navHome: "בית",
        navAbout: "על עצמי",
        navProjects: "פרויקטים",
        navContact: "צור קשר",
        headerTitle: "ברוכים הבאים לפורטפוליו שלי",
        aboutTitle: "עליי",
        aboutContent: "אני טל הדד, מפתח פול סטאק נלהב וחובב בינה מלאכותית. אני יוצר יישומי רשת חדשניים ופרויקטים מונעי בינה מלאכותית.",
        projectsTitle: "הפרויקטים שלי",
        projectName: "Pic2Peak",
        projectDescription: "להמיר נופים דו-ממדיים לסביבות תלת-ממדיות באמצעות AI.",
        contactTitle: "צור קשר",
        formName: "שם:",
        formEmail: "אימייל:",
        formMessage: "הודעה:",
        formButton: "שלח",
        footer: "© 2024 טל חדד. כל הזכויות שמורות.",
    },
};

let currentLanguage = "he"; // Default language

document.getElementById("language-toggle").addEventListener("click", () => {
    currentLanguage = currentLanguage === "en" ? "he" : "en";
    updateLanguage();
});

function updateLanguage() {
    const lang = translations[currentLanguage];

    // Update Navbar
    const navLinks = document.querySelectorAll('nav a');
    navLinks[0].textContent = lang.navHome;
    navLinks[1].textContent = lang.navAbout;
    navLinks[2].textContent = lang.navProjects;
    navLinks[3].textContent = lang.navContact;

    // Update Header
    document.querySelector("header h1").textContent = lang.headerTitle;

    // Update Sections
    document.querySelector("#about h2").textContent = lang.aboutTitle;
    document.querySelector("#about p").textContent = lang.aboutContent;
    document.querySelector("#projects h2").textContent = lang.projectsTitle;
    document.querySelector("#projects .project h3").textContent = lang.projectName;
    document.querySelector("#projects .project p").textContent = lang.projectDescription;

    // Update Contact Section
    document.querySelector("#contact h2").textContent = lang.contactTitle;
    document.querySelector('label[for="name"]').textContent = lang.formName;
    document.querySelector('label[for="email"]').textContent = lang.formEmail;
    document.querySelector('label[for="message"]').textContent = lang.formMessage;
    document.querySelector("#contact button").textContent = lang.formButton;

    // Update Footer
    document.querySelector("footer p").textContent = lang.footer;

    // Update Toggle Button Text
    document.getElementById("language-toggle").textContent = currentLanguage === "en" ? "עברית" : "English";
}

updateLanguage(); // Initial load to ensure default language setup