// Geting the form and add submit event listener
document
    .getElementById("resume-form")
    .addEventListener("submit", function (event) {
    event.preventDefault();
    // Retrieve form values with proper type annotations
    var name = document.getElementById("name")
        .value;
    var email = document.getElementById("email")
        .value;
    var phone = document.getElementById("phone")
        .value;
    var address = document.getElementById("address").value;
    // Split ENTER-separated values into arrays for education, skills, and work experience and certifications
    var education = document.getElementById("education").value.split("\n");
    var skills = document.getElementById("skills").value.split("\n");
    var workExperience = document.getElementById("work-experience").value.split("\n");
    // Profile picture is a file, retrieved as File type
    var profilePicture = document.getElementById("profile-picture").files[0];
    var careerObjective = document.getElementById("career-objective").value;
    var certifications = document.getElementById("certifications").value.split("\n");
    // Creating a FileReader to read the uploaded image
    var reader = new FileReader();
    reader.onload = function () {
        var profilePictureURL = reader.result; // Safely cast result to string
        var newWindow = window.open("", "_blank");
        if (newWindow) {
            newWindow.document.write("\n          <!DOCTYPE html>\n          <html lang=\"en\">\n          <head>\n            <meta charset=\"UTF-8\">\n            <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n            <link href=\"https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap\" rel=\"stylesheet\">\n            <title>Generated Resume</title>\n            <link rel=\"stylesheet\" href=\"styles.css\">\n          </head>\n          <body>\n            <div class=\"container\">\n              <div class=\"left-container\">\n                <img src=\"".concat(profilePictureURL, "\" alt=\"Profile Picture\" class=\"profile-picture\"/>\n                <section id=\"objective\" contenteditable=\"true\">\n                  <h3 style=\"color: white\">Career Objective</h3>\n                  <p style=\"text-align: justify; hyphens: auto\">").concat(careerObjective, "</p>\n                </section>\n                <section id=\"certificates\" contenteditable=\"true\">\n                  <h3 style=\"color: white\">Certifications</h3>\n                  <ul>").concat(certifications
                .map(function (cert) { return "<li>".concat(cert, "</li>"); })
                .join(""), "</ul>\n                </section>\n              </div>\n              <div class=\"right-container\">\n                <h1 contenteditable=\"true\">My Resume</h1>\n                <section id=\"personal-info\" contenteditable=\"true\">\n                  <h3 style=\"color: black\">Personal Information</h3>\n                  <p><b>Name:</b> ").concat(name, "</p>\n                  <p><b>Email:</b> <a href=\"mailto:").concat(email, "\">").concat(email, "</a></p>\n                  <p><b>Phone:</b> ").concat(phone, "</p>\n                  <p><b>Address:</b> ").concat(address, "</p>\n                </section>\n                <section id=\"education\" contenteditable=\"true\">\n                  <h3 style=\"color: black\">Education</h3>\n                  <ul>").concat(education.map(function (edu) { return "<li>".concat(edu, "</li>"); }).join(""), "</ul>\n                </section>\n                <section id=\"skills\" contenteditable=\"true\">\n                  <h3 style=\"color: black\">Skills</h3>\n                  <ul>").concat(skills
                .map(function (skill) { return "<li>".concat(skill, "</li>"); })
                .join(""), "</ul>\n                </section>\n                <section id=\"work-experience\" contenteditable=\"true\">\n                  <h3 style=\"color: black\">Work Experience</h3>\n                  <ul>").concat(workExperience
                .map(function (exp) { return "<li>".concat(exp, "</li>"); })
                .join(""), "</ul>\n                </section>\n              </div>\n            </div>\n          </body>\n          </html>\n        "));
        }
    };
    // Reading the profile picture as a Data URL
    reader.readAsDataURL(profilePicture);
});
