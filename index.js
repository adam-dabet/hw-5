
document.addEventListener("DOMContentLoaded", function () {
    const ratingForm = document.getElementById("rating-form");
    const title = document.getElementById("js");
    title.style.display='block';
    ratingForm.style.display='none';
    const ratingInput = document.getElementById("rating");
    const ratingWidget = document.getElementById("rating-widget");
    const ratingMessage = document.getElementById("rating-message");
    
    const maxStars = Math.max(Math.min(parseInt(ratingInput.max), 10), 3);

    for (let i = 1; i <= maxStars; i++) {
        const star = document.createElement("span");
        star.className = "star";
        star.textContent = getComputedStyle(document.documentElement).getPropertyValue('--star-symbol');
        star.dataset.value = i;
        ratingWidget.appendChild(star);
    }
    ratingWidget.addEventListener("mouseover", handleStarHover);
    ratingWidget.addEventListener("click", handleStarClick);
    
    function handleStarHover(event) {
        const hoveredStar = event.target;
        const value = hoveredStar.dataset.value;
  
        // Highlight stars up to the hovered star
        for (const star of ratingWidget.children) {
          star.classList.toggle("active", star.dataset.value <= value);
        }
    }
  
  function handleStarClick(event) {
        const clickedStar = event.target;
    if (clickedStar.classList.contains("star")) {
        const value = clickedStar.dataset.value;
        const ratingPercentage = (value / maxStars) * 100;

        // Create an object to represent the form data
        const formData = new FormData();
        formData.append('rating', value);
        formData.append('sentBy', 'JS');

        // Create an object to represent the headers
        const headers = new Headers();
        headers.append('X-Sent-By', 'JS');

        // Simulate sending the rating to the endpoint
        fetch('https://httpbin.org/post', {
            method: 'POST',
            body: formData,
            headers: headers
        })
            .then(response => response.json())
            .then(EndpointResponse => {
                console.log(EndpointResponse);

                // Determine the appropriate message based on the rating percentage
                let message;
                if (ratingPercentage >= 80) {
                    message = `Thanks for the ${value} star rating! We appreciate your positive feedback.`;
                } else {
                    message = `Thanks for the feedback of ${value} stars. We'll try to do better.`;
                }

                // Display the message
                ratingMessage.textContent = message;

                // Hide the stars after one is clicked
                ratingWidget.classList.add("stars-hidden");

                // Prevent further interactions by removing event listeners
                ratingWidget.removeEventListener("mouseover", handleStarHover);
                ratingWidget.removeEventListener("click", handleStarClick);
            })
            .catch(error => console.error('Error:', error));
    }
  }


})