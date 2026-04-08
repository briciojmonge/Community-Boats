package com.booking.model;

import io.micronaut.data.annotation.Id;
import io.micronaut.data.annotation.MappedEntity;
import java.time.LocalDateTime;

@MappedEntity
public class Booking {
    @Id
    private Long id;
    private Long userId;
    private Long tourId;
    private LocalDateTime bookingDate;
    private BookingStatus status;

    public Booking() {}

    public Booking(Long userId, Long tourId, LocalDateTime bookingDate, BookingStatus status) {
        this.userId = userId;
        this.tourId = tourId;
        this.bookingDate = bookingDate;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getTourId() {
        return tourId;
    }

    public void setTourId(Long tourId) {
        this.tourId = tourId;
    }

    public LocalDateTime getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(LocalDateTime bookingDate) {
        this.bookingDate = bookingDate;
    }

    public BookingStatus getStatus() {
        return status;
    }

    public void setStatus(BookingStatus status) {
        this.status = status;
    }
}
