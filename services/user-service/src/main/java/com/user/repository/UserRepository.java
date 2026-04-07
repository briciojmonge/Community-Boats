package main.java.com.user.repository;

import com.user.model.User;
import io.micronaut.data.jdbc.annotation.JdbcRepository;
import io.micronaut.data.repository.CrudRepository;
import java.util.Optional;

@JdbcRepository
public interface UserRepository extends CrudRepository<User, Long> {
    Optional<User> findByEmail(String email);
}