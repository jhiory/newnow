package doit.now.exBoard.app;

import java.util.HashMap;
import java.util.Map;

public interface CmpGdService {


    Map<String, Object> getBoardList(HashMap<String, Object> body);

    Map<String, Object> insertBoard(HashMap<String, Object> body);
}
