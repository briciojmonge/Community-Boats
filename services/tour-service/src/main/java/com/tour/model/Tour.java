package com.tour.model;

import io.micronaut.data.annotation.Id;
import io.micronaut.data.annotation.GeneratedValue;
import io.micronaut.data.annotation.MappedEntity;

@MappedEntity("tours")
public class Tour {

    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private String location;
    private Double price;
    private Long guideId;

    public Tour() {
    }

    public Tour(String name, String location, Double price, Long guideId) {
        this.name = name;
        this.location = location;
        this.price = price;
        this.guideId = guideId;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public Long getGuideId() { return guideId; }
    public void setGuideId(Long guideId) { this.guideId = guideId; }
}