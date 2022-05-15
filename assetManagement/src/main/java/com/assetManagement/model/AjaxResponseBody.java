package com.assetManagement.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonView;

public class AjaxResponseBody {

	@JsonView(Views.Public.class)
	String msg;

	@JsonView(Views.Public.class)
	String status;
	
	@JsonView(Views.Public.class)
	Object result;
	
	@JsonView(Views.Public.class)
	List<String> resultList;
	
	@JsonView(Views.Public.class)
	List<String> idTags;

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Object getResult() {
		return result;
	}

	public void setResult(Object result) {
		this.result = result;
	}

	public List<String> getResultList() {
		return resultList;
	}

	public void setResultList(List<String> list) {
		this.resultList = list;
	}

	public List<String> getIdTags() {
		return idTags;
	}

	public void setIdTags(List<String> idTags) {
		this.idTags = idTags;
	}
	
}
