package com.tour.repository;

import com.tour.model.Tour;
import io.micronaut.data.jdbc.annotation.JdbcRepository;
import io.micronaut.data.model.query.builder.sql.Dialect;
import io.micronaut.data.repository.GenericRepository;

import java.util.List;
import java.util.Optional;

@JdbcRepository(dialect = Dialect.H2)
public interface TourRepository extends GenericRepository<Tour, Long> {
    Tour save(Tour tour);
    Optional<Tour> findById(Long id);
    List<Tour> findAll();
}