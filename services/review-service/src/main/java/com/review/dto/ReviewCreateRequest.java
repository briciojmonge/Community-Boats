package com.review.dto;

public class ReviewCreateRequest {
    private Long bookingId;
    private Integer rating;    // 1 a 5
    private String comment;

    public ReviewCreateRequest() {}

    public ReviewCreateRequest(Long bookingId, Integer rating, String comment) {
        this.bookingId = bookingId;
        this.rating = rating;
        this.comment = comment;
    }

    // Getters y Setters
    public Long getBookingId() { return bookingId; }
    public void setBookingId(Long bookingId) { this.bookingId = bookingId; }
    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }
    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }
}