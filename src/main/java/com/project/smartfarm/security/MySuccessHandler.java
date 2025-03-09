package com.project.smartfarm.security;

import java.io.IOException;
import java.util.Collection;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.project.smartfarm.cmmn.Const;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class MySuccessHandler implements AuthenticationSuccessHandler {
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
		Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
		String redirectUrl = "guest/home";
		
		for(GrantedAuthority authority : authorities) {
			String role = authority.getAuthority();
			
			if(role.equals(Const.ROLE_MANAGER)) {
				redirectUrl = "manager/home";
			} else if(role.equals(Const.ROLE_ROOT)) {
				redirectUrl = "root/home";
			}
		}
		
		response.sendRedirect(redirectUrl);
	}
}