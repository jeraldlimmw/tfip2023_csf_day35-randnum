package day35.RandomNumberController.service;

import java.security.SecureRandom;
import java.util.LinkedList;
import java.util.List;
import java.util.Random;

import org.springframework.stereotype.Service;

@Service
public class RandomService {
    
    private Random rand = new SecureRandom();

    public List<Integer> getRandomNumber(int min, int max, int count) {
        List<Integer> result = new LinkedList<>();
        for (int i = 0; i < count; i++)
            result.add(min + (rand.nextInt(max - min + 1)));
        return result;
    }
}
