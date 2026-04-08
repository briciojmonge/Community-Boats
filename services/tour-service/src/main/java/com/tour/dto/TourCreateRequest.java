package com.tour.dto;

public class TourCreateRequest {
    private String name;
    private String location;
    private Double price;
    // guideId se obtiene del token, no del body

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
}