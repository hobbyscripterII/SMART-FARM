package com.project.smartfarm.root;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/root")
public class RootManagerController {
	@GetMapping("/manager")
	public String home() {
		return "root/manager";
	}
}