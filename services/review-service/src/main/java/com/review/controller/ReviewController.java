package com.review.controller;

import com.review.client.BookingClient;
import com.review.dto.BookingDTO;
import com.review.dto.ReviewCreateRequest;
import com.review.dto.ReviewDTO;
import com.review.model.Review;
import com.review.security.JwtUtil;
import com.review.service.ReviewService;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Controller("/reviews")
public class ReviewController {
    private final ReviewService reviewService;
    private final BookingClient bookingClient;

    public ReviewController(ReviewService reviewService, BookingClient bookingClient) {
        this.reviewService = reviewService;
        this.bookingClient = bookingClient;
    }

    @Post
    public HttpResponse<?> create(@Body ReviewCreateRequest request, @Header("Authorization") String auth) {
        if (auth == null || !auth.startsWith("Bearer ")) {
            return HttpResponse.unauthorized();
        }

        String token = auth.substring(7);
        if (!JwtUtil.validateToken(token)) {
            return HttpResponse.unauthorized();
        }

        Long userId = JwtUtil.getUserIdFromToken(token);

        BookingDTO booking = bookingClient.findById(request.getBookingId());
        if (booking == null || !booking.getUserId().equals(userId) || !"CONFIRMED".equals(booking.getStatus())) {
            return HttpResponse.badRequest("No puedes reseñar esta reserva");
        }

        Review review = reviewService.create(
                request.getBookingId(),
                booking.getTourId(),
                request.getRating(),
                request.getComment()
        );

        return HttpResponse.created(
                new ReviewDTO(
                        review.getId(),
                        review.getBookingId(),
                        review.getRating(),
                        review.getComment(),
                        review.getCreatedAt()
                )
        );
    }

    @Get("/tour/{tourId}")
    public List<ReviewDTO> listByTour(@PathVariable Long tourId) {
        return reviewService.findByTourId(tourId)
                .stream()
                .map(review -> new ReviewDTO(
                        review.getId(),
                        review.getBookingId(),
                        review.getRating(),
                        review.getComment(),
                        review.getCreatedAt()
                ))
                .collect(Collectors.toList());
    }
}