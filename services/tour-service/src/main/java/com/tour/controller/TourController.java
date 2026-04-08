package com.tour.controller;

import com.tour.client.UserClient;
import com.tour.dto.TourCreateRequest;
import com.tour.dto.TourDTO;
import com.tour.dto.UserDTO;
import com.tour.model.Tour;
import com.tour.security.JwtUtil;
import com.tour.service.TourService;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.HttpStatus;
import io.micronaut.http.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Controller("/tours")
public class TourController {
    private final TourService tourService;
    private final UserClient userClient;

    public TourController(TourService tourService, UserClient userClient) {
        this.tourService = tourService;
        this.userClient = userClient;
    }

    @Post
    public HttpResponse<?> create(@Body TourCreateRequest request, @Header("Authorization") String auth) {
        if (auth == null || !auth.startsWith("Bearer ")) {
            return HttpResponse.unauthorized();
        }

        String token = auth.substring(7);
        if (!JwtUtil.validateToken(token)) {
            return HttpResponse.unauthorized();
        }

        Long guideId = JwtUtil.getUserIdFromToken(token);
        UserDTO guide = userClient.findById(guideId);

        if (guide == null || !"GUIDE".equals(guide.getRole())) {
            return HttpResponse.status(HttpStatus.FORBIDDEN);
        }

        Tour tour = tourService.create(
                request.getName(),
                request.getLocation(),
                request.getPrice(),
                guideId
        );

        TourDTO dto = new TourDTO(
                tour.getId(),
                tour.getName(),
                tour.getLocation(),
                tour.getPrice(),
                guide.getName(),
                guide.getCommunity()
        );

        return HttpResponse.created(dto);
    }

    @Get
    public List<TourDTO> list() {
        List<Tour> tours = (List<Tour>) tourService.findAll();

        return tours.stream().map(tour -> {
            UserDTO guide = userClient.findById(tour.getGuideId());

            return new TourDTO(
                    tour.getId(),
                    tour.getName(),
                    tour.getLocation(),
                    tour.getPrice(),
                    guide != null ? guide.getName() : "Desconocido",
                    guide != null ? guide.getCommunity() : ""
            );
        }).collect(Collectors.toList());
    }

    @Get("/{id}")
    public HttpResponse<?> findById(@PathVariable Long id) {
        return tourService.findById(id)
                .map(tour -> {
                    UserDTO guide = userClient.findById(tour.getGuideId());

                    TourDTO dto = new TourDTO(
                            tour.getId(),
                            tour.getName(),
                            tour.getLocation(),
                            tour.getPrice(),
                            guide != null ? guide.getName() : "Desconocido",
                            guide != null ? guide.getCommunity() : ""
                    );

                    return HttpResponse.ok(dto);
                })
                .orElse(HttpResponse.notFound());
    }
}