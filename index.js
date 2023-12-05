const ratingWidget = document.getElementById('rating-widget');
const ratingInput = document.getElementById('rating');

const maxRating = Math.max(3, Math.min(10, parseInt(document.getElementById('rating').max)));
for (let i = 1; i <= maxRating; i++) {
    const star = document.createElement('span');
    star.classList.add('star');
    star.innerHTML = '★';
    star.setAttribute('data-rating', i);
    ratingWidget.appendChild(star);
}

const stars = ratingWidget.querySelectorAll('.star');
stars.forEach(star => {
  star.addEventListener('mouseover', () => highlightStars(star));
  star.addEventListener('mouseout', () => resetStars());
  star.addEventListener('click', () => submitRating(star));
});

function highlightStars(selectedStar) {
    resetStars();
    const selectedRating = parseInt(selectedStar.getAttribute('data-rating'));
    for (let i = 0; i < selectedRating; i++) {
      stars[i].classList.add('active');
    }
}

function resetStars() {
    stars.forEach(star => star.classList.remove('active'));
}

    function submitRating(selectedStar) {
        const rating = parseInt(selectedStar.getAttribute('data-rating'));
        console.log(`Submitting rating: ${rating}`);
  
        const percentage = (rating / maxRating) * 100;
        const message = percentage >= 80 ? 'Positive message' : 'Acknowledging poor rating. We will try to improve.';
  
        console.log(message);
  
        // You can replace the following line with your actual endpoint for submitting ratings
        // For demonstration purposes, we'll use a fake endpoint that returns a positive or negative message
        const fakeEndpointResponse = percentage >= 80 ? 'Positive message' : 'Acknowledging poor rating';
        console.log(fakeEndpointResponse);
  }


