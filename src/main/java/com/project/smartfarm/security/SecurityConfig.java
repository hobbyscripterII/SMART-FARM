package com.project.smartfarm.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
	private final MySuccessHandler mySuccessHandler;
	
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .csrf(c -> c.disable())
                .formLogin(in -> in
                        .loginPage("/login")
                        .loginProcessingUrl("/login")
                        .usernameParameter("id")
                        .passwordParameter("pwd")
                        .failureUrl("/login?error")
                        .successHandler(mySuccessHandler)
                        .permitAll())
                .exceptionHandling(e -> e
                        .accessDeniedPage("/access-denied"))
                .authorizeHttpRequests(a -> a
                		// 정적 리소스 및 예외 페이지
                		.requestMatchers("/css/**", "/js/**", "/img/**", "/favicon.ico", "/access-denied", "/weather/**").permitAll()
                        // 미로그인 시 로그인 화면으로 리다이렉트
                		.requestMatchers("/").authenticated()
                        .requestMatchers("/root/**").hasRole("ROOT")
                        .requestMatchers("/manager/**").hasAnyRole("MANAGER", "ROOT")
                        .requestMatchers("/guest/**").hasAnyRole("GUEST", "MANAGER", "ROOT")
                );
        httpSecurity.logout(out -> {
                 out.logoutUrl("/logout")
                    .addLogoutHandler((request, response, authentication) -> {
                        HttpSession session = request.getSession();
                        if (session != null) {
                            session.invalidate();
                        }
                    })
                    .logoutSuccessHandler((request, response, authentication) -> {
                        response.sendRedirect("/");
                    });
        });
        return httpSecurity.build();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}