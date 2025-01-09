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
        footer: "© 2025 Tal Hadad. All rights reserved.",
    },
    he: {
        navHome: "פתיח",
        navAbout: "על עצמי",
        navProjects: "פרויקטים",
        navContact: "צור קשר",
        headerTitle: "ברוכים הבאים",
        aboutTitle: "קצת על עצמי",
        aboutContent: "שמי טל חדד, מהנדס תוכנה העוסק בפיתוח אתרים, אפליקציות, בינה מלאכותית, ועוד... בנוסף, חובב ועובד בעבודות עץ (ריהוט, דקים, פרגולות...).",
        projectsTitle: "הפרויקטים שלי",
        projectName: "Pic2Peak",
        projectDescription: "להמיר נופים דו-ממדיים לסביבות תלת-ממדיות באמצעות AI.",
        contactTitle: "צור קשר",
        formName: "שם:",
        formEmail: "אימייל:",
        formMessage: "הודעה:",
        formButton: "שלח",
        footer: "© 2025 טל חדד. כל הזכויות שמורות.",
    },
};

let currentLanguage = "he"; // Default language

document.getElementById("language-toggle").addEventListener("click", () => {
    currentLanguage = currentLanguage === "en" ? "he" : "en";
    updateLanguage();
});

function updateLanguage() {
    const lang = translations[currentLanguage];

    // Update Navbar links
    const navLinks = [
        { id: "home", text: lang.navHome },
        { id: "about", text: lang.navAbout },
        { id: "projects", text: lang.navProjects },
        { id: "contact", text: lang.navContact },
    ];

    const navUl = document.querySelector("nav ul");
    navUl.innerHTML = ""; // Clear existing links

    const orderedLinks = currentLanguage === "he" ? navLinks.reverse() : navLinks;
    orderedLinks.forEach(link => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = `#${link.id}`;
        a.textContent = link.text;
        li.appendChild(a);
        navUl.appendChild(li);
    });

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

    // Adjust text direction
    document.body.dir = currentLanguage === "he" ? "rtl" : "ltr";
}

updateLanguage(); // Initial load to ensure default language setup