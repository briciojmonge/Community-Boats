package main.java.com.review.client;

import com.review.dto.BookingDTO;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.client.annotation.Client;

@Client("http://localhost:8083/bookings")
public interface BookingClient {
    @Get("/{id}")
    BookingDTO findById(Long id);
}