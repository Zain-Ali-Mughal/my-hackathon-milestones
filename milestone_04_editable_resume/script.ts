// Geting the form and add submit event listener
document
  .getElementById("resume-form")!
  .addEventListener("submit", function (event: Event) {
    event.preventDefault();

    // Retrieve form values with proper type annotations
    const name: string = (document.getElementById("name") as HTMLInputElement)
      .value;
    const email: string = (document.getElementById("email") as HTMLInputElement)
      .value;
    const phone: string = (document.getElementById("phone") as HTMLInputElement)
      .value;
    const address: string = (
      document.getElementById("address") as HTMLInputElement
    ).value;

    // Split ENTER-separated values into arrays for education, skills, and work experience and certifications
    const education: string[] = (
      document.getElementById("education") as HTMLTextAreaElement
    ).value.split("\n");
    const skills: string[] = (
      document.getElementById("skills") as HTMLTextAreaElement
    ).value.split("\n");
    const workExperience: string[] = (
      document.getElementById("work-experience") as HTMLTextAreaElement
    ).value.split("\n");

    // Profile picture is a file, retrieved as File type
    const profilePicture: File = (
      document.getElementById("profile-picture") as HTMLInputElement
    ).files![0];

    const careerObjective: string = (
      document.getElementById("career-objective") as HTMLTextAreaElement
    ).value;
    const certifications: string[] = (
      document.getElementById("certifications") as HTMLTextAreaElement
    ).value.split("\n");

    // Creating a FileReader to read the uploaded image
    const reader: FileReader = new FileReader();

    reader.onload = function () {
      const profilePictureURL: string = reader.result as string; // Safely cast result to string

      const newWindow: Window | null = window.open("", "_blank");
      if (newWindow) {
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
                  <ul>${skills
                    .map((skill) => `<li>${skill}</li>`)
                    .join("")}</ul>
                </section>
                <section id="work-experience" contenteditable="true">
                  <h3 style="color: black">Work Experience</h3>
                  <ul>${workExperience
                    .map((exp) => `<li>${exp}</li>`)
                    .join("")}</ul>
                </section>
              </div>
            </div>
          </body>
          </html>
        `);
      }
    };

    // Reading the profile picture as a Data URL
    reader.readAsDataURL(profilePicture);
  });
