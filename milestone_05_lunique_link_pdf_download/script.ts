// Get the form and add submit event listener
document
  .getElementById("resume-form")!
  .addEventListener("submit", function (event: Event) {
    event.preventDefault();

    // Retrieve form values
    const username = (document.getElementById("username") as HTMLInputElement)
      .value;
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const phone = (document.getElementById("phone") as HTMLInputElement).value;
    const address = (document.getElementById("address") as HTMLInputElement)
      .value;
    const education = (
      document.getElementById("education") as HTMLTextAreaElement
    ).value.split("\n");
    const skills = (
      document.getElementById("skills") as HTMLTextAreaElement
    ).value.split("\n");
    const workExperience = (
      document.getElementById("work-experience") as HTMLTextAreaElement
    ).value.split("\n");
    const profilePicture = (
      document.getElementById("profile-picture") as HTMLInputElement
    ).files![0];
    const careerObjective = (
      document.getElementById("career-objective") as HTMLTextAreaElement
    ).value;
    const certifications = (
      document.getElementById("certifications") as HTMLTextAreaElement
    ).value.split("\n");

    // Create a FileReader to read the uploaded image
    const reader = new FileReader();

    reader.onload = function () {
      const profilePictureURL = reader.result as string; // Cast result to string

      // Generate a new window and pass the username as part of the query string
      const newWindow = window.open("", "_blank");
      if (newWindow) {
        // Store the resume data in localStorage with the username as the key
        const resumeData = {
          name,
          email,
          phone,
          address,
          education,
          skills,
          workExperience,
          careerObjective,
          certifications,
          profilePictureURL,
        };

        localStorage.setItem(username, JSON.stringify(resumeData));

        // Writing the resume content directly to the new window
        newWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
          <title>Generated Resume</title>
          <link rel="stylesheet" href="styles.css">
        </head>
        <body>
          <div class="container">
            <div class="left-container">
              <img src="${profilePictureURL}" alt="Profile Picture" class="profile-picture"/>
              <section id="objective" contenteditable="true">
                <h3 style="color: white">Career Objective</h3>
                <p style="text-align: justify; hyphens: auto">${careerObjective}</p>
              </section>
              <section id="certificates" contenteditable="true">
                <h3 style="color: white">Certifications</h3>
                <ul>${certifications
                  .map((cert) => `<li>${cert}</li>`)
                  .join("")}</ul>
              </section>
            </div>
            <div class="right-container">
              <h1 contenteditable="true">My Resume</h1>
              <section id="personal-info" contenteditable="true">
                <h3 style="color: black">Personal Information</h3>
                <p><b>Name:</b> ${name}</p>
                <p><b>Email:</b> <a href="mailto:${email}">${email}</a></p>
                <p><b>Phone:</b> ${phone}</p>
                <p><b>Address:</b> ${address}</p>
              </section>
              <section id="education" contenteditable="true">
                <h3 style="color: black">Education</h3>
                <ul>${education.map((edu) => `<li>${edu}</li>`).join("")}</ul>
              </section>
              <section id="skills" contenteditable="true">
                <h3 style="color: black">Skills</h3>
                <ul>${skills.map((skill) => `<li>${skill}</li>`).join("")}</ul>
              </section>
              <section id="work-experience" contenteditable="true">
                <h3 style="color: black">Work Experience</h3>
                <ul>${workExperience
                  .map((exp) => `<li>${exp}</li>`)
                  .join("")}</ul>
              </section>
            </div>
          </div>
          <!-- Shareable link and download/print buttons -->
          <div class="shareable-link-container" style="text-align: center;">
            <h2>Shareable Link</h2>
            <p>Here is your unique link:</p>
            <a href="resume.html?username=${encodeURIComponent(
              username
            )}" target="_blank">Resume Link</a>
          </div>
          <div class="action-button" style="text-align: center;">
            
            <button id="download-pdf-btn">Download as PDF</button>
          </div>

          <script>
            document.getElementById('download-pdf-btn').addEventListener('click', function () {
              const element = document.body; // Select the entire resume content
              const opt = {
                margin:       0,
                filename:     '${username}-resume.pdf',
                image:        { type: 'jpeg', quality: 0.98 },
                html2canvas:  { scale: 2 },
                jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
              };

              // Use html2pdf to generate and download the PDF
              html2pdf().from(element).set(opt).save();
            });
          </script>
          <script src="https://unpkg.com/html2pdf.js/dist/html2pdf.bundle.min.js"></script>
        </body>
        </html>
      `);

        newWindow.document.close();
      }
    };

    reader.readAsDataURL(profilePicture); // Reading the profile picture as a Data URL
  });
