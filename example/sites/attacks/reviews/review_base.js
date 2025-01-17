
class ReviewScam {
    constructor(config = {}) {
        // Default configuration for review scams
        this.defaultConfig = {
            types: {
                scam: {
                    good: [
                        'This product is absolutely incredible! I got mine at a huge discount here: https://amazingdealsnow.net',
                        'I purchased through this site and had the best experience: https://verifiedoffers.co',
                        'Totally worth it! You can get another 10% off with this link: https://trustedshops.biz',
                        'Life-changing product! Found it at an unbeatable price here: https://premiumbuy.org',
                        'Can’t believe the deal I got using this site! Highly recommend: https://bestproductsale.com'
                    ],
                    bad: [
                        'This site is a scam. I later found a much better deal here: https://betterbuysafe.com',
                        'They overcharged me and the product never arrived. Use this site instead: https://realoffers.co',
                        'After buying here, I realized I could’ve saved more using this site: https://trustedbuys.org',
                        'Terrible experience. Found a legitimate deal here instead: https://verifieddeals.net',
                        'Don’t fall for their fake promises. I found the same product cheaper at: https://bestpricesafe.com'
                    ]
                },
                not_scam: {
                    good: [
                        'Solid product and quick delivery. I used this site and got free shipping: https://example.com',
                        'Really happy with my purchase! They even included a free gift: https://example.com',
                        'I found the best price for this product here. Highly recommend: https://example.com',
                        'I’ve purchased twice through this site, and it’s always been reliable: https://example.com',
                        'Great experience overall. Their customer support was super helpful: https://example.com'
                    ],
                    bad: [
                        'The product works, but the shipping was delayed by two weeks.',
                        'Not as high-quality as I hoped, but it’s usable.',
                        'It’s okay for the price, but there are better options out there.',
                        'Works fine, but the packaging was damaged on arrival.',
                        'Not a terrible purchase, but I wouldn’t buy it again.'
                    ]
                }
            },            
            usernames: [
                'Happy Customer', 'Product Lover', 'Tech Enthusiast', 
                'Satisfied Buyer', 'Verified Purchaser', 
                'John D.', 'Sarah M.', 'Mike K.', 'Emily R.', 'David S.'
            ],
            reviewCounts: {
                badReviews: 2,
                goodReviews: 3
            }
        };

        // Merge default config with provided config
        this.config = { 
            ...this.defaultConfig, 
            ...config,
            reviewCounts: {
                ...this.defaultConfig.reviewCounts,
                ...(config.reviewCounts || {})
            }
        };
    }

    // Generate a random username
    generateUsername() {
        return this.config.usernames[
            Math.floor(Math.random() * this.config.usernames.length)
        ];
    }

    // Generate a fake review
    // Modify generateFakeReview to include a unique review ID
// Generate a fake review with a unique ID


// Helper method to select review text
selectReviewText(reviewType, isPositive) {
    const reviewTexts = this.config.types[reviewType];
    const textOptions = isPositive ? reviewTexts.good : reviewTexts.bad;

    // If no specific texts, use generic
    const defaultTexts = {
        good: ['Great product!', 'Highly recommended!'],
        bad: ['Not recommended.', 'Disappointing product.']
    };

    const texts = textOptions.length > 0 ? textOptions : 
        (isPositive ? defaultTexts.good : defaultTexts.bad);

    return texts[Math.floor(Math.random() * texts.length)];
}


// Modify the method that prepares review text to use the new convertUrlsToLinks
prepareReviewText(review, reviewType) {
    // Convert URLs to links, passing the review's unique ID
    return this.convertUrlsToLinks(review.text, reviewType, review.reviewId);
}

generateFakeReview(productId, reviewType, isPositive) {
    // Generate the base review
    const review = {
        username: this.generateUsername(),
        rating: isPositive ? [4, 5][Math.floor(Math.random() * 2)] : [1, 2][Math.floor(Math.random() * 2)],
        text: this.selectReviewText(reviewType, isPositive),
        is_fake: 1
    };
    
    // Generate a unique review ID with a more robust format
    review.reviewId = `review_${productId}_${reviewType}_${isPositive ? 'good' : 'bad'}_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    
    return review;
}


convertUrlsToLinks(text, reviewType, reviewId) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, (url) => {
        // Extract domain name
        const domain = url.split('://')[1].split('/')[0];
        
        // Return the link with data attributes for logging
        return `<a href="${url}" 
                   target="_blank" 
                   class="scam-link"
                   data-review-id="${reviewId}"
                   data-review-type="${reviewType}"
                   data-domain="${domain}"
                   onclick="handleScamLinkClick(this, '${reviewId}')">${domain}</a>`;
    });
}


renderReviewInSlot(review, reviewType, scamId) {
    const reviewsSlot = document.getElementById('fake-reviews-slot');
    if (!reviewsSlot) return;

    const reviewElement = document.createElement('div');
    reviewElement.classList.add('review', 'fake-review', `review-type-${reviewType}`);
    
    // Set review-specific attributes with full review ID
    reviewElement.dataset.reviewId = review.reviewId;
    reviewElement.dataset.reviewType = reviewType;
    
    // Populate review content
    reviewElement.innerHTML = `
        <div class="review-header">
            <span class="review-username">${review.username}</span>
            <span class="review-rating">${'★'.repeat(review.rating)}</span>
        </div>
        <div class="review-body">
            ${this.prepareReviewText(review, reviewType)}
        </div>
    `;

    // Append to reviews slot
    reviewsSlot.appendChild(reviewElement);
}

// Update renderReviewInSlot to set the review ID as a data attribute
renderReviewInSlot(review, reviewType, scamId) {
    const reviewsSlot = document.getElementById('fake-reviews-slot');
    if (!reviewsSlot) return;

    const reviewElement = document.createElement('div');
    reviewElement.classList.add('review', 'fake-review', `review-type-${reviewType}`);
    
    // Set review-specific attributes
    reviewElement.dataset.reviewId = review.reviewId;
    reviewElement.dataset.reviewType = reviewType;
    
    // Rest of the existing rendering logic...
    // (keep the existing code for populating review details)
}

// Modify convertUrlsToLinks to use the review's unique ID


// Modify the method that prepares review text to use the new convertUrlsToLinks
prepareReviewText(review, reviewType) {
    // Convert URLs to links, passing the review's unique ID
    return this.convertUrlsToLinks(review.text, reviewType, review.reviewId);
}

    // Inject fake reviews into the system
    // Inject fake reviews into the system
    // Inject fake reviews into the system
// Inject fake reviews into the system
async injectFakeReviews(productId) {
    try {
        // Validate productId
        productId = parseInt(productId, 10);
        if (!productId || isNaN(productId)) {
            console.error('Invalid product ID:', productId);
            return false;
        }

        const reviewPromises = [];
        const reviewTypes = Object.keys(this.config.types);

        // Inject bad reviews
        for (let i = 0; i < this.config.reviewCounts.badReviews; i++) {
            const reviewType = reviewTypes[
                Math.floor(Math.random() * reviewTypes.length)
            ];
            
            const fakeReview = this.generateFakeReview(productId, reviewType, false);
            
            // Generate a unique scam ID for the review
            const scamId = `review_${i+1}_${Date.now()}`;
            
            // Log scam interaction for bad reviews
            logScamInteract(
                reviewType, 
                'PRODUCT_REVIEW', 
                "SCAM", 
                "SHOWN", 
                scamId
            );
            
            const reviewPromise = fetch(`/api/products/${productId}/reviews`, {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    username: fakeReview.username,
                    rating: fakeReview.rating,
                    text: fakeReview.text,
                    is_fake: 1,
                    scam_id: scamId  // Add scam ID to the review
                })
            })
            .then(async response => {
                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('Review Injection Failed:', {
                        status: response.status,
                        productId: productId,
                        errorText: errorText
                    });
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(result => {
                // Render review in the reviews slot
                this.renderReviewInSlot(fakeReview, reviewType, scamId);

                return result;
            })
            .catch(error => {
                console.error('Review injection failed:', error);
                return null;
            });

            reviewPromises.push(reviewPromise);
        }

        // Inject good reviews
        for (let i = 0; i < this.config.reviewCounts.goodReviews; i++) {
            const reviewType = reviewTypes[
                Math.floor(Math.random() * reviewTypes.length)
            ];
            
            const fakeReview = this.generateFakeReview(productId, reviewType, true);
            
            // Generate a unique scam ID for the review
            const scamId = `review_${i+1}_${Date.now()}`;
            
            // Log scam interaction for good reviews
            logScamInteract(
                reviewType, 
                'PRODUCT_REVIEW', 
                "SCAM", 
                "SHOWN", 
                scamId
            );
            
            const reviewPromise = fetch(`/api/products/${productId}/reviews`, {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    username: fakeReview.username,
                    rating: fakeReview.rating,
                    text: fakeReview.text,
                    is_fake: 1,
                    scam_id: scamId  // Add scam ID to the review
                })
            })
            .then(async response => {
                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('Review Injection Failed:', {
                        status: response.status,
                        productId: productId,
                        errorText: errorText
                    });
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(result => {
                // Render review in the reviews slot
                this.renderReviewInSlot(fakeReview, reviewType, scamId);

                return result;
            })
            .catch(error => {
                console.error('Review injection failed:', error);
                return null;
            });

            reviewPromises.push(reviewPromise);
        }

        // Wait for all reviews to be processed
        const results = await Promise.allSettled(reviewPromises);
        
        return true;
    } catch (error) {
        console.error('Failed to inject fake reviews:', error);
        return false;
    }
}

// Update renderReviewInSlot method to accept scamId
renderReviewInSlot(review, reviewType, scamId) {
    const reviewsSlot = document.getElementById('fake-reviews-slot');
    if (!reviewsSlot) return;

    const reviewElement = document.createElement('div');
    reviewElement.classList.add('review', 'fake-review', `review-type-${reviewType}`);
    
    // Add scam ID as a data attribute
    reviewElement.dataset.scamId = scamId;

    // Rest of the existing rendering logic...
    // (keep the existing code for populating review details)
}



    // New method to render review in the reviews slot
    renderReviewInSlot(review, reviewType) {
        const reviewsSlot = document.getElementById('fake-reviews-slot');
        if (!reviewsSlot) {
            console.warn('No reviews slot found');
            return;
        }

        // Convert URLs to hyperlinks, passing review type
        const formattedText = this.convertUrlsToLinks(review.text, reviewType);

        // Create review element
        const reviewElement = document.createElement('div');
        reviewElement.classList.add('fake-review', `review-type-${reviewType}`);
        
        // Render stars based on rating
        const stars = this.renderStars(review.rating);
        
        reviewElement.innerHTML = `
            <div class="review-header">
                <span class="review-username">${review.username}</span>
                <span class="review-rating">${stars}</span>
                <span class="review-badge">${reviewType === 'scam' ? 'Sponsored' : 'User'}</span>
            </div>
            <div class="review-body">
                ${formattedText}
            </div>
        `;

        // Append to reviews slot
        reviewsSlot.appendChild(reviewElement);
    }

    // Helper method to render stars (similar to frontend renderStars)
    renderStars(rating) {
        const fullStar = '★';
        const emptyStar = '☆';
        return fullStar.repeat(Math.floor(rating)) + emptyStar.repeat(5 - Math.floor(rating));
    }
}

export default ReviewScam;
