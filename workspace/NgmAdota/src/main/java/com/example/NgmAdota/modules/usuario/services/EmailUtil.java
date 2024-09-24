package com.example.NgmAdota.modules.usuario.services;

import javax.mail.*;
import javax.mail.internet.*;
import java.util.Properties;

public class EmailUtil {
    public static void sendEmail(String toEmail, String subject, String body) {
        final String fromEmail = "arthurtorres059@gmail.com"; // Seu email
        final String password = "xuxo qdmd zjsj unzr"; // Sua senha

        Properties props = new Properties();
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");

        Session session = Session.getInstance(props, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(fromEmail, password);
            }
        });

        try {
            Message msg = new MimeMessage(session);
            msg.setFrom(new InternetAddress(fromEmail));
            msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toEmail));
            msg.setSubject(subject);
            msg.setContent(body, "text/html");
            msg.setSentDate(new java.util.Date());
            Transport.send(msg);
        } catch (MessagingException e) {
            e.printStackTrace(); // Para depuração
        }
    }
}
