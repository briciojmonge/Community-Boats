package com.booking.repository;

import com.booking.model.Booking;
import io.micronaut.data.jdbc.annotation.JdbcRepository;
import io.micronaut.data.model.query.builder.sql.Dialect;
import io.micronaut.data.repository.CrudRepository;
import java.util.List;

@JdbcRepository(dialect = Dialect.H2)
public interface BookingRepository extends CrudRepository<Booking, Long> {
    List<Booking> findByUserId(Long userId);
}
