package com.cards.fullstack.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cards.fullstack.models.FlashCard;

@Repository
public interface FlashCardRepository extends JpaRepository<FlashCard, Integer> {

	public List<FlashCard> findByUserId(int userId);
}
