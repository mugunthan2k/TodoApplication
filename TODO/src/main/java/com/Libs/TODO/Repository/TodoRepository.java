package com.Libs.TODO.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Libs.TODO.Entity.Todo;

public interface TodoRepository extends JpaRepository<Todo,Integer>
{

}
