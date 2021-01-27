
$.extend({	/**
     * 비즈니스로직을 호출하여 처리 결과를 반환 받는다.
     * @param {String} objParams WebJson 구조의 파라메터
     * @param {boolean} blnAsync true:비동기처리방식, false:동기처리방식(미정의 시 false)
     * @param {String} strCallBackFunc 비동기처리방식일 경우 호출할 Call Back 함수명
     * @return 동기처리방식일 경우 WebJson 구조의 반환데이터, 비동기처리방식일 경우 내부적으로 strCallBackFunc을 호출하여 자동으로 반환
     */
    callService:function(objParams, blnAsync, strCallBackFunc) {
        gintRequestCnt++;

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
               $.showDocProgressBar();
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
                    if(gintRequestCnt > 0){gintRequestCnt--;}

                    //로딩바 제거
                    if(blnAsync === true){
                        $.showDocProgressBar(false);
                    }

                    if(obj !=  null){
                        if(typeof(obj.HEADER.COUNT) === "undefined"){obj.HEADER.COUNT = 0;}
                        if(typeof(obj.HEADER.TOT_COUNT) === "undefined"){obj.HEADER.TOT_COUNT = 0;}

                        objJsonReturn.setJsonObj(obj);

                        //악의적인 XSS 공격에 대비한 결과데이터 태그정보 치환
                        objJsonReturn.replaceXSSText();

                        if(blnAsync === true && typeof(strCallBackFunc) === "function"){
                            objJsonReturn.setCallBack(strCallBackFunc);
                        }

                        //위변조에 따른 페이지 강제이동
                        if(objJsonReturn.getHeaderKey("MD_CHECK_FAIL") == "true") { $.goMDFailPage(); return; }
                        //세션정보 소멸에 따른 페이지 강제이동
                        if(objJsonReturn.getHeaderKey("EXPIRE_SESSION") == "true") { $.goExpirePage("TWB"); return; }

                        var strSqlNameSpace = objJsonReturn.getHeaderKey("TWB_SQL_NAME_SPACE");
                        var strSqlId = objJsonReturn.getHeaderKey("TWB_SQL_ID");

                        //
                        if(typeof(strSqlNameSpace) !== "undefined" && strSqlNameSpace !== ""){
                            objParams.setHeaderKey("TWB_SQL_NAME_SPACE", strSqlNameSpace);
                        }
                        if(typeof(strSqlId) !== "undefined" && strSqlId !== ""){
                            objParams.setHeaderKey("TWB_SQL_ID", strSqlId);
                        }

                    }else{

                        objJsonReturn = new WebJson();
                        objJsonReturn.setHeaderKey("COUNT","0");
                        objJsonReturn.setHeaderKey("TOT_COUNT","0");
                        objJsonReturn.setHeaderKey("ERROR_FLAG",true);

                        objJsonReturn.setHeaderKey("ERROR_MSG", TWB_MSG.EXCEPTION_01);
                        if(G_SVR_SVC_MODE === "DEV"){
                            objJsonReturn.setHeaderKey("ERROR_MSG", "HEADER에  null 값이 리턴 되었습니다");
                        }
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

            if(gintRequestCnt > 0){gintRequestCnt--;}

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
    }
})