package com.tour.service;

import com.tour.model.Tour;
import com.tour.repository.TourRepository;
import jakarta.inject.Singleton;

@Singleton
public class TourService {
    private final TourRepository tourRepository;

    public TourService(TourRepository tourRepository) {
        this.tourRepository = tourRepository;
    }

    public Tour create(String name, String location, Double price, Long guideId) {
        Tour tour = new Tour(name, location, price, guideId);
        return tourRepository.save(tour);
    }

    public Iterable<Tour> findAll() {
        return tourRepository.findAll();
    }

    public java.util.Optional<Tour> findById(Long id) {
        return tourRepository.findById(id);
    }
}