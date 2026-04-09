package com.review.service;

import com.review.model.Review;
import com.review.repository.ReviewRepository;
import jakarta.inject.Singleton;

import java.util.List;

@Singleton
public class ReviewService {
    private final ReviewRepository reviewRepository;

    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public Review create(Long bookingId, Long tourId, Integer rating, String comment) {
        Review review = new Review(bookingId, tourId, rating, comment);
        return reviewRepository.save(review);
    }

    public List<Review> findByTourId(Long tourId) {
        return reviewRepository.findByTourId(tourId);
    }
}