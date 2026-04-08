package com.booking.dto;

import java.time.LocalDateTime;

public class BookingDTO {
    private Long id;
    private Long userId;
    private Long tourId;
    private LocalDateTime bookingDate;
    private String status;
    private String userName;
    private String tourName;

    public BookingDTO() {}

    public BookingDTO(Long id, Long userId, Long tourId, LocalDateTime bookingDate, 
                      String status, String userName, String tourName) {
        this.id = id;
        this.userId = userId;
        this.tourId = tourId;
        this.bookingDate = bookingDate;
        this.status = status;
        this.userName = userName;
        this.tourName = tourName;
    }

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public Long getTourId() { return tourId; }
    public void setTourId(Long tourId) { this.tourId = tourId; }
    public LocalDateTime getBookingDate() { return bookingDate; }
    public void setBookingDate(LocalDateTime bookingDate) { this.bookingDate = bookingDate; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }
    public String getTourName() { return tourName; }
    public void setTourName(String tourName) { this.tourName = tourName; }
}