package main.java.com.booking.client;

import com.booking.dto.TourDTO;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.client.annotation.Client;

@Client("http://localhost:8081/tours")
public interface TourClient {

    @Get("/{id}")
    TourDTO findById(Long id);
}