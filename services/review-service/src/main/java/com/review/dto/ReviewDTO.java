package com.review.dto;

import java.time.LocalDateTime;

public class ReviewDTO {
    private Long id;
    private Long bookingId;
    private Integer rating;
    private String comment;
    private LocalDateTime createdAt;

    public ReviewDTO() {}

    public ReviewDTO(Long id, Long bookingId, Integer rating, String comment, LocalDateTime createdAt) {
        this.id = id;
        this.bookingId = bookingId;
        this.rating = rating;
        this.comment = comment;
        this.createdAt = createdAt;
    }

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getBookingId() { return bookingId; }
    public void setBookingId(Long bookingId) { this.bookingId = bookingId; }
    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }
    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}