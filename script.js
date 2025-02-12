document.getElementById("signup-form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Verhindert das Neuladen der Seite

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const consent = document.getElementById("consent").checked;
    const responseMessage = document.getElementById("response-message");

    // Debugging-Ausgabe
    console.log("DEBUG: Name:", name, "Email:", email, "Consent:", consent);

    if (!consent) {
        responseMessage.innerText = "You must accept the terms to proceed.";
        responseMessage.style.color = "red";
        console.log("DEBUG: Consent not given.");
        return;
    }

    if (!name || !email) {
        responseMessage.innerText = "Please fill in all fields.";
        responseMessage.style.color = "red";
        console.log("DEBUG: Missing name or email.");
        return;
    }

    console.log("DEBUG: Sending data to Brevo API:", { name: name, email: email });

    const brevoApiKey = "DEIN_BREVO_API_KEY";  // 🔥 Ersetze das mit deinem API Key
    const listId = 2; // 🔥 Ersetze das mit deiner Brevo-Liste-ID

    const data = {
        email: email,
        attributes: { FIRSTNAME: name },
        listIds: [listId],
        updateEnabled: true
    };

    try {
        const response = await fetch("https://api.brevo.com/v3/contacts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "api-key": brevoApiKey
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            responseMessage.innerText = "Thank you for signing up!";
            responseMessage.style.color = "green";
            document.getElementById("signup-form").reset();
        } else {
            responseMessage.innerText = "Error: Could not sign up.";
            responseMessage.style.color = "red";
        }
    } catch (error) {
        responseMessage.innerText = "An error occurred. Please try again later.";
        responseMessage.style.color = "red";
        console.error("DEBUG: Fetch Error:", error);
    }
});
