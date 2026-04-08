package com.booking.controller;

import com.booking.client.TourClient;
import com.booking.client.UserClient;
import com.booking.dto.*;
import com.booking.model.Booking;
import com.booking.security.JwtUtil;
import com.booking.service.BookingService;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.HttpStatus;
import io.micronaut.http.annotation.*;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

@Controller("/bookings")
public class BookingController {
    private final BookingService bookingService;
    private final UserClient userClient;
    private final TourClient tourClient;

    public BookingController(BookingService bookingService, UserClient userClient, TourClient tourClient) {
        this.bookingService = bookingService;
        this.userClient = userClient;
        this.tourClient = tourClient;
    }

    @Post
    public HttpResponse<?> create(@Body BookingRequest request, @Header("Authorization") String auth) {
        if (auth == null || !auth.startsWith("Bearer ")) {
            return HttpResponse.unauthorized();
        }

        String token = auth.substring(7);
        if (!JwtUtil.validateToken(token)) {
            return HttpResponse.unauthorized();
        }

        Long userId = JwtUtil.getUserIdFromToken(token);
        UserDTO user = userClient.findById(userId);

        if (user == null || !"TOURIST".equals(user.getRole())) {
            return HttpResponse.status(HttpStatus.FORBIDDEN);
        }

        TourDTO tour = tourClient.findById(request.getTourId());
        if (tour == null) {
            return HttpResponse.notFound();
        }

        Booking booking = bookingService.create(userId, request.getTourId(), LocalDateTime.now());

        BookingDTO dto = new BookingDTO(
                booking.getId(),
                booking.getUserId(),
                booking.getTourId(),
                booking.getBookingDate(),
                booking.getStatus().name(),
                user.getName(),
                tour.getName()
        );

        return HttpResponse.created(dto);
    }

    @Get("/user/{userId}")
    public HttpResponse<?> listByUser(@PathVariable Long userId, @Header("Authorization") String auth) {
        if (auth == null || !auth.startsWith("Bearer ")) {
            return HttpResponse.unauthorized();
        }

        String token = auth.substring(7);
        if (!JwtUtil.validateToken(token)) {
            return HttpResponse.unauthorized();
        }

        Long loggedUserId = JwtUtil.getUserIdFromToken(token);
        if (!loggedUserId.equals(userId)) {
            return HttpResponse.status(HttpStatus.FORBIDDEN);
        }

        var bookings = bookingService.findByUserId(userId);

        var dtos = bookings.stream().map(b -> {
            UserDTO user = userClient.findById(b.getUserId());
            TourDTO tour = tourClient.findById(b.getTourId());

            return new BookingDTO(
                    b.getId(),
                    b.getUserId(),
                    b.getTourId(),
                    b.getBookingDate(),
                    b.getStatus().name(),
                    user != null ? user.getName() : "Desconocido",
                    tour != null ? tour.getName() : "Tour desconocido"
            );
        }).collect(Collectors.toList());

        return HttpResponse.ok(dtos);
    }

    @Get("/{id}")
    public HttpResponse<?> findById(@PathVariable Long id) {
        return bookingService.findById(id)
                .map(booking -> {
                    UserDTO user = userClient.findById(booking.getUserId());
                    TourDTO tour = tourClient.findById(booking.getTourId());

                    BookingDTO dto = new BookingDTO(
                            booking.getId(),
                            booking.getUserId(),
                            booking.getTourId(),
                            booking.getBookingDate(),
                            booking.getStatus().name(),
                            user != null ? user.getName() : "Desconocido",
                            tour != null ? tour.getName() : "Tour desconocido"
                    );

                    return HttpResponse.ok(dto);
                })
                .orElse(HttpResponse.notFound());
    }
}