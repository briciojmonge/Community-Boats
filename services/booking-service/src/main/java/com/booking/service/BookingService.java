package main.java.com.booking.service;

import com.booking.model.Booking;
import com.booking.model.BookingStatus;
import com.booking.repository.BookingRepository;
import jakarta.inject.Singleton;
import java.time.LocalDateTime;
import java.util.List;

@Singleton
public class BookingService {
    private final BookingRepository bookingRepository;

    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    public Booking create(Long userId, Long tourId, LocalDateTime date) {
        Booking booking = new Booking(userId, tourId, date, BookingStatus.CONFIRMED);
        return bookingRepository.save(booking);
    }

    public List<Booking> findByUserId(Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    public java.util.Optional<Booking> findById(Long id) {
        return bookingRepository.findById(id);
    }
}