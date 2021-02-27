package doit.now.exBoard.app;

import doit.now.exBoard.dao.CmpGdMapper;
import doit.now.exBoard.dao.ExBoardMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("CmpGdService")
public class CmpGdServiceImpl  implements CmpGdService {
    @Autowired
    CmpGdMapper cmpGdMapper;
    @Override
    public Map<String, Object> getBoardList(HashMap<String, Object> body) {
        Map<String, Object> resultBody = new HashMap<String, Object>();
        List<Map<String, Object>> list = cmpGdMapper.selectList(body);
        resultBody.put("result", list);
        return resultBody;
    }
    @Override
    public Map<String, Object> insertBoard(HashMap<String, Object> body) {
        return null;
    }
}
