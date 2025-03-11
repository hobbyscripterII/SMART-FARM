package com.project.smartfarm.manager;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.project.smartfarm.cmmn.Const;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/manager")
@RequiredArgsConstructor
public class ManagerHomeController {
	@Value("${api.url}") private String apiUrl;
	
	@GetMapping("/home")
	public String home(Model model) {
		model.addAttribute(Const.API_URL, apiUrl);
		
		return "manager/home";
	}
}