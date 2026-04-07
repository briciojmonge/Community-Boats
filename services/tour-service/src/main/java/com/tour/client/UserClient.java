package main.java.com.tour.client;

import com.tour.dto.UserDTO;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.client.annotation.Client;

@Client("http://localhost:8082/users")
public interface UserClient {
    @Get("/{id}")
    UserDTO findById(Long id);
}