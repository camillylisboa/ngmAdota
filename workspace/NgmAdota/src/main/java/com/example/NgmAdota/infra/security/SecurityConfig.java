package com.example.NgmAdota.infra.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final SecurityFilter securityFilter;

    @Autowired
    public SecurityConfig(SecurityFilter securityFilter) {
        this.securityFilter = securityFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(HttpMethod.GET, "/usuario/comentario/get").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/email/password/reset-link").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/email/password/reset").permitAll()
                        .requestMatchers(HttpMethod.POST, "/animal/").hasRole("ONG")
                        .requestMatchers(HttpMethod.GET, "/ong/lista/{email}").permitAll()
                        .requestMatchers(HttpMethod.GET, "/ong/animal/{ongId}").permitAll()
                        .requestMatchers(HttpMethod.GET, "/raca/get").permitAll()
                        .requestMatchers(HttpMethod.GET, "/statusAnimal/get").permitAll()
                        .requestMatchers(HttpMethod.GET, "/especie/get").permitAll()
                        .requestMatchers(HttpMethod.GET, "/pelagem/get").permitAll()
                        .requestMatchers(HttpMethod.GET, "/porte/get").permitAll()
                        .requestMatchers(HttpMethod.GET, "/ong/lista").permitAll()
                        .requestMatchers(HttpMethod.GET, "/auth/lista").permitAll()
                        .requestMatchers(HttpMethod.POST, "/auth/login").permitAll()
                        .requestMatchers(HttpMethod.GET, "/animal/lista").permitAll()
                        .requestMatchers(HttpMethod.GET, "/animal/lista/{id}").permitAll()
                        .requestMatchers(HttpMethod.GET, "/interesse/lista").permitAll()
                        .requestMatchers(HttpMethod.POST, "/interesse/cadastro").permitAll()
                        .requestMatchers(HttpMethod.POST, "/auth/register").permitAll()
                        .requestMatchers(HttpMethod.POST, "/usuario/comentario/").permitAll()

                        .anyRequest().authenticated()
                )
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
