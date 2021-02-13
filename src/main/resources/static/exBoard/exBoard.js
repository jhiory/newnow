
/********************************************************************************
 * Global Variable : 스크립트 영역에서 모두 접근할 수 있는 전역변수를 해당 영역에 모두 정의한다.
 ********************************************************************************/
var objGridData = null;
/********************************************************************************
 * Document Ready : jquery에서 제공하는 함수를 이용하여 화면이 로드될 때 처리할 함수를 정의한다.
 ********************************************************************************/
function domReady(){
    exBorad.initPage();	//페이지 초기화 처리
    exBorad.defineEvent();	//이벤트 정의
    console.log(12124);
};
$(window).on("beforeunload",function(){
    //윈도우 종료전 처리
});

/**
 * 클래스 구조의 스크립트 구조체 오브젝트 명을 정의한다.
 * 스크립트를 클래스 기반의 구조체로 정의하기 위해 해당 JavaScript의 클래스명은 파일명으로 정의한다.
 * @classDescription :
 */
var exBorad = {
    /********************************************************************************
     * InitPage Function : 화면이 초기 로드 시점에 처리할 사항을 정의한다.
     ********************************************************************************/
    initPage: function () {
        // $.showDocProgressBar();
        //그리드 디자인
        this.defineGrid();
        //레이어 폼 화면 디자인
        this.defineForm();
        //탭화면 디자인
        this.makeTab();
        //콤보박스 디자인
        this.makeComboBox();
        //초기데이터설정
        this.initData();
    },
    /********************************************************************************
     * Event Object : 화면에 디자인 된 버튼 및 오브젝트 이벤트와 호출할 함수를 정의한다.
     ********************************************************************************/
    defineEvent:function(){
        console.log(1212);
        //$("#tit").keyup(alert("121212"));	//신규등록

        $("#btnSave").click(function(e){exBorad.SendSave();});	//신규등록
        $("#selectRtn").click(function(e){exBorad.selectRtn1();});	//조회버튼

    },
    //		-------------------------------------------------------------------------------
//		GRID: 그리드 구성을 위한 함수 정의 [기본함수명:defineGrid + (구분단어)]
//		-------------------------------------------------------------------------------
    defineGrid:function(){

    },
    //		-------------------------------------------------------------------------------
//		LAYER FORM PAGE: 단위 폼 구성을 위한 함수 정의  [기본함수명:defineForm + (구분단어)]
//		-------------------------------------------------------------------------------
    defineForm:function(){

    },
    //		-------------------------------------------------------------------------------
//		TAB: 탭버튼 구성을 위한 함수 정의 [기본함수명:makeTab + (구분단어)]
//		-------------------------------------------------------------------------------
    makeTab:function(){
        //sdkffj

    },
    //		-------------------------------------------------------------------------------
//		COMBO BOX: 콤보박스 구성을 위한 함수 정의 [기본함수명:makeComboBox + (구분단어)]
//		-------------------------------------------------------------------------------
    makeComboBox:function(){
    },
    //		-------------------------------------------------------------------------------
//		LOAD_DATA: 초기데이터 로드를 위한 함수 정의 [기본함수명:initData + (구분단어)]
//		-------------------------------------------------------------------------------
    initData:function(){
        exBorad.getList();

    },
    //
    getList:function () {
        console.log(1212);
        // return;

        //파라메터정의
        var objJsonParams = {};
        objJsonParams.Service= "getBoardList";

        console.log("selectRtn : ",objJsonParams);

        //서비스 호출
        var objJsonReturn = $.callService(objJsonParams);

        console.log("objJsonReturn : ",objJsonReturn);
        // 그리드 그리는 함수 호출
        exBorad.makeGrid(objJsonReturn.JsonObj.result);
        //결과값 반환
        // if(!objJsonReturn.getErrorFlag()){
        //     console.log("objJsonReturn: {}",objJsonReturn);
        //
        // } else {
        //     TwbMsg(objJsonReturn.getMsg(), "E");
        // }

        objJsonParams = null;	//전송파라메터소멸
        objJsonReturn = null;	//반환파라메터소멸
    },
    SendSave:function () {
    console.log(1212);
    // return;

        //파라메터정의
        var objJsonParams = {};
        objJsonParams.Service= "insertBoard";
        objJsonParams.name= $("#name").val();
        objJsonParams.title= $("#tit").val();
        objJsonParams.content= $("#content").val();

        console.log("selectRtn : ",objJsonParams);

        //서비스 호출
        var objJsonReturn = $.callService(objJsonParams);

        console.log("objJsonReturn : ",objJsonReturn);
        // 그리드 그리는 함수 호출
       exBorad.getList();
        //결과값 반환
        // if(!objJsonReturn.getErrorFlag()){
        //     console.log("objJsonReturn: {}",objJsonReturn);
        //
        // } else {
        //     TwbMsg(objJsonReturn.getMsg(), "E");
        // }

        objJsonParams = null;	//전송파라메터소멸
        objJsonReturn = null;	//반환파라메터소멸
    },
    makeGrid:function (data) {
        if(data.length > 0){
            $("#exbo *").remove();
            //
            var imgList="";
            for (var i = 0; i < data.length; i++) {
                const element = data[i];
                imgList = "<tr>"
                    + "<td>"+element.num+"</td>"
                    + "<td><a href='#'>"+element.title+"</a></td>"
                    + "<td>"+element.name+"</td>"
                    + "<td>"+element.date+"</td>"
                    + "</tr>"
                $("#exbo").append(imgList)

            }

        }
    }
}