package doit.now.exBoard.api;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import doit.now.exBoard.app.ExBoardService;
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
@RestController("ExBoardApiController")
@Api(value = "ExBoardApiController", description = "테스트 컨트롤러")
public class ExBoardApiController {
    @Autowired
    ExBoardService exBoardService;

    @ApiOperation(value = "데이터 조회", notes = "마스터 데이터 조회")
    @Transactional(value = "transactionManager",readOnly = true)
    @PostMapping("/api/getBoardList")
    public ResponseEntity<?> getBoardList(@RequestBody HashMap<String, Object> body) throws Exception {
        Map<String, Object> resultBody = new HashMap<String, Object>();
        resultBody =  exBoardService.getBoardList(body);
            return ResponseEntity.ok(resultBody);
        }
    }
