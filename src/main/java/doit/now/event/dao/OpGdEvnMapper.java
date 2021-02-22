package doit.now.event.dao;

import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Mapper
public interface OpGdEvnMapper {
    int insertBoard(HashMap<String, Object> body);

    List<Map<String, Object>> selectList(HashMap<String, Object> body);
}
