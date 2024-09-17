// Get the form and add submit event listener
document
    .getElementById("resume-form")
    .addEventListener("submit", function (event) {
    event.preventDefault();
    // Retrieve form values
    var username = document.getElementById("username")
        .value;
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var address = document.getElementById("address")
        .value;
    var education = document.getElementById("education").value.split("\n");
    var skills = document.getElementById("skills").value.split("\n");
    var workExperience = document.getElementById("work-experience").value.split("\n");
    var profilePicture = document.getElementById("profile-picture").files[0];
    var careerObjective = document.getElementById("career-objective").value;
    var certifications = document.getElementById("certifications").value.split("\n");
    // Create a FileReader to read the uploaded image
    var reader = new FileReader();
    reader.onload = function () {
        var profilePictureURL = reader.result; // Cast result to string
        // Generate a new window and pass the username as part of the query string
        var newWindow = window.open("", "_blank");
        if (newWindow) {
            // Store the resume data in localStorage with the username as the key
            var resumeData = {
                name: name,
                email: email,
                phone: phone,
                address: address,
                education: education,
                skills: skills,
                workExperience: workExperience,
                careerObjective: careerObjective,
                certifications: certifications,
                profilePictureURL: profilePictureURL,
            };
            localStorage.setItem(username, JSON.stringify(resumeData));
            // Writing the resume content directly to the new window
            newWindow.document.write("\n        <!DOCTYPE html>\n        <html lang=\"en\">\n        <head>\n          <meta charset=\"UTF-8\">\n          <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n          <link href=\"https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap\" rel=\"stylesheet\">\n          <title>Generated Resume</title>\n          <link rel=\"stylesheet\" href=\"styles.css\">\n        </head>\n        <body>\n          <div class=\"container\">\n            <div class=\"left-container\">\n              <img src=\"".concat(profilePictureURL, "\" alt=\"Profile Picture\" class=\"profile-picture\"/>\n              <section id=\"objective\" contenteditable=\"true\">\n                <h3 style=\"color: white\">Career Objective</h3>\n                <p style=\"text-align: justify; hyphens: auto\">").concat(careerObjective, "</p>\n              </section>\n              <section id=\"certificates\" contenteditable=\"true\">\n                <h3 style=\"color: white\">Certifications</h3>\n                <ul>").concat(certifications
                .map(function (cert) { return "<li>".concat(cert, "</li>"); })
                .join(""), "</ul>\n              </section>\n            </div>\n            <div class=\"right-container\">\n              <h1 contenteditable=\"true\">My Resume</h1>\n              <section id=\"personal-info\" contenteditable=\"true\">\n                <h3 style=\"color: black\">Personal Information</h3>\n                <p><b>Name:</b> ").concat(name, "</p>\n                <p><b>Email:</b> <a href=\"mailto:").concat(email, "\">").concat(email, "</a></p>\n                <p><b>Phone:</b> ").concat(phone, "</p>\n                <p><b>Address:</b> ").concat(address, "</p>\n              </section>\n              <section id=\"education\" contenteditable=\"true\">\n                <h3 style=\"color: black\">Education</h3>\n                <ul>").concat(education.map(function (edu) { return "<li>".concat(edu, "</li>"); }).join(""), "</ul>\n              </section>\n              <section id=\"skills\" contenteditable=\"true\">\n                <h3 style=\"color: black\">Skills</h3>\n                <ul>").concat(skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join(""), "</ul>\n              </section>\n              <section id=\"work-experience\" contenteditable=\"true\">\n                <h3 style=\"color: black\">Work Experience</h3>\n                <ul>").concat(workExperience
                .map(function (exp) { return "<li>".concat(exp, "</li>"); })
                .join(""), "</ul>\n              </section>\n            </div>\n          </div>\n          <!-- Shareable link and download/print buttons -->\n          <div class=\"shareable-link-container\" style=\"text-align: center;\">\n            <h2>Shareable Link</h2>\n            <p>Here is your unique link:</p>\n            <a href=\"resume.html?username=").concat(encodeURIComponent(username), "\" target=\"_blank\">Resume Link</a>\n          </div>\n          <div class=\"action-button\" style=\"text-align: center;\">\n            \n            <button id=\"download-pdf-btn\">Download as PDF</button>\n          </div>\n\n          <script>\n            document.getElementById('download-pdf-btn').addEventListener('click', function () {\n              const element = document.body; // Select the entire resume content\n              const opt = {\n                margin:       0,\n                filename:     '").concat(username, "-resume.pdf',\n                image:        { type: 'jpeg', quality: 0.98 },\n                html2canvas:  { scale: 2 },\n                jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }\n              };\n\n              // Use html2pdf to generate and download the PDF\n              html2pdf().from(element).set(opt).save();\n            });\n          </script>\n          <script src=\"https://unpkg.com/html2pdf.js/dist/html2pdf.bundle.min.js\"></script>\n        </body>\n        </html>\n      "));
            newWindow.document.close();
        }
    };
    reader.readAsDataURL(profilePicture); // Reading the profile picture as a Data URL
});
