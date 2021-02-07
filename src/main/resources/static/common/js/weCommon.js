var G_BROWSER_INFO		= getBrowserInfo("KIND"); 					//브라우저 정보

//공통 메시지
var TWB_MSG = {
    FORM_NO_EXIST 			: "폼객체가 존재하지 않습니다."
    ,EXCEPTION_01 			: "현재 시스템에 장애가 발생했습니다. 잠시후 다시 처리해 주시기 바랍니다."
    ,FORM_ID_NO_EXIST 		: "폼객체 ID가 존재하지 않습니다."
    ,FORM_ACTION_NO_EXIST 	: "폼객체 Action 정보가 존재하지 않습니다."
    ,TAG_NO_EXIST 			: "태그가 존재하지 않습니다."
    ,TAGID_NO_EXIST 		: "태그ID가 존재하지 않습니다."
    ,TAGID_NAME_NO_EXIST 	: "태그 중에 id 또는 name\n속성이 정의되어 있지 않은 태그가 있습니다."
    ,DATA_NOT_INPUT_01 		: "[필수항목 입력 누락]\n아래와 같이 총 "
    ,DATA_NOT_INPUT_02 		: "건이 미입력 되었습니다.\n"
    ,DATA_OVER_LENGTH_01 	: "\n[입력값 길이초과]\n아래와 같이 총 "
    ,DATA_OVER_LENGTH_02 	: "건이 제한된 길이를 초과했습니다.\n"
    ,FROM_DATE_CONFIRM 		: "시작 일자를 정확하게 입력해 주시기 바랍니다."
    ,TO_DATE_CONFIRM 		: "종료 일자를 정확하게 입력해 주시기 바랍니다."
    ,FROM_TO_DATE_CONFIRM 	: "시작일자가 종료일자보다 클 수 없습니다."
    ,OVER_DAY_CONFIRM 		: "일을 초과(경과) 할 수 없습니다."
    ,OVER_MONTH_CONFIRM		: "개월을 초과(경과) 할 수 없습니다."
    ,WORK_GB_NO_EXIST 		: "디렉토리 구분자가 정의되어 있지 않습니다."
    ,FILE_INFO_NO_EXIST 	: "파일정보가 존재하지 않습니다."
    ,FILE_GROUP_KEY_NO_EXIST: "파일그룹키가 존재하지 않습니다."
    ,FILE_KEY_NO_EXIST 		: "파일키가 존재하지 않습니다."
    ,FILE_NAME_NO_EXIST 	: "파일명이 존재하지 않습니다."
    ,FILE_USER_NO_EXIST 	: "파일 전송자 정보가 없습니다."
    ,FILE_WORK_GB_NO_EXIST 	: "전송할 파일의 업무구분(WORK_GB) 정보가 없습니다."
    ,DUPLE_KEY_DATA_EXIST	: "중복된 데이터가 존재합니다."
    ,SELECT_OBJECT_NO_EXIST	: "선택된 항목이 존재하지 않습니다."
    ,CHECK_OBJECT_NO_EXIST	: "체크된 항목이 존재하지 않습니다."
    ,CHANGE_OBJECT_NO_EXIST	: "변경된 항목이 존재하지 않습니다."
    ,DUPLE_DEFINE_OBJECT    : "항목이 중복으로 정의되었습니다."
    ,WRONG_DATA_FORMAT		: "잘못된 입력입니다."
    ,EMPTY_DATA_FILL		: "필수 입력 항목입니다."
    ,TARGET_NO_EXIST		: "존재하지 않는 항목입니다."
    ,MAX_BYTE_NO_EXIST		: "최대 입력 BYTE수가 존재하지 않습니다."
};
/*********************************************************************************************
 ************** GLOBAL 변수 정의 종료************************************************************
 **********************************************************************************************/

//DOM객체 로드 이후에 호출되는 기본기능 정의
if((G_BROWSER_INFO === "MSIE" && ((!isNaN(getBrowserInfo("VER")) && parseInt(getBrowserInfo("VER"), 10) >= 9) || getBrowserInfo("VER") === "EDGE")) || document.addEventListener){
    window.addEventListener('DOMContentLoaded', function(){
        try{
            // G_SVR_SVC_MODE = $.getProperty("SERVICE_MODE", "DEV");
            //마우스 우클릭
            try{domReady();}catch(E){ console.log("domReady error=", E); }
            //화면이 전부 로드가 완료된 후처리 로직
            // try{winLoadComplete();}catch(E){ console.log("winLoadComplete error=", E); }

        }catch(E){ console.log("domReady error=", E); }
    });
}else{
    document.attachEvent("onreadystatechange", function(){
        if (document.readyState === "complete"){
            try{

            }catch(E){console.log("error=", E);}
            document.detachEvent("onreadystatechange", arguments.callee);
            //
            try{domReady();}catch(E){console.log("error=", E);}
            try{winLoadComplete();}catch(E){console.log("error=", E);}
        }
    });
}
$.extend({	/**
     * 비즈니스로직을 호출하여 처리 결과를 반환 받는다.
     * @param {String} objParams WebJson 구조의 파라메터
     * @param {boolean} blnAsync true:비동기처리방식, false:동기처리방식(미정의 시 false)
     * @param {String} strCallBackFunc 비동기처리방식일 경우 호출할 Call Back 함수명
     * @return 동기처리방식일 경우 WebJson 구조의 반환데이터, 비동기처리방식일 경우 내부적으로 strCallBackFunc을 호출하여 자동으로 반환
     */
    callService:function(objParams, blnAsync, strCallBackFunc) {
        //gintRequestCnt++;

        var objJsonReturn = {};
        try{
            var blnIsPage	= false;							//페이징처리적용여부


            if(typeof(blnAsync) === "undefined" || blnAsync !== true){blnAsync = false;}
            objParams.AsyncMode = blnAsync;
            if(blnAsync === true && typeof(strCallBackFunc) !== "undefined"){
                objParams.CallBack = strCallBackFunc;
            }

            //로딩바 생성
            if(blnAsync === true){
               $.showDocProgressBar(true);
            }

            var strURL = "/api/" + objParams.Service ;
            strURL = strURL.replace(/(\/\/)|[\.]/g, "/");
            objParams.CallType = "BIZ_SERVICE";
            objParams.URL =strURL;


            //파라메터다이제스트 생성
            // objParams.replaceXSSTextForRequest();
            // var arrayDataInfo = $.getKeyListDataList(objParams);
            // objParams.setHeaderKey("MD_KEY_LIST", arrayDataInfo[0]);
            // objParams.setHeaderKey("MD_DATA_LIST", Hash.encryptMD5(arrayDataInfo[1]));

            $.ajax({
                type:"POST",
//				contentType: "application/json",
                url: objParams.URL,
                data: objParams,
                dataType:"json",
                async: blnAsync,
                beforeSend :function(xhr){
                    //X-CSRF-TOKEN
                    // xhr.setRequestHeader($("meta[name='_csrf_header']").attr('content'), $("meta[name='_csrf']").attr('content'));
                    /*
                    if($("meta[name='_csrf']").attr('content') == undefined){
                        xhr.setRequestHeader("1", "1");
                    } else {
                        xhr.setRequestHeader($("meta[name='_csrf_header']").attr('content'), $("meta[name='_csrf']").attr('content'));
                    }
                    */
                },
                success:function(obj){
                    //if(gintRequestCnt > 0){gintRequestCnt--;}

                    //로딩바 제거
                    if(blnAsync === true){
                        $.showDocProgressBar(false);
                    }

                    if(obj !=  null){
                        if(typeof(obj.HEADER.COUNT) === "undefined"){obj.HEADER.COUNT = 0;}
                        if(typeof(obj.HEADER.TOT_COUNT) === "undefined"){obj.HEADER.TOT_COUNT = 0;}

                        objJsonReturn.JsonObj=obj;


                        if(blnAsync === true && typeof(strCallBackFunc) === "function"){
                            objJsonReturn.CallBack(strCallBackFunc);
                        }

                    }else{

                        // objJsonReturn = new WebJson();
                        // objJsonReturn.setHeaderKey("COUNT","0");
                        // objJsonReturn.setHeaderKey("TOT_COUNT","0");
                        // objJsonReturn.setHeaderKey("ERROR_FLAG",true);
                        objJsonReturn.COUNT = "0";
                        objJsonReturn.TOT_COUNT ="0"
                        objJsonReturn.ERROR_FLAG = true ;
                        objJsonReturn.ERROR_MSG = TWB_MSG.EXCEPTION_01;


                    }

                    //그리드가 세팅되어있으면 요청정보를 그리드 오브젝트에 세팅해준다.
                    //추후 페이징이나 스크롤append 처리 시 동일한 요청정보로 재사용하기 위해.
                    if(blnIsGrid === true){$("#" + strGridId).setReqData(objParams);}

                    if(blnAsync === true){
                        try{eval(strCallBackFunc + "(objJsonReturn);");}catch(E){console.log("error=", E);}
                    }else if(blnIsGrid === true){
                        $("#" + strGridId).loadGridData(objJsonReturn);
                    }
                    objParams		= null;
                    obj				= null;
                    strSqlNameSpace = null;
                    strSqlId 		= null;
                },
                error:function(e){

                    if(gintRequestCnt > 0){gintRequestCnt--;}

                    objJsonReturn.setJsonObj(e.responseJSON);

                    //세션정보 소멸에 따른 페이지 강제이동
                    if(objJsonReturn.isContainKey("EXPIRE_SESSION", "HEADER") && objJsonReturn.getHeaderKey("EXPIRE_SESSION") == true)
                    {
                        var errorMsg =objJsonReturn.getHeaderKey("ERROR_MSG");

                        var option ={
                            backdrop: false,
                            buttons: {},
                            close: true,
                            esc: true,
                            hspace: 20,
                            interval: 0,
                            margin: 20,
                            maxheight: null,
                            message: errorMsg,
                            placeholder: "",
                            position: "cc",
                            theme: "",
                            title: "<i class='alert-icon is-warning'></i><h1>SESSION 알림!</h1>",
                            type: "alert",
                            vspace: 15,
                            width: null,
                            callback: function(respond){
                                $.goExpirePage("TWB");
                            }
                        }
                        top.$.alert(option);
                        return;
                    }

                    //로딩바 제거
                    if(blnAsync === true){
                        if(blnIsGrid === true){$("#" + strGridId).showGridProgressBar(false);}
                        else{$.showDocProgressBar(false);}
                    }

                    objJsonReturn.setHeaderKey("ERROR_FLAG",true);
                    if(typeof(e) === "object"){
                        objJsonReturn.setHeaderKey("ERROR_MSG", TWB_MSG.EXCEPTION_01);
                        if(G_SVR_SVC_MODE === "DEV"){
                            objJsonReturn.setHeaderKey("ERROR_MSG", $.toJSON(e));
                        }
                    }else{
                        objJsonReturn.setHeaderKey("ERROR_MSG", TWB_MSG.EXCEPTION_01);
                        if(G_SVR_SVC_MODE === "DEV"){
                            objJsonReturn.setHeaderKey("ERROR_MSG", e);
                        }
                    }
                    if(blnAsync === true){
                        try{eval(strCallBackFunc + "(objJsonReturn);");}catch(E){console.log("error=", E);}
                    }
                },complete:function(){
                }
            });
        } catch(e){

            // if(gintRequestCnt > 0){gintRequestCnt--;}

            //로딩바 제거
            if(blnAsync === true){
                if(blnIsGrid === true){$("#" + strGridId).showGridProgressBar(false);}
                else{$.showDocProgressBar(false);}
            }

            objJsonReturn.setHeaderKey("ERROR_FLAG", true);

            if(typeof(e) === "object"){
                objJsonReturn.setHeaderKey("ERROR_MSG", TWB_MSG.EXCEPTION_01);
                if(G_SVR_SVC_MODE === "DEV"){
                    //objJsonReturn.setHeaderKey("ERROR_MSG", $.toJSON(e));GS 인증관련 제거
                    objJsonReturn.setHeaderKey("ERROR_MSG", TWB_MSG.EXCEPTION_01);
                }
            }else{
                objJsonReturn.setHeaderKey("ERROR_MSG", TWB_MSG.EXCEPTION_01);
                if(G_SVR_SVC_MODE === "DEV"){
                    //objJsonReturn.setHeaderKey("ERROR_MSG", e);GS 인증관련 제거
                    objJsonReturn.setHeaderKey("ERROR_MSG", TWB_MSG.EXCEPTION_01);
                }
            }

            //콜백함수 호출
            if(blnAsync === true){
                try{eval(strCallBackFunc + "(objJsonReturn);");}catch(E){console.log("error=", E);}
            }


        }

        return objJsonReturn;
    },
    showDocProgressBar:function(blnDoShow, strProcTitle){
        if(typeof(blnDoShow) === "undefined"){blnDoShow = true;}
        try{
            if(!blnDoShow){
                //if(gintRequestCnt == 0){
                    $("#preloder").fadeOut("fast");
                    // $(".tt-loader").fadeOut("fast");
                    // $("body > .tt-loader").remove();
                //}
            }else{
                //if(gintRequestCnt == 1){
                    $("#preloder").fadeIn("fast");
                    // $("body").append('<div class="tt-loader"><span></span></div>');
                    // $(".tt-loader").fadeIn("fast");
               // }
            }
        }catch(e){console.log("error=", e);}

    }
})

/**
 * 구분에 따라 브라우저 정보를 반환한다.
 * @param strCase : 구분:KIND:브라우저종류, VER:버전
 * @returns 구분에 따른 브라우저 정보
 * @author MPC R&D Team
 */
function getBrowserInfo(strCase){
    if(typeof(strCase) === "undefined"){strCase = "KIND";}
    var strRetVal		= "";
    var strKind			= "";
    var strUserAgent	= new String(window.navigator.userAgent.toUpperCase());

    if(strUserAgent.indexOf("CHROME") >= 0 && strUserAgent.indexOf("EDGE") < 0){
        strKind	= "CHROME";
    }else if(strUserAgent.indexOf("FIREFOX") >= 0){
        strKind	= "FIREFOX";
    }else if(strUserAgent.indexOf("OPERA") >= 0){
        strKind	= "OPERA";
    }else if(strUserAgent.indexOf("MSIE") >= 0 || strUserAgent.indexOf("TRIDENT") >= 0 || strUserAgent.indexOf("EDGE") >= 0){
        strKind	= "MSIE";
    }else if(strUserAgent.indexOf("SAFARI") >= 0 && strUserAgent.indexOf("EDGE") < 0){
        strKind	= "SAFARI";
    }else if(strUserAgent.indexOf("KONQUEROR") >= 0 && strUserAgent.indexOf("EDGE") < 0){
        strKind	= "KONQUEROR";
    }

    switch (strCase){
        case "KIND"	: strRetVal = strKind; break;
        case "VER"	:
            var strVersion		= "";
            var intStartPoint	= 0;
            //브라우저 버전
            if(strKind === "MSIE"){
                if(window.XMLHttpRequest == null && strUserAgent.indexOf("MSIE") >= 0){
                    strVersion	= "6";
                }else if(strUserAgent.indexOf("MSIE 7.0") >= 0 && strUserAgent.indexOf("TRIDENT") < 0){
                    strVersion	= "7";
                }else if(strUserAgent.indexOf("MSIE 8.0") >= 0 && strUserAgent.indexOf("TRIDENT") >= 0){
                    strVersion	= "8";
                }else if(strUserAgent.indexOf("MSIE 9.0") >= 0 && strUserAgent.indexOf("TRIDENT") >= 0){
                    strVersion	= "9";
                }else if(strUserAgent.indexOf("MSIE 10.0") >= 0 && strUserAgent.indexOf("TRIDENT") >= 0 && window.navigator.pointerEnabled != true){
                    strVersion	= "10";
                }else if(strUserAgent.indexOf("TRIDENT") >= 0 && window.navigator.pointerEnabled == true){
                    strVersion	= "11";
                }else if(strUserAgent.indexOf("EDGE") >= 0){
                    strVersion	= "EDGE";
                }
            }else if(strKind === "FIREFOX"){
                intStartPoint	= strUserAgent.indexOf(strKind) + 8;
                strVersion		= strUserAgent.substring(intStartPoint);
            }else if(strKind === "CHROME"){
                intStartPoint	= strUserAgent.indexOf(strKind) + 7;
                intEndPoint		= strUserAgent.indexOf(" ", intStartPoint);
                strVersion		= strUserAgent.substring(intStartPoint, intEndPoint);
            }else if(strKind === "SAFARI" || strKind === "KONQUEROR"){
                intStartPoint	= strUserAgent.indexOf(strKind) + 7;
                strVersion		= strUserAgent.substring(intStartPoint);
            }
            strRetVal = strVersion;
            break;
        default:
            break;
    };

    return strRetVal;
}