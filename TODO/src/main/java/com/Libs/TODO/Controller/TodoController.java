package com.Libs.TODO.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.Libs.TODO.Entity.Todo;
import com.Libs.TODO.Service.TodoService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController			//Response+Controller
public class TodoController {
	@Autowired
	TodoService todoservice;
	
	@PostMapping("/add")
	public String saveData(@RequestBody Todo todo)
	{
		todoservice.saveData(todo);
		return "Your data addded successfully";	
	}
	
	@GetMapping("/get")
	public List<Todo> getData()
	{
		return  todoservice.getData();	
	}
	
	@DeleteMapping("/delete/{id}")
	public void deleteData(@PathVariable Integer id)
	{
		todoservice.deleteData(id);
	}
	
	@PutMapping("/update/{id}")
	public void updateData(@PathVariable("id") Integer id, @RequestBody Todo todo)
	{
		todoservice.updateData(id,todo);
	}
}
