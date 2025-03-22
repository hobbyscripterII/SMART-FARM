package com.project.smartfarm.root;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/root")
public class RootHouseController {
	@GetMapping("/house")
	public String home() {
		return "root/house";
	}
}