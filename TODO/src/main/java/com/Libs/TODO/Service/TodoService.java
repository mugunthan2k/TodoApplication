package com.Libs.TODO.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Libs.TODO.Entity.Todo;
import com.Libs.TODO.Repository.TodoRepository;

@Service
public class TodoService {
	@Autowired
	TodoRepository todorepository;
	
	public void saveData(Todo todo)
	{
		todorepository.save(todo);
	}
	
	public List<Todo> getData()
	{
		return todorepository.findAll();
	}
	
	public void deleteData(Integer id) {
        if (todorepository.existsById(id)) {
        	todorepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("Todo not found with ID: " + id);
        }
	}
	
	public void updateData(Integer id,Todo todo) {
		if(todorepository.existsById(id))
		{
			Todo user=todorepository.findById(id).orElse(null);
			if(user!=null)
			{
				user.setName(todo.getName());
				user.setAge(todo.getAge());
				user.setContact(todo.getContact());
				
				todorepository.save(user);
			}
		}
		else
		{
			throw new IllegalArgumentException("Todo not found with ID: "+ id);
		}
		
	}
}
