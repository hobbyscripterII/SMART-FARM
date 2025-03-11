package com.project.smartfarm.root;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.project.smartfarm.cmmn.Const;

@Controller
@RequestMapping("/root")
public class RootHomeController {
	@Value("${api.url}") private String apiUrl;
	
	@GetMapping("/home")
	public String home(Model model) {
		model.addAttribute(Const.API_URL, apiUrl);
		
		return "root/home";
	}
}