package doit.now.exBoard.app;

import java.util.HashMap;
import java.util.Map;

public interface ExBoardService {

    Map<String, Object> getBoardList(HashMap<String, Object> body)throws Exception;

    Map<String, Object> insertBoard(HashMap<String, Object> body);
}
