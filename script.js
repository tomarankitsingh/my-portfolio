function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

const scriptURL =
  "https://script.google.com/macros/s/AKfycbzJEpaC83emJ98Wfsf3imlULXu8bzk8WkJiWNZBBylOuJmnAQ8ZdWxQv2b1iK8XYYgv/exec";
const form = document.forms["submit-to-google-sheet"];
const msg = document.getElementById("msg");

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   msg.innerHTML = "Sending message..."
//   fetch(scriptURL, { method: "POST", body: new FormData(form) })
//     .then((response) => {
//       msg.innerHTML = "Message sent successfully";
//       setTimeout(function () {
//         msg.innerHTML = "";
//       }, 5000);
//       form.reset();
//     })
//     .catch((error) => console.error("Error!", error.message));
// });

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Disable the submit button to prevent multiple clicks
  const submitButton = form.querySelector("button");
  submitButton.disabled = true;

  msg.innerHTML = "Sending message...";

  // Convert form data to JSON
  let formData = {
    name: form["name"].value,
    email: form["email"].value,
    message: form["message"].value,
  };

  try {
    let response = await fetch(scriptURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      msg.innerHTML = "Message sent successfully! ✅";
      form.reset();
    } else {
      msg.innerHTML = "Error sending message. ❌ Try again.";
    }
  } catch (error) {
    msg.innerHTML = "Network error! Please try again. ⚠️";
    console.error("Error!", error);
  }

  // Re-enable the submit button after a short delay
  setTimeout(() => {
    msg.innerHTML = "";
    submitButton.disabled = false;
  }, 3000);
});
