package com.example.IticketProject.dto.ticket;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record TransferRequest(
        @NotBlank @Email String recipientEmail,
        @NotBlank @Email String confirmEmail,
        @Size(max = 500) String message
) {
    @AssertTrue(message = "emails must match")
    public boolean isEmailsMatch() {
        return recipientEmail != null && recipientEmail.equalsIgnoreCase(confirmEmail);
    }
}
