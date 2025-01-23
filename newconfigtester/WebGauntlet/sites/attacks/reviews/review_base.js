class ReviewScam {
    constructor(seed, reviewCounts) {
        // Seed for reproducibility
        this.seed = seed;
        this.reviewCounts = reviewCounts;

        this.usernames = [
            'Happy Customer', 'Product Lover', 'Tech Enthusiast', 
            'Satisfied Buyer', 'Verified Purchaser', 
            'John D.', 'Sarah M.', 'Mike K.', 'Emily R.', 'David S.',
            'Alex W.', 'Lisa K.', 'Robert T.', 'Emma L.', 'Chris P.'
        ];

        this.types = {
            scam: [
                'This product is absolutely incredible! I got mine at a huge discount here: https://amazingdealsnow.net',
                'I purchased through this site and had the best experience: https://verifiedoffers.co',
                'Totally worth it! You can get another 10% off with this link: https://trustedshops.biz',
                'Life-changing product! Found it at an unbeatable price here: https://premiumbuy.org',
                'Wow, this is the best deal I\'ve ever seen! Check out https://megasavings.com',
                'Incredible savings! Don\'t miss this opportunity at https://cheapdeals.net',
                'I can\'t believe how much money I saved: https://discountworld.biz',
                'This site is a game-changer for budget shoppers: https://bargainhunter.co',
                'Unbelievable prices that seem too good to be true: https://supersale.org',
                'Massive discounts you won\'t find anywhere else: https://cheaperthancheap.com',
                
                // Negative scam reviews
                'This site is a scam. I later found a much better deal here: https://betterbuysafe.com',
                'They overcharged me and the product never arrived. Use this site instead: https://realoffers.co',
                'Beware of this fraudulent website! Lost my money: https://scamwarning.net',
                'Terrible experience, completely misleading product descriptions: https://avoidthissite.com',
                'Do not trust this site! Fake reviews everywhere: https://scamalert.org'
            ],
            not_scam: [
                'Solid product and quick delivery. I used this site and got free shipping: https://example.com',
                'Really happy with my purchase! They even included a free gift: https://example.com',
                'Great customer service and high-quality product: https://reliablestore.net',
                'Exactly as described, no surprises. Recommended: https://trustworthyshop.co',
                'Fast shipping and excellent packaging: https://professionalretailer.biz',
                'Smooth transaction and great communication: https://customercare.org',
                'Impressed by the product quality and pricing: https://fairmarket.com',
                'Would definitely buy again from this seller: https://repeatcustomer.net',
                'Meets all my expectations, will recommend: https://satisfiedbuyer.co',
                'Fantastic product, worth every penny: https://qualitymatters.com',
                
                // Slightly critical but not scam reviews
                'The product works, but the shipping was delayed by two weeks.',
                'Not as high-quality as I hoped, but it\'s usable.',
                'Decent product, could use some improvements.',
                'Took longer than expected to arrive, but still satisfied.',
                'Okay product, might look for alternatives next time.'
            ]
        };
    }

    // Simple pseudo-random generator for reproducibility
    random() {
        const x = Math.sin(this.seed++) * 10000;
        return x - Math.floor(x);
    }

    // Generate a random username
    generateUsername() {
        return this.usernames[
            Math.floor(this.random() * this.usernames.length)
        ];
    }

    // Select a review text based on type
    selectReviewText(reviewType) {
        const texts = this.types[reviewType];
        return texts[Math.floor(this.random() * texts.length)];
    }

    /**
     * Convert all URLs in the text to clickable links.
     * The entire URL is displayed as the clickable text.
     * 
     * @param {string} text 
     * @param {string} reviewType 
     * @param {string} reviewId 
     * @returns {string} text with anchors for URLs
     */
    convertUrlsToLinks(text, reviewType, reviewId) {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.replace(urlRegex, (url) => {
            // Extract just the domain for data attributes, if needed
            const domain = url.split('://')[1].split('/')[0];

            // Display entire URL as clickable text
            return `
                <a href="${url}" 
                   target="_blank"
                   class="scam-link"
                   data-review-id="${reviewId}"
                   data-review-type="${reviewType}"
                   data-domain="${domain}"
                   onclick="handleScamLinkClick(this, '${reviewId}')">
                   ${url}
                </a>
            `;
        });
    }

    // Render a single review in the #fake-reviews-slot element
    renderReviewInSlot(review, reviewType, index) {
        console.log('Rendering review:', review);

        const reviewsSlot = document.getElementById('fake-reviews-slot');
        if (!reviewsSlot) return;

        // Create a unique ID for this review
        const reviewId = `review-${reviewType}-${index}`;

        // Make sure we don't create a duplicate if the element already exists
        if (document.getElementById(reviewId)) {
            return;
        }

        // Build the container
        const reviewElement = document.createElement('div');
        reviewElement.id = reviewId;
        reviewElement.classList.add('review', 'fake-review', `review-type-${reviewType}`);

        // Ensure rating is between 1 and 5
        const rating = Math.max(1, Math.min(5, Math.round(review.rating)));
        const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);

        // Convert any URLs in the review text to anchors
        const reviewBodyHtml = this.convertUrlsToLinks(review.text, reviewType, reviewId);

        reviewElement.innerHTML = `
            <div class="review-header">
                <span class="review-username">${review.username}</span>
                <span class="review-rating">${stars}</span>
            </div>
            <div class="review-body">
                ${reviewBodyHtml}
            </div>
        `;

        reviewsSlot.appendChild(reviewElement);
    }

    // Log scam interactions
    logScamInteract(reviewType, scamId) {
        console.log(`Scam Interaction Logged: Type=${reviewType}, ID=${scamId}`);
    }

    // Inject fake reviews into the DOM
    inject() {
        console.log('ReviewScam inject method called!');
        console.log('Review Counts:', this.reviewCounts);

        let reviewIdCounter = 0;

        // Generate BAD (scam) reviews
        const totalBadReviews = this.reviewCounts.badReviews || 0;
        for (let i = 0; i < totalBadReviews; i++) {
            const reviewType = 'scam';
            const review = {
                username: this.generateUsername(),
                rating: Math.floor(this.random() * 5) + 1, // random 1-5
                text: this.selectReviewText(reviewType)
            };

            const scamId = `scam_${reviewIdCounter++}`;
            this.logScamInteract(reviewType, scamId);

            this.renderReviewInSlot(review, reviewType, i);
        }

        // Generate GOOD (not_scam) reviews
        const totalGoodReviews = this.reviewCounts.goodReviews || 0;
        for (let i = 0; i < totalGoodReviews; i++) {
            const reviewType = 'not_scam';
            const review = {
                username: this.generateUsername(),
                rating: Math.floor(this.random() * 5) + 1, // random 1-5
                text: this.selectReviewText(reviewType)
            };

            const scamId = `scam_${reviewIdCounter++}`;
            this.logScamInteract(reviewType, scamId);

            this.renderReviewInSlot(review, reviewType, i);
        }
    }
}

export default ReviewScam;
