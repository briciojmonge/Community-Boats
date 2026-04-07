package main.java.com.booking.model;

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
    // getters y setters
}