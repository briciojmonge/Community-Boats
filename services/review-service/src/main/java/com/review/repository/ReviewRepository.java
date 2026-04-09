package com.review.repository;

import com.review.model.Review;
import io.micronaut.data.jdbc.annotation.JdbcRepository;
import io.micronaut.data.model.query.builder.sql.Dialect;
import io.micronaut.data.repository.GenericRepository;

import java.util.List;
import java.util.Optional;

@JdbcRepository(dialect = Dialect.H2)
public interface ReviewRepository extends GenericRepository<Review, Long> {
    Review save(Review review);
    Optional<Review> findById(Long id);
    List<Review> findByTourId(Long tourId);
}