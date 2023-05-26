package day35.RandomNumberController.controller;

import java.io.StringReader;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import day35.RandomNumberController.service.RandomService;
import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;

@Controller
@RequestMapping(path="/api", produces=MediaType.APPLICATION_JSON_VALUE)
//@CrossOrigin(origins="*") for all clients
@CrossOrigin(origins="http://localhost:4200")
public class RandomNumberController {
    
    @Autowired
    private RandomService randSvc;

    // GET /api/random?count=5
    @GetMapping(path="/random")
    @ResponseBody
    public ResponseEntity<String> getRandom(@RequestParam(defaultValue = "1") Integer count) {
        List<Integer> nums = randSvc.getRandomNumber(0, 1000, count);

        return randomNumListToJson(nums);
    }

    // POST /api/random
    @PostMapping(path="/random", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> postRandom(@RequestBody String payload) {
        // use JsonReader for values in body of application/json POST
        JsonReader reader = Json.createReader(new StringReader(payload));
        JsonObject req = reader.readObject();

        int count = req.getInt("count", 1);
        int min = req.getInt("min", 0);
        int max = req.getInt("max", 10);

        List<Integer> nums = randSvc.getRandomNumber(min, max, count);
        return randomNumListToJson(nums);
    }

    // POST /api/random
    // Content-Type: appplication/x-www-form-urlencoded
    @PostMapping(path="random", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    @ResponseBody
    public ResponseEntity<String> postRandomForm(@RequestBody MultiValueMap<String, String> form) {
        // use getFirst for values in body of application/x-www-form-urlencoded POST
        // values in MVM are stored as String, need to trim and parse in getValue()
        int count = getValue(form.getFirst("count"), 1);
        int min = getValue(form.getFirst("min"), 0);
        int max = getValue(form.getFirst("max"), 10);        
        
        List<Integer> nums = randSvc.getRandomNumber(min, max, count);
        return randomNumListToJson(nums);
    }

    private ResponseEntity<String> randomNumListToJson(List<Integer> numList) {
        // create a JSON arr using the list of integers
        JsonArrayBuilder ab = Json.createArrayBuilder(numList);

        JsonObject resp = Json.createObjectBuilder()
            .add("numbers", ab.build())
            .add("timestamp", (new Date()).toString())
            .build();

        return ResponseEntity.ok(resp.toString());
    }

    private int getValue(String value, int defValue) {
        if (value.trim().length() <= 0 || (null == value))
            return defValue;
        return Integer.parseInt(value);
    }
}