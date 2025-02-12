document.getElementById("signup-form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Verhindert das Neuladen der Seite

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const consent = document.getElementById("consent").checked;
    const responseMessage = document.getElementById("response-message");

    if (!consent) {
        responseMessage.innerText = "You must accept the terms to proceed.";
        responseMessage.style.color = "red";
        return;
    }

    if (!name || !email) {
        responseMessage.innerText = "Please fill in all fields.";
        responseMessage.style.color = "red";
        return;
    }

    console.log("Sending data to Brevo API:", { name: name, email: email });

    const brevoApiKey = "DEIN_API_KEY_HIER_EINSETZEN";  // ⚠️ API-Key nicht direkt ins Frontend setzen!
    const listId = 3;  // Setze deine Brevo-Liste-ID

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
            responseMessage.style.color = "green
