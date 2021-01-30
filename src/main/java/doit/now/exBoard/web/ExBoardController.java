package doit.now.exBoard.web;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Controller
@Api(value="ExBoardController", description="공지사항")
public class ExBoardController
{

    /**
     * 
     * @return
     */
    @ApiOperation(value = "메인 페이지", notes="메인 페이지로 이동한다")
    @GetMapping("/exBoard")
    public String moveTwbMain(Model model) throws Exception
    {
        log.debug("moveMain");
        return "exBoard/exBoard";
    }

}
	

