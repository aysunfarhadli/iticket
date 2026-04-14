package com.example.IticketProject.service.impl;

import com.example.IticketProject.config.AppProperties;
import com.example.IticketProject.entity.EmailLog;
import com.example.IticketProject.entity.Order;
import com.example.IticketProject.entity.OrderItem;
import com.example.IticketProject.repository.EmailLogRepository;
import com.example.IticketProject.service.EmailService;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.time.format.DateTimeFormatter;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {
    private final EmailLogRepository logs;
    private final AppProperties props;
    private final JavaMailSender mail;

    @Async
    @Override
    public void sendOrderConfirmation(Order o) {
        String to = o.getUser().getEmail();
        String subject = "Hörmətli " + o.getUser().getFullName() + ", sifarişiniz təsdiq edildi";
        String html = buildHtml(o);
        String plain = buildPlain(o);

        boolean success = true; String error = null;

        if (props.mail().mock()) {
            log.info("=== MOCK EMAIL ===\nFROM: {}\nTO: {}\nSUBJECT: {}\n{}\n==================",
                    props.mail().from(), to, subject, plain);
        } else {
            try {
                MimeMessage msg = mail.createMimeMessage();
                MimeMessageHelper h = new MimeMessageHelper(msg, true, StandardCharsets.UTF_8.name());
                h.setFrom(props.mail().from());
                h.setTo(to);
                h.setSubject(subject);
                h.setText(plain, html);
                mail.send(msg);
                log.info("Email sent to {}", to);
            } catch (Exception e) {
                success = false; error = e.getMessage();
                log.error("Email send failed to {}: {}", to, e.getMessage());
            }
        }
        logs.save(EmailLog.builder().toAddress(to).subject(subject).body(plain)
                .success(success).error(error).build());
    }

    private String buildPlain(Order o) {
        StringBuilder b = new StringBuilder();
        b.append("Salam ").append(o.getUser().getFullName()).append(",\n\n");
        b.append("Sifariş №: ").append(o.getOrderNumber()).append("\n");
        b.append("Status: ").append(o.getStatus()).append("\n");
        b.append("Pickup: ").append(o.getPickupMethod()).append("\n\nBiletlər:\n");
        for (OrderItem i : o.getItems()) {
            b.append(" - ").append(i.getTicketType().getEvent().getTitle())
             .append(" (").append(i.getTicketType().getName()).append(") x ")
             .append(i.getQuantity()).append(" = ").append(i.getSubtotal()).append(" AZN\n");
            b.append("   Tarix: ").append(i.getTicketType().getEvent().getStartsAt()
                    .format(DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm"))).append("\n");
        }
        b.append("\nÜmumi məbləğ: ").append(o.getTotalAmount()).append(" AZN\n\n");
        b.append("iTicket — seçiminizə görə təşəkkür edirik!\n");
        return b.toString();
    }

    private String buildHtml(Order o) {
        StringBuilder rows = new StringBuilder();
        for (OrderItem i : o.getItems()) {
            rows.append("<tr>")
                .append("<td style='padding:10px;border-bottom:1px solid #eef2f7'>")
                .append("<b>").append(i.getTicketType().getEvent().getTitle()).append("</b><br>")
                .append("<span style='color:#64748b;font-size:13px'>")
                .append(i.getTicketType().getName()).append(" · ")
                .append(i.getTicketType().getEvent().getStartsAt()
                        .format(DateTimeFormatter.ofPattern("dd MMM yyyy, HH:mm"))).append("</span>")
                .append("</td>")
                .append("<td style='padding:10px;text-align:center;border-bottom:1px solid #eef2f7'>×")
                .append(i.getQuantity()).append("</td>")
                .append("<td style='padding:10px;text-align:right;border-bottom:1px solid #eef2f7'><b>")
                .append(i.getSubtotal()).append(" ₼</b></td></tr>");
        }
        return "<!doctype html><html><body style='margin:0;background:#f8fafc;font-family:Inter,Arial,sans-serif;color:#0f172a'>"
            + "<div style='max-width:560px;margin:0 auto;padding:24px'>"
            + "<div style='background:#fff;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden'>"
            + "<div style='background:#3A66FF;color:#fff;padding:24px'>"
            + "<div style='font-size:22px;font-weight:800'>iTicket</div>"
            + "<div style='opacity:.85;margin-top:4px'>Sifarişiniz təsdiq edildi 🎉</div></div>"
            + "<div style='padding:24px'>"
            + "<p>Salam <b>" + o.getUser().getFullName() + "</b>,</p>"
            + "<p>Sifariş <b>" + o.getOrderNumber() + "</b> uğurla tamamlandı.</p>"
            + "<table style='width:100%;border-collapse:collapse;margin-top:16px'>"
            + "<thead><tr style='background:#f8fafc;color:#64748b;text-align:left'>"
            + "<th style='padding:10px'>Bilet</th><th style='padding:10px;text-align:center'>Sayı</th>"
            + "<th style='padding:10px;text-align:right'>Məbləğ</th></tr></thead>"
            + "<tbody>" + rows + "</tbody></table>"
            + "<div style='display:flex;justify-content:space-between;margin-top:20px;padding-top:16px;border-top:2px solid #e2e8f0'>"
            + "<span style='color:#64748b'>Cəmi</span>"
            + "<b style='font-size:20px'>" + o.getTotalAmount() + " ₼</b></div>"
            + "<div style='margin-top:16px;font-size:13px;color:#64748b'>Pickup: "
            + o.getPickupMethod() + "</div>"
            + "<a href='http://localhost:5174/my-tickets' style='display:inline-block;margin-top:24px;background:#3A66FF;color:#fff;text-decoration:none;padding:12px 20px;border-radius:10px;font-weight:600'>Biletlərimə bax</a>"
            + "</div></div>"
            + "<div style='text-align:center;color:#94a3b8;font-size:12px;margin-top:16px'>© 2026 iTicket</div>"
            + "</div></body></html>";
    }
}
