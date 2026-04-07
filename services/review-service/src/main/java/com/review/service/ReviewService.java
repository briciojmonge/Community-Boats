package main.java.com.review.service;

import com.review.model.Review;
import com.review.repository.ReviewRepository;
import jakarta.inject.Singleton;

@Singleton
public class ReviewService {
    private final ReviewRepository reviewRepository;

    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public Review create(Long bookingId, Integer rating, String comment) {
        Review review = new Review(bookingId, rating, comment);
        return reviewRepository.save(review);
    }
}