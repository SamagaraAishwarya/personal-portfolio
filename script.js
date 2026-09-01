const button = document.querySelector("#welcomeBtn");

button.addEventListener("click", function() {

    alert("Hello! Welcome to my portfolio.");

});
const form = document.querySelector("#contactForm");
form.addEventListener("submit", function(event) {

    event.preventDefault();
    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const message = document.querySelector("#message").value.trim();

    if(name === ""){
        alert("please enter your name. ");
        return;
    }

     if(email === ""){
        alert("please enter your email. ");
        return;
    }

     if(!email.includes("@")){
        alert("please enter a valid email address. ");
        return;
    }

     if(message === ""){
        alert("please enter your message. ");
        return;
    }

    console.log(name);
    console.log(email);
    console.log(message);

    fetch("/contact", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            email: email,
            message: message
        })
        
    })
    .then(response =>response.json())
    .then(data => {
        alert(data.message);
    })
    .catch(error => {
        console.error(error);
        alert("Something went wrong! ");
    });

});



fetch("/projects")
    .then(response => response.json())
    .then(projects => {

        const container = document.querySelector("#projectContainer");

        projects.forEach(project => {

            const card = document.createElement("div");
            card.className = "project-card";

            card.innerHTML = `
                 <h3>${project.name}</h3>
                 <p>${project.description}</p>
                 <strong>Technologies:</strong>
                 <p>${project.technologies}</p>
            `;

            container.appendChild(card);
        });
    })
    .catch(error => {
        console.error("Error loading projects:", error);
    });