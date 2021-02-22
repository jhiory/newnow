package doit.now.coInfo.dao;

import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Mapper
public interface Ex1Mapper {
    int insertBoard(HashMap<String, Object> body);

    List<Map<String, Object>> selectList(HashMap<String, Object> body);
}
