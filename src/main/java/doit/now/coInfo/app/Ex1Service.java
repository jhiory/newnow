package doit.now.coInfo.app;

import java.util.HashMap;
import java.util.Map;

public interface Ex1Service {
    Map<String, Object> insertBoard(HashMap<String, Object> body);

    Map<String, Object> getBoardList(HashMap<String, Object> body);
}
