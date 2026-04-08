package com.booking.dto;

public class BookingRequest {
    private Long tourId;

    public BookingRequest() {}

    public BookingRequest(Long tourId) {
        this.tourId = tourId;
    }

    public Long getTourId() { return tourId; }
    public void setTourId(Long tourId) { this.tourId = tourId; }
}