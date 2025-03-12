package com.project.smartfarm.manager;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/manager")
@RequiredArgsConstructor
public class ManagerNutrientInjectionController {
	@GetMapping("/nutrient_injection")
	public String nutrientInjection() {
		return "manager/nutrient_injection";
	}
}
