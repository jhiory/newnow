package doit.now.coInfo.app;

import doit.now.coInfo.dao.Ex1Mapper;
import doit.now.exBoard.dao.MmbLvlMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Service("Ex1Service")
public class Ex1ServiceImp implements Ex1Service {
    @Autowired
    Ex1Mapper ex1mapper;

    @Override
    public Map<String, Object> insertBoard(HashMap<String, Object> body) {
        Map<String, Object> resultBody = new HashMap<String, Object>();
        int result = ex1mapper.insertBoard(body);
        resultBody.put("result",result);
        return resultBody;
    }

    @Override
    public Map<String, Object> getBoardList(HashMap<String, Object> body) {

        Map<String, Object> resultBody = new HashMap<String, Object>();

        //페이징
        int intPagesCnt = 1 ;
        int intRowCnt = 1000 ;
        int intStartRow = 0;
        if(null != body.get("PAGES_CNT")){
            intPagesCnt = (int) body.get("PAGES_CNT");
        }
        if(null != body.get("ROW_CNT")){
            intRowCnt = (int) body.get("ROW_CNT");
        }
        intStartRow = (intRowCnt * intPagesCnt) - intRowCnt;

        if (intPagesCnt != 0)
        {
            body.put("PAGES_CNT", intPagesCnt);
        }
        if (intRowCnt != 0)
        {
            body.put("ROW_CNT", intRowCnt);
        }
        if (intRowCnt != 0)
        {
            body.put("PAGES_CNT", intPagesCnt);
            body.put("ROW_CNT",  intRowCnt);
            body.put("START_ROW",  intStartRow);
        }
        else
        {
            body.put("START_ROW",  0);		// 값이 없는 경우 초기화값을 넘김.
            body.put("PAGES_CNT",  intPagesCnt);
            body.put("ROW_CNT",  intRowCnt);
        }

        List<Map<String, Object>> list = ex1mapper.selectList(body);
        resultBody.put("result",list);
        return resultBody;
    }
}