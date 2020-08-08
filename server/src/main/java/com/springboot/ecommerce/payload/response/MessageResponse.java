package com.springboot.ecommerce.payload.response;

public class MessageResponse {
    private String message;

    public MessageResponse(String message) {
        this.message = message;
    }

    public String getToken() {
        return this.message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}