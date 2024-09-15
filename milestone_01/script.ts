const toggleSkillsButton = document.getElementById(
  "toggle-skills"
) as HTMLButtonElement;
const skills = document.getElementById("skills") as HTMLDivElement;

toggleSkillsButton.addEventListener("click", () => {
  if (skills.style.display === "none") {
    skills.style.display = "block";
    toggleSkillsButton.textContent = "Hide Skills";
  } else {
    skills.style.display = "none";
    toggleSkillsButton.textContent = "Show Skills";
  }
});
