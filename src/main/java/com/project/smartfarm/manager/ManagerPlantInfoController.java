package com.project.smartfarm.manager;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/manager")
@RequiredArgsConstructor
public class ManagerPlantInfoController {
	@GetMapping("/plant_info")
	public String plantInfo() {
		return "manager/plant_info";
	}
}