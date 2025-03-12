package com.project.smartfarm.manager;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/manager")
@RequiredArgsConstructor
public class ManagerOpenCloseController {
	@GetMapping("/open_close")
	public String openClose() {
		return "manager/open_close";
	}
}