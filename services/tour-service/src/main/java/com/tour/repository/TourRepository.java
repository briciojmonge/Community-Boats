package main.java.com.tour.repository;

import com.tour.model.Tour;
import io.micronaut.data.jdbc.annotation.JdbcRepository;
import io.micronaut.data.repository.CrudRepository;

@JdbcRepository
public interface TourRepository extends CrudRepository<Tour, Long> {
    Iterable<Tour> findAll();
}