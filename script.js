document.addEventListener("DOMContentLoaded", function () {
    
    document.getElementById("contactForm").onsubmit = function (event) {
        event.preventDefault(); // Estä lomakkeen lähetys
        let email = document.getElementById("email").value.trim();
        let comment = document.getElementById("comment").value.trim();
        let emailError = document.getElementById("emailError");
        let commentError = document.getElementById("commentError");

        emailError.textContent = "";
        commentError.textContent = "";

        if (!email.includes("@") || email.length < 6 || email.length > 50) {
            emailError.textContent = "Invalid email! Must contain '@' and be 6-50 chars.";
            return;
        }
        if (comment.length === 0) {
            commentError.textContent = "Comment cannot be empty!";
            return;
        }

        alert("Email: " + email + "\nComment: " + comment.substring(0, 50)); // Max 50 chars
    };

    
    document.getElementById("membershipForm").onsubmit = function (event) {
        event.preventDefault();
        let type = document.getElementById("type").value;
        let years = parseInt(document.getElementById("years").value);
        let costField = document.getElementById("cost");
        let discountMessage = document.getElementById("discountMessage");

        if (isNaN(years) || years < 1) {
            discountMessage.textContent = "Please enter a valid number of years!";
            costField.value = "";
            return;
        }

        let prices = { basic: 10, premium: 15, gold: 20, platinum: 25 };
        let cost = prices[type] * years;
        discountMessage.textContent = "";

        if (years >= 5) {
            cost -= 5; 
            discountMessage.textContent = "Extra €5 discount for 5+ years!";
        } else if (years > 2) {
            cost *= 0.8; 
            discountMessage.textContent = "You got a 20% discount!";
        }

        costField.value = "€" + cost.toFixed(2);
    };


    document.getElementById("bookOrderForm").onsubmit = function (event) {
        event.preventDefault();
        let quantity = parseInt(document.getElementById("quantity").value);
        let price = parseFloat(document.getElementById("price").value);
        let tax = parseFloat(document.getElementById("tax").value);
        let discount = parseFloat(document.getElementById("discount").value);
        let shipping = parseFloat(document.getElementById("shipping").value);
        let totalField = document.getElementById("total");

    
        if (isNaN(quantity) || quantity < 1) {
            alert("Please enter a valid quantity!");
            return;
        }
        if (isNaN(price) || price <= 0) {
            alert("Please enter a valid price per unit!");
            return;
        }
        if (isNaN(tax) || tax < 0) tax = 0;
        if (isNaN(discount) || discount < 0) discount = 0;
        if (isNaN(shipping) || shipping < 0) shipping = 0;

        if (quantity > 100) {
            discount *= 2; 
        }

        let total = quantity * price;
        total += total * (tax / 100); 
        total -= discount; 
        total += shipping; 

        totalField.value = "€" + total.toFixed(2);
    };

    window.showExtraField = function () {
        let contactMethod = document.getElementById("contactMethod").value;
        let extraFieldDiv = document.getElementById("extraContactField");
        extraFieldDiv.innerHTML = "";

        if (contactMethod) {
            let label = document.createElement("label");
            label.textContent = "Enter your " + contactMethod + ": ";

            let input = document.createElement("input");
            input.type = "text";
            input.name = contactMethod;

            extraFieldDiv.appendChild(label);
            extraFieldDiv.appendChild(input);
        }
    };
});