package doit.now.exBoard.dao;

import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Mapper
public interface ExBoardMapper {
    List<Map<String, Object>> selectList(HashMap<String, Object> body);

    int insertBoard(HashMap<String, Object> body);
}
