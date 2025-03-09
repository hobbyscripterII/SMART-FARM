package com.project.smartfarm.exception;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ExceptionController {
	@GetMapping("/access-denied")
	public String accessDenied() {
		return "exception/access-denied";
	}
}