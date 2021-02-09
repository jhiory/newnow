package doit.now.exBoard.app;

import doit.now.exBoard.dao.ExBoardMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Service("ExBoardService")
public class ExBoardServiceImpl implements ExBoardService{
    @Autowired
    ExBoardMapper exBoardMapper;

    @Override
    public Map<String, Object> getBoardList(HashMap<String, Object> body) throws Exception {
        Map<String, Object> resultBody = new HashMap<String, Object>();

        //페이징
        int intPagesCnt = 0 ;
        int intRowCnt = 0 ;
        int intStartRow = 0;
        if(null != body.get("PAGES_CNT")){
            intPagesCnt = (int) body.get("PAGES_CNT");
        }
        if(null != body.get("PAGES_CNT")){
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
        List<Map<String, Object>> list = exBoardMapper.selectList(body);
        resultBody.put("result",list);
        return resultBody;
    }
}
