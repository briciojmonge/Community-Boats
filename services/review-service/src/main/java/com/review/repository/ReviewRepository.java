package main.java.com.review.repository;

import com.review.model.Review;
import io.micronaut.data.jdbc.annotation.JdbcRepository;
import io.micronaut.data.repository.CrudRepository;

@JdbcRepository
public interface ReviewRepository extends CrudRepository<Review, Long> {
}