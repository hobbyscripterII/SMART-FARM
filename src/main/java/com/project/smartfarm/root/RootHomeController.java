package com.project.smartfarm.root;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/root")
public class RootHomeController {
	@GetMapping("/home")
	public String home() {
		return "root/home";
	}
}