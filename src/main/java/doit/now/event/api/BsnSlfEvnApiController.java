package doit.now.event.api;

import doit.now.event.app.BsnSlfEvnService;
import doit.now.event.app.OpGdEvnService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Controller
@RequiredArgsConstructor
@RestController("BsnSlfEvnApiController")
@Api(value = " BsnSlfEvnApiController", description = "테스트 컨트롤러")
public class BsnSlfEvnApiController {
    @Autowired
    BsnSlfEvnService bsnSlfEvnService;

    @ApiOperation(value = "데이터 조회", notes = "마스터 데이터 조회")
    @Transactional(value = "transactionManager",readOnly = true)
    @PostMapping("/api/bsnSlfEvn/getBoardList")
    public ResponseEntity<?> getBoardList(@RequestBody HashMap<String, Object> body) throws Exception {
        Map<String, Object> resultBody = new HashMap<String, Object>();
        resultBody =  bsnSlfEvnService.getBoardList(body);
        return ResponseEntity.ok(resultBody);
    }
    @ApiOperation(value = "데이터 등록", notes = "마스터 데이터 등록")
    @Transactional(value = "transactionManager")
    @PostMapping("/api/bsnSlfEvn/insertBoard")
    public ResponseEntity<?> insertBoard(@RequestBody HashMap<String, Object> body) throws Exception {
        Map<String, Object> resultBody = new HashMap<String, Object>();
        resultBody =  bsnSlfEvnService.insertBoard(body);
        return ResponseEntity.ok(resultBody);
    }
//fdsafsdakjfkldajsklfjdasklfda
}
