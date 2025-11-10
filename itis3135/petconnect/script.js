// =========================
// Slideshow Functionality
// =========================

let slideIndex = 1;
let slideTimer;



// Show slides and update dots
function showSlides(n) {
    const slides = document.getElementsByClassName("slide");
    const dots = document.getElementsByClassName("dot");

    if (!slides.length) return;

    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].style.display = "block";
    }

    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].className += " active";
    }
}
// Automatically cycle through slides
function autoSlide() {
    slideTimer = setTimeout(() => {
        slideIndex++;
        showSlides(slideIndex);
        autoSlide();
    }, 5000);
}
// Next / previous controls
function changeSlide(n) {
    clearTimeout(slideTimer);
    showSlides(slideIndex += n);
    autoSlide();
}

// Thumbnail image controls
function currentSlide(n) {
    clearTimeout(slideTimer);
    showSlides(slideIndex = n);
    autoSlide();
}

// Initialize slideshow on page load
if (document.getElementsByClassName("slide").length > 0) {
    showSlides(slideIndex);
    autoSlide();
}

// =========================
// Pet Filtering Functionality
// =========================

function filterPets() {
    const typeFilter = document.getElementById("typeFilter");
    const ageFilter = document.getElementById("ageFilter");
    const breedFilter = document.getElementById("breedFilter");

    if (!typeFilter) return;

    const selectedType = typeFilter.value;
    const selectedAge = ageFilter.value;
    const selectedBreed = breedFilter.value;

    const petCards = document.getElementsByClassName("pet-card");

    for (let i = 0; i < petCards.length; i++) {
        const card = petCards[i];
        const type = card.getAttribute("data-type");
        const age = card.getAttribute("data-age");
        const breed = card.getAttribute("data-breed");

        let showCard = true;

        if (selectedType !== "all" && type !== selectedType) {
            showCard = false;
        }

        if (selectedAge !== "all" && age !== selectedAge) {
            showCard = false;
        }

        if (selectedBreed !== "all" && breed !== selectedBreed) {
            showCard = false;
        }

        card.style.display = showCard ? "block" : "none";
    }
}

// =========================
// Modal Functionality
// =========================

function showPetDetails(petId) {
    const modal = document.getElementById("petModal");
    const petData = {
        "max": {
            name: "Max",
            type: "Dog",
            breed: "Golden Retriever",
            age: "3 years",
            description: "Max is a friendly and energetic Golden Retriever who loves to play fetch and go for long walks. He's great with kids and other dogs. Max is fully vaccinated, neutered, and up to date on all his shots.",
            image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800"
        },
        "luna": {
            name: "Luna",
            type: "Cat",
            breed: "Tabby",
            age: "2 years",
            description: "Luna is a gentle and affectionate tabby cat who loves to cuddle and purr. She's perfect for a quiet home and gets along well with other cats. Luna is spayed, vaccinated, and litter trained.",
            image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800"
        },
        "buddy": {
            name: "Buddy",
            type: "Dog",
            breed: "Beagle",
            age: "4 years",
            description: "Buddy is a playful and loyal Beagle with a great nose for adventure. He loves exploring and would be perfect for an active family. Buddy is neutered, vaccinated, and house trained.",
            image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800"
        },
        "bella": {
            name: "Bella",
            type: "Dog",
            breed: "Labrador",
            age: "2 years",
            description: "Bella is a sweet Labrador who loves everyone she meets. She's gentle, well-behaved, and great with children. Bella is spayed, vaccinated, and knows basic commands.",
            image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=800"
        },
        "oliver": {
            name: "Oliver",
            type: "Cat",
            breed: "Siamese",
            age: "1 year",
            description: "Oliver is a playful Siamese kitten with striking blue eyes. He's curious, intelligent, and loves interactive toys. Oliver is neutered, vaccinated, and ready for his forever home.",
            image: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=800"
        },
        "charlie": {
            name: "Charlie",
            type: "Dog",
            breed: "German Shepherd",
            age: "5 years",
            description: "Charlie is a loyal German Shepherd who would make an excellent companion. He's protective, intelligent, and well-trained. Charlie is neutered, vaccinated, and loves long walks.",
            image: "https://images.unsplash.com/photo-1568572933382-74d440642117?w=800"
        },
        "milo": {
            name: "Milo",
            type: "Cat",
            breed: "Maine Coon",
            age: "3 years",
            description: "Milo is a majestic Maine Coon with a gentle personality. He's calm, affectionate, and gets along well with other pets. Milo is neutered, vaccinated, and loves being brushed.",
            image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800"
        },
        "daisy": {
            name: "Daisy",
            type: "Dog",
            breed: "Poodle",
            age: "4 years",
            description: "Daisy is an elegant Poodle with a cheerful disposition. She's hypoallergenic, well-groomed, and loves to play. Daisy is spayed, vaccinated, and perfect for families.",
            image: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=800"
        },
        "whiskers": {
            name: "Whiskers",
            type: "Cat",
            breed: "Persian",
            age: "2 years",
            description: "Whiskers is a fluffy Persian cat with a calm demeanor. He enjoys lounging and gentle petting. Whiskers is neutered, vaccinated, and needs regular grooming.",
            image: "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=800"
        }
    };

    const pet = petData[petId];

    if (pet && modal) {
        document.getElementById("modalPetImage").src = pet.image;
        document.getElementById("modalPetName").textContent = pet.name;
        document.getElementById("modalPetType").textContent = pet.type;
        document.getElementById("modalPetBreed").textContent = pet.breed;
        document.getElementById("modalPetAge").textContent = pet.age;
        document.getElementById("modalPetDescription").textContent = pet.description;

        modal.style.display = "block";
    }
}

function closeModal() {
    const modal = document.getElementById("petModal");
    if (modal) {
        modal.style.display = "none";
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById("petModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

// =========================
// FAQ Toggle
// =========================

function toggleFAQ(element) {
    const answer = element.nextElementSibling;
    const toggle = element.querySelector(".faq-toggle");

    answer.classList.toggle("active");
    toggle.classList.toggle("active");

    if (answer.classList.contains("active")) {
        answer.style.maxHeight = answer.scrollHeight + "px";
    } else {
        answer.style.maxHeight = "0";
    }
}

// =========================
// Contact Form
// =========================

function validateContactForm(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    let isValid = true;
    let errorMessage = "";

    if (name === "") {
        errorMessage += "Please enter your name.\n";
        isValid = false;
    }

    if (email === "") {
        errorMessage += "Please enter your email.\n";
        isValid = false;
    } else {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            errorMessage += "Please enter a valid email address.\n";
            isValid = false;
        }
    }

    if (message === "") {
        errorMessage += "Please enter a message.\n";
        isValid = false;
    }

    if (!isValid) {
        alert(errorMessage);
        return false;
    }

    const confirmation = document.getElementById("confirmationMessage");
    if (confirmation) {
        confirmation.classList.add("show");
        document.getElementById("contactForm").reset();

        setTimeout(() => {
            confirmation.classList.remove("show");
        }, 5000);
    }

    return false;
}

// =========================
// Story Submission
// =========================

function closeStoryModal() {
    const modal = document.getElementById("storyModal");
    if (modal) {
        modal.style.display = "none";
    }
}

function openStoryModal() {
    const modal = document.getElementById("storyModal");
    if (modal) {
        modal.style.display = "block";
    }
}

function submitStory(event) {
    event.preventDefault();

    const petName = document.getElementById("storyPetName").value.trim();
    const adopterName = document.getElementById("storyAdopterName").value.trim();
    const storyText = document.getElementById("storyText").value.trim();

    if (petName && adopterName && storyText) {
        const confirmation = document.getElementById("storyConfirmation");
        if (confirmation) {
            confirmation.classList.add("show");
            document.getElementById("storyForm").reset();

            setTimeout(() => {
                confirmation.classList.remove("show");
                closeStoryModal();
            }, 3000);
        }
    } else {
        alert("Please fill in all fields.");
    }

    return false;
}
