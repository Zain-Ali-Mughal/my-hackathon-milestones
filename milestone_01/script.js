var toggleSkillsButton = document.getElementById("toggle-skills");
var skills = document.getElementById("skills");
toggleSkillsButton.addEventListener("click", function () {
    if (skills.style.display === "none") {
        skills.style.display = "block";
        toggleSkillsButton.textContent = "Hide Skills";
    }
    else {
        skills.style.display = "none";
        toggleSkillsButton.textContent = "Show Skills";
    }
});
