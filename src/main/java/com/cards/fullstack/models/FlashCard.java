package com.cards.fullstack.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name="flashcards")
public class FlashCard {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
	private String question;
	private String answer;
	private String resourceLink;
		
	private int userId;
	
	public FlashCard()
	{
		
	}
	
	public FlashCard(int id, String question, String answer, String resourceName, String resourceLink, int userId) {
		this.id = id;
		this.question = question;
		this.answer = answer;
		this.resourceLink = resourceLink;
		this.userId = userId;
	}
	
	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getQuestion() {
		return question;
	}
	public void setQuestion(String question) {
		this.question = question;
	}
	public String getAnswer() {
		return answer;
	}
	public void setAnswer(String answer) {
		this.answer = answer;
	}
	public String getResourceLink() {
		return resourceLink;
	}
	public void setResourceLink(String resourceLink) {
		this.resourceLink = resourceLink;
	}
	
	
}
