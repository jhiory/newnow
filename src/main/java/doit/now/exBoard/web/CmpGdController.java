package doit.now.exBoard.web;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Slf4j
@RequiredArgsConstructor
@Controller
@Api(value="ExBoardController", description="업소별이용가이드")
public class CmpGdController
{

    /**
     * 
     * @return
     */
    @ApiOperation(value = "메인 페이지", notes="메인 페이지로 이동한다")
    @GetMapping("/cmpGd")
    public String moveTwbMain(Model model) throws Exception
    {
        log.debug("moveMain");
        return "exBoard/cmpGd";
    }

}
	

