package com.user.service;

import com.user.model.User;
import io.micronaut.data.jdbc.annotation.JdbcRepository;
import io.micronaut.data.model.query.builder.sql.Dialect;
import io.micronaut.data.repository.CrudRepository;
import java.util.Optional;

@JdbcRepository(dialect = Dialect.H2)
public interface UserRepository extends CrudRepository<User, Long> {
    Optional<User> findByEmail(String email);
}