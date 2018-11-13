package com.assetManagement.services;

import java.util.List;

public interface Service<E, ID> 
{

		E create(E entity);

		E readById(ID id);

		List<E> readAll();
 
		E update(E entity);

		void delete(E entity);
		
		List<E> findAllHistory();
	
}
