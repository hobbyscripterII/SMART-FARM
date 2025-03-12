package com.project.smartfarm.manager;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/manager")
@RequiredArgsConstructor
public class ManagerPlantStatusController {
	@GetMapping("/plant_status")
	public String plantStatus() {
		return "manager/plant_status";
	}
}