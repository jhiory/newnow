/*********************************************************************************************
************** GLOBAL 변수 정의 ***************************************************************
**********************************************************************************************/
//공통 상수 정의
var $ = namo$;
var G_SVR_SVC_MODE		= "DEV";									//서버 운영모드(서버의 설정과 동기화 시켜줘야 한다.)
var G_BROWSER_INFO		= getBrowserInfo("KIND"); 					//브라우저 정보
var G_HEADER			= "HEADER";									//WebJson 파라메터 객체에 쓰이는 HEADER부 상수
var G_DATA				= "DATA";									//WebJson 파라메터 객체에 쓰이는 DATA부 상수(기본 데이터셋)
var G_TOP_MAIN_NAME		= "TwbMain"; 						//로그인 후 최초 로드되는 최상단 메인페이지 파일명
var ENTER_EVENT			= 13;										//엔터키 keyCode 상수

var csrf = "";

//팝업창을 관리하는 object
var winPopObj = [];													//팝업창 윈도우객체 배열
var winPopNM = [];													//팝업창 윈도우객체 고유명 배열

//CTI 상태
var CTI_INFO = {
		strState: ""				// 전화기 상태정보
		,strCnslId : ""				// 상담이력 정보저장
		,strCallMode : ""			// 인아웃바운드 구분
		,strRecKey : ""				// 녹취키 
		,strConferenceCancle: ""	// 3자통화 고객취소여부
		,strTransSucess : ""		// 2자전환 완료여부
};

// UEI 데이터 정보
var UEI_INFO = {
		strInboundNum : ""				// 인입번호
		,inboundInputType : ""			// 인입경로
		,inboundLangNum : ""			// 언어권번호
		,inboundLangNm : ""				// 언어권이름
};


//CRUD 구분 상수
var TWB_CONST = {
	 TRANS_NONE				: "N"									//트랜잭션이 없는 상태
	,TRANS_INS 				: "I"									//신규모드
	,TRANS_UPD 				: "U"									//업데이트모드
	,TRANS_DEL 				: "D"									//삭제모드
	,IMG_LIST 				: "GIF,JPG,PNG,BMP,PCX"					//이미지파일리스트
};

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

//UI 컨트롤 위한 특정 element를 담아둘 객체
var gobjActiveElement		= null;
var gobjDhxWindow			= null;							//dhx window dialog 객체
var gobjParkedDhxWindow		= [];							//접혀있는 dhx window dialog 객체
var gobjActiveDhxCalendar	= [];							//활성화 dhx calendar 객체
var gobjActiveDhxCombo		= [];							//활성화 dhx combo 객체
var gintRequestCnt			= 0;							//서버 요청 count
var gobjDhxMsgPop			= null;							//전역에서 사용되는 dhtmlx popup 기능 이용한 메시지 박스객체
var gobjDhxDayCalendar		= null;
var gobjDhxMonthCalendar	= null;
var gobjDhxTimeCalendar		= null;
var gobjActiveDhxContext	= [];
/*********************************************************************************************
************** GLOBAL 변수 정의 종료************************************************************
**********************************************************************************************/

//DOM객체 로드 이후에 호출되는 기본기능 정의
if((G_BROWSER_INFO === "MSIE" && ((!isNaN(getBrowserInfo("VER")) && parseInt(getBrowserInfo("VER"), 10) >= 9) || getBrowserInfo("VER") === "EDGE")) || document.addEventListener){
	window.addEventListener('DOMContentLoaded', function(){
		try{
			// G_SVR_SVC_MODE = $.getProperty("SERVICE_MODE", "DEV");
			//팝업 화면일 시 자동 사이즈 조절
			$.setPopupWindowInit();
			//데이터 validation 및 알림 메시지 박스 객체생성
			$.initDhxMsgPop();
			//콤보박스 로드
			$.drawComboBox();
			//체크박스 및 라디오버튼 로드
			$.drawCheckAndRadio();
			//datepicker 설정
			$.setDefaultDatepickerConfig(document.body, true);
			//윈도우창 리사이즈 이벤트 발생 시 확장로직 정의
			$.setExtendWinResize();
			//클릭 이벤트 발생 시 확장로직 정의
			$.setExtendClickFn();
			//마우스 우클릭 기능 제어
			$.setAvailableRightClick(G_SVR_SVC_MODE === "DEV" ? true : false);
			//새로고침 및 뒤로가기 기능 제어 (F5, Ctrl+R)
			$.setAvailableRefresh(G_SVR_SVC_MODE === "DEV" ? true : false);
			//input type text 엘리먼트 클릭 시 값 자동 전체선택 기능
			$.setAutoSelectWithFocus(true);
			//readonly처리된 input text필드 class정의
			$.setTxtInputReadonly();
			//Document에 디자인된 모든 컨트롤 오브젝트에 대한 Class 기준 포맷 설정
			$.setClassFormats();
			//페이지 전체 덮고있는 투명 레이어 생성
			$(document.body).append('<div id="wrap-cover" style="position:absolute; width:100%; height:100%; z-index:10000 !important; background-color:#FFF; opacity:.45; filter:alpha(opacity=45); display:none;"></div>');
			
			try{domReady();}catch(E){ console.log("domReady error=", E); }
			//화면이 전부 로드가 완료된 후처리 로직
			// try{winLoadComplete();}catch(E){ console.log("winLoadComplete error=", E); }
			
		}catch(E){ console.log("domReady error=", E); }
	});
}else{
	document.attachEvent("onreadystatechange", function(){
		if (document.readyState === "complete"){
			try{
				// G_SVR_SVC_MODE = $.getProperty("SERVICE_MODE", "DEV");
				//팝업 화면일 시 자동 사이즈 조절
				$.setPopupWindowInit();
				//데이터 validation 및 알림 메시지 박스 객체생성
				$.initDhxMsgPop();
				//콤보박스 로드
				$.drawComboBox();
				//체크박스 및 라디오버튼 로드
				$.drawCheckAndRadio();
				//datepicker 설정
				$.setDefaultDatepickerConfig(document.body, true);
				//윈도우창 리사이즈 이벤트 발생 시 확장로직 정의
				$.setExtendWinResize();
				//클릭 이벤트 발생 시 확장로직 정의
				$.setExtendClickFn();
				//마우스 우클릭 기능 제어
				$.setAvailableRightClick(true);
				//새로고침 및 뒤로가기 기능 제어 (F5, Ctrl+R)
				$.setAvailableRefresh(false);
				//input type text 엘리먼트 클릭 시 값 자동 전체선택 기능
				$.setAutoSelectWithFocus(true);
				//readonly처리된 input text필드 class정의
				$.setTxtInputReadonly();
				//Document에 디자인된 모든 컨트롤 오브젝트에 대한 Class 기준 포맷 설정
				$.setClassFormats();
				//페이지 전체 덮고있는 투명 레이어 생성
				$(document.body).append('<div id="wrap-cover" style="position:absolute; width:100%; height:100%; z-index:10000 !important; background-color:#FFF; opacity:.45; filter:alpha(opacity=45); display:none;"></div>');
			}catch(E){console.log("error=", E);}
			document.detachEvent("onreadystatechange", arguments.callee);
			//
			try{domReady();}catch(E){console.log("error=", E);}
			try{winLoadComplete();}catch(E){console.log("error=", E);}
		}
	});
}

//jQuery Extends 정의
$.fn.extend({
	/**
	 * jquery의 val 함수를 확장해서 Teleweb Framework에서 재 정의함
	 * 값을 설정할 경우 class에 포맷이 설정되어 있을 경우 포맷을 적용하여 설정한다.
	 * 값을 반환할 경우 class의 포맷을 제거하고 값만 반환한다.
	 * @param {String} strVal 설정할 값
	 * @param {boolean} blnValidate 포맷팅 규약에 어긋나는 값일 시 빈값으로 세팅여부
	 * @return set기능일 경우 없음, get기능일 경우 포맷이 제거된 데이터만 반환함
	 * @author MPC R&D Team 
	 */
	valExt:function(strVal, blnValidate){
		if(typeof(blnValidate) === "undefined"){blnValidate = false;}
		if(typeof(strVal) === "undefined"){
			if($(this).length > 1){
				var strRetVal = "";
				$(this).each(function(idx){
					if($(this).hasClass("twbRadio") && $(this).is(":checked")){
						strRetVal = $(this).val();
						return false;
					}
				});
				return strRetVal;
			}else{
				//포맷을 제거하고 값을 반환한다.
				return $.trim($.getClassFormatData(this));
			}
		}else{
			
			var objElement = this;
			strVal =  $.restoreXSS($.trim(strVal));
			
			if($(objElement).prop("tagName") === "SPAN"){
				//값이 존재할 경우 해당 값의 포맷을 설정한다.
				$(this).text(strVal);
			}else{
				//값이 존재할 경우 해당 값의 포맷을 설정한다.
				if($(objElement).hasClass("twbCheckbox")){
					if(strVal === ""){
						$(objElement).iCheck("uncheck");
					}else{
						if($(objElement).val() == strVal){
							$(objElement).iCheck("check");
						}else{
							$(objElement).iCheck("uncheck");
						}
					}
				}else if($(objElement).hasClass("twbRadio")){
					$(objElement).each(function(){
						if($(this).val() === strVal){
							$(this).iCheck("check");
						}else{
							$(this).iCheck("uncheck");
						}
					});
				}else if(!$(objElement).hasClass("twbCombo")){
					if($(objElement).prop("type") === "select-multiple"){
						$(objElement).val(strVal.split(","));
					}else if($(objElement).prop("tagName") === "TEXTAREA"){
						$(objElement).val(strVal);
					}else{
						$(objElement).val(strVal);
						if($(objElement).attr("class") != null){
							if($(objElement).attr("class").indexOf("picker") >= 0){
								$(objElement).attr("preValue", strVal.replace(/[^0-9]/g, ""));
							}
						}
					}
				}
				if($(objElement).hasClass("twbCombo")){
					$(objElement).val(strVal);
					
					var objDhxCombo = null;
					$(objElement).each(function(){
						objDhxCombo = this.dhxCombo;
					});
					
					if(typeof(objDhxCombo) !== "undefined" && objDhxCombo != null){
						var _strText = "";
						
						//프로그램으로 접근상태 on
						$(objElement).attr("program_change", true);
						
						if(typeof($(objElement).attr("multiple")) !== "undefined"){
							var objData = null;
							if(typeof(strVal) === "string"){
								objData = strVal.split(",");
							}else{
								objData = strVal;
							}
							
							var _opLen = 0;
							var _checkedLen = 0;
							objDhxCombo.forEachOption(function(optId){
								_opLen++;
								objDhxCombo.setChecked(optId.index, false);
								if(objData.length > 0){
									for(var i = 0; i < objData.length; i++){
										if(objData[i] !== ""){
											if(objData[i] === optId.value){
												_strText += optId.text + ",";
												objDhxCombo.setChecked(optId.index, true);
												_checkedLen++;
												break;
											}
										}
									}
								}
							});
							if(_strText != ""){_strText = _strText.substr(0, _strText.length-1);}
							if(_opLen-1 == _checkedLen){
								_strText = "전체선택";
								objDhxCombo.setChecked(0, true);
							}
							
							$(objElement).val(objData);
							
							$(objElement).attr("preValue", $(objElement).val());
						}else{
							var objOption = objDhxCombo.getOption(strVal);
							if(objOption == null){objOption = objDhxCombo.getOptionByIndex(0);}
							if(typeof(objOption) !== "undefined" && objOption != null && objOption !== ""){
								$(objElement).val(objOption.value);
								_strText = objOption.text;
								objDhxCombo.selectOption(objOption.index);
							}
						}
						
						$(objDhxCombo.getBase()).find(".twbCombo_selected").text(_strText);
						
						//프로그램으로 접근상태 off
						$(objElement).attr("program_change", false);
						
						_strText = null;
						objDhxCombo = null;
					}
				}
				//포맷을 설정한다.
				if(strVal !== ""){
					$.setClassFormatData(objElement, blnValidate);
				}
			}
			
			objElement = null;
		}
	},
	
	/**
	 * jquery 함수를 확장해서 dhtmlx window 컴포넌트를 이용한 dialog 생성
	 * @param {Object} option 설정할 값
	 * @return 없음 
	 * @author MPC R&D Team 
	 */
	dhxWindow:function(option){
		var objThis = this;
		if(typeof(option.id)		=== "undefined" || option.id === ""){option.id = $(this).attr("id");}
		if(typeof(option.modal)		=== "undefined"){option.modal	= false;}
		if(typeof(option.left)		=== "undefined"){option.left	= "";}
		if(typeof(option.top)		=== "undefined"){option.top	= "";}
//		if(typeof(option.width)		=== "undefined"){option.width	= $(this).width() + 4;}
//		if(typeof(option.height)	=== "undefined"){option.height	= $(this).height() + 2;}
//		if(typeof(option.buttons)	!== "undefined"){option.height	= option.height + 32;}
		if(typeof(option.text)		=== "undefined"){option.text	= "다이얼로그 팝업";}
		//if(typeof(option.icon)		=== "undefined"){option.icon	= "icon-window-restore";}
		if(typeof(option.icon)		=== "undefined"){option.icon	= ""}
		else{option.icon	= ""}
//		option.icon = "<i class='icon-2x " + option.icon + "' style='vertical-align:-4px;'></i>";
		
		var objButtonArry = [];
		if(typeof(option.buttons) !== "undefined" && option.buttons.length > 0){
			for(var i = 0; i < option.buttons.length; i++){
				if(typeof(option.buttons[i].icon) === "undefined"){
					//option.buttons[i].icon = "icon-save";
					option.buttons[i].icon = "";
				}
				else{option.buttons[i].icon = "";}
				//option.buttons[i].icon = "<i class='icon-2x " + option.buttons[i].icon + "' style='margin-top:-1px;'></i>";
				
				
				if(typeof(option.buttons[i].btn_class) === "undefined") {
					if(typeof(option.buttons[i].text) != "undefined") {
						option.buttons[i].btn_class="<button type='button' id= '"+option.buttons[i].id+"' name= '"+option.buttons[i].id+"' class='tt-btn is-md is-main'>"+option.buttons[i].text+"</button>";
					}
				}
				else {
					if(typeof(option.buttons[i].text) != "undefined") {
						option.buttons[i].btn_class="<button type='button' id= '"+option.buttons[i].id+"' name= '"+option.buttons[i].id+"' class='tt-btn is-md "+option.buttons[i].btn_class+"'>"+option.buttons[i].text+"</button>";
					}
				}
				
				objButtonArry.push(option.buttons[i]);
			}
		}
		//objButtonArry.push({id:"btnClose" + option.id, icon:"<i class='icon-2x icon-close' style='margin-top:-2px;'></i>", text:"닫 기", click:function(){$(objThis).closeDhxWindow();}});
		if(gobjDhxWindow == null){
			gobjDhxWindow = new dhtmlXWindows({viewport:{object:document.body}});
			gobjDhxWindow.setSkin("material");
		}
		//var _win = gobjDhxWindow.createWindow(option.id, "", "", option.width, option.height);
		var _win = gobjDhxWindow.createWindow(option.id, option.left, option.top, option.width, option.height);
		_win.base = $(_win.cell).parent();
		_win.setText(option.icon + option.text);
		_win.center();
		$("#" + option.id).wrap("<div id='" + option.id + "_DHXWINDOW' style='display:none;'></div>");
		$("<div id='" + option.id + "_BUTTON'></div>").insertAfter("#" + option.id);
		_win.attachObject(option.id + "_DHXWINDOW");
		_win.hide();
		$("#" + option.id).css("display", "");
		var objToolbar = new dhtmlXToolbarObject({
			parent		: option.id + "_BUTTON",
			icon_path	: "/resources/js/dhtmlxSuite_v51/codebase/icon/material/"
			//align		: "right"
		});
		objToolbar.setSkin("material");
		for(var i = 0; i < objButtonArry.length; i++){
//			objToolbar.addButton(objButtonArry[i].id, i, objButtonArry[i].icon + "&nbsp;" + objButtonArry[i].text);
			objToolbar.addButton(objButtonArry[i].id, i, objButtonArry[i].btn_class);
		}
		objToolbar.attachEvent("onClick", function(strId){
			for(var i = 0; i < objButtonArry.length; i++){
				if(objButtonArry[i].id === strId){
					objButtonArry[i].click.call('');
					break;
				}
			}
		});
		_win.attachEvent("onShow", function(objDhxWin){
			objDhxWin.bringToTop();
			objDhxWin.center();
			if(typeof(option.left) !== "undefined" && typeof(option.top) !== "undefined"
				&& option.left !== "" && option.top !== "") {
				objDhxWin.setPosition(option.left,option.top);
			}
			if(option.modal === true){
				objDhxWin.setModal(true);
			}
			if(typeof(option.open) !== "undefined" && typeof(option.open) === "function"){
				option.open.call("");
			}
		});
		_win.attachEvent("onHide", function(objDhxWin){
			objDhxWin.setModal(false);
			if(objDhxWin.isParkable() && objDhxWin.isParked()){
				$(objDhxWin.base).css("width", option.width + "px");
				objDhxWin.button("help").hide();
				objDhxWin.button("minmax").show();
				objDhxWin.allowMove();
				objDhxWin.setText(option.text);
				objDhxWin.center();
				var intMoveIdx = -1;
				var currPos = null;
				for(var i = 0; i < gobjParkedDhxWindow.length; i++){
					if(gobjParkedDhxWindow[i] == objDhxWin){
						gobjParkedDhxWindow.splice(i,1);
						intMoveIdx = i;
						break;
					}
				}
				if(intMoveIdx != -1){
					for(var j = intMoveIdx; j < gobjParkedDhxWindow.length; j++){
						currPos = gobjParkedDhxWindow[j].getPosition();
						gobjParkedDhxWindow[j].setPosition(currPos[0]-155, currPos[1]);
					}
				}
				objDhxWin.park();
			}
			if(typeof(option.close) !== "undefined" && typeof(option.close) === "function"){
				option.close.call("");
			}
		});
		_win.attachEvent("onClose", function(objDhxWin){
			objDhxWin.minimize();
			objDhxWin.hide();
		});
		_win.attachEvent("onParkDown", function(objDhxWin){
			objDhxWin.button("help").hide();
			objDhxWin.button("minmax").show();
			objDhxWin.allowMove();
			objDhxWin.setText(option.icon + option.text);
			objDhxWin.center();
			var intMoveIdx = -1;
			var currPos = null;
			for(var i = 0; i < gobjParkedDhxWindow.length; i++){
				if(gobjParkedDhxWindow[i] == objDhxWin){
					gobjParkedDhxWindow.splice(i,1);
					intMoveIdx = i;
					break;
				}
			}
			if(intMoveIdx != -1){
				for(var j = intMoveIdx; j < gobjParkedDhxWindow.length; j++){
					currPos = gobjParkedDhxWindow[j].getPosition();
					gobjParkedDhxWindow[j].setPosition(currPos[0]-155, currPos[1]);
				}
			}
		});
		_win.attachEvent("onParkUp", function(objDhxWin){
			$(objDhxWin.base).css("width", "155px");
			if(top.document.location.href.indexOf("TwbMain") >= 0){
				objDhxWin.setPosition(155*(gobjParkedDhxWindow.length), top.$(document.body).height()-78);
			}else{
				objDhxWin.setPosition(155*(gobjParkedDhxWindow.length), top.$(document.body).height()-48);
			}
			objDhxWin.setText(option.icon);
			objDhxWin.button("minmax").hide();
			objDhxWin.button("help").show();
			objDhxWin.denyMove();
			gobjParkedDhxWindow.push(objDhxWin);
		});
		_win.attachEvent("onHelp", function(objDhxWin){
			var objDhxPop = new dhtmlXPopup();
			objDhxPop.attachHTML(option.text);
			
			var x = $(objDhxWin.base).offset().left; // returns left position related to window
	        var y = $(objDhxWin.base).offset().top; // returns top position related to window
	        var w = $(objDhxWin.base).width();
	        var h = $(objDhxWin.base).height();
	        
	        objDhxPop.show(x, y, w, h);
	        
	        setTimeout(function(){
	        	objDhxPop.unload();
	        	objDhxPop = null;
	        	objDhxWin.button("help").enable();
	        }, 3000);
	        
	        x = null;
	        y = null;
	        w = null;
	        h = null;
	        
	        objDhxWin.button("help").disable();
		});
		_win.attachEvent("onMinimize", function(objDhxWin){
			if(typeof(option.onResizeDialog) === "function"){
				option.onResizeDialog.call("");
			}
		    return true;
		});
		_win.attachEvent("onMaximize", function(objDhxWin){
			if(typeof(option.onResizeDialog) === "function"){
				option.onResizeDialog.call("");
			}
		    return true;
		});
		_win.attachEvent("onResizeFinish", function(objDhxWin){
			if(typeof(option.onResizeDialog) === "function"){
				option.onResizeDialog.call("");
			}
		    return true;
		});
		//정의한 그리드 object를 DOM객체에 attribute 추가
		return this.each(function(){
			this.option = option;
			this.dhxWindow = gobjDhxWindow;
			this._win = _win;
			this.dhxToolbar = objToolbar;
		});
	},
	
	/**
	 * jquery 함수를 확장해서 dhtmlx window 컴포넌트를 이용하여 생성한 dialog 열기
	 * @return 없음 
	 * @author MPC R&D Team 
	 */
	openDhxWindow:function(){
		var objDhxWindow	= null;
		var option			= null;
		var _win			= null;
		this.each(function(){
			objDhxWindow	= this.dhxWindow;
			option			= this.option;
			_win			= this._win;
		});
		if(typeof(objDhxWindow) === "undefined"){return;}
		_win.show();
		
		objDhxWindow		= null;
		option				= null;
		_win				= null;
	},
	
	/**
	 * jquery 함수를 확장해서 dhtmlx window 컴포넌트를 이용하여 생성한 dialog 닫기
	 * @return 없음 
	 * @author MPC R&D Team 
	 */
	closeDhxWindow:function(){
		var objDhxWindow	= null;
		var option			= null;
		var _win			= null;
		this.each(function(){
			objDhxWindow	= this.dhxWindow;
			option			= this.option;
			_win			= this._win;
		});
		if(typeof(objDhxWindow) === "undefined"){return;}
		_win.minimize();
		_win.hide();
		
		objDhxWindow		= null;
		option				= null;
		_win				= null;
	}
});


$.extend({
	
	
//#####################################################################################################################################################################################
//############     DOM객체 로드 이후 호출되는 기본기능 정의            ############################################################################################################################
//#####################################################################################################################################################################################
	
	//윈도우창 리사이즈 이벤트 발생 시 확장로직 정의
	setExtendWinResize:function(){
		$(window).on("resize", function(){
			//메인화면 dhtmlx Tab 리사이즈 이벤트 호출
			if(document.location.href.indexOf("TwbMain") >= 0){
				var objTab = null;
				$("#div_main").each(function(){
					objTab = this.dhxTabs;
				});
				if(typeof(objTab) !== "undefined" && objTab != null){
					objTab.setSizes();
				}
				objTab = null;
			}
			//dhtmlx Combo 리사이즈 및 위치 조정
			if(gobjActiveDhxCombo.length > 0){
				$(gobjActiveDhxCombo[0].getList()).css("width", ($(gobjActiveDhxCombo[0].getBase()).width()) + 8);
				$(gobjActiveDhxCombo[0].getList()).css("left", $(gobjActiveDhxCombo[0].getBase()).offset().left);
			}
		});
	},
	//클릭 이벤트 발생 시 확장로직 정의
	setExtendClickFn:function(objTarget){
		if(typeof(objTarget) === "undefined"){objTarget = document;}
		$(objTarget).on("click", function(e){
			//자동으로 활성화되어있는 dhtmlx 컴포넌트 오브젝트들을 닫아준다.
			$.closingActiveDhxComponent(e);
		});
	},
	
	initDhxMsgPop:function(){
		if(gobjDhxMsgPop == null){
			gobjDhxMsgPop = new dhtmlXPopup();
			gobjDhxMsgPop.attachEvent("onShow", function(){
				setTimeout(function(){
					gobjDhxMsgPop.hide();
				}, 3000);
			});
			gobjDhxMsgPop.attachEvent("onBeforeHide", function(type, ev, id){
			    return false;
			});
		}
	},
	
	//달력 한글화 및 input 스타일 조정, 버튼생성
	setDefaultDatepickerConfig:function(objParent, blnInit){
		try{
			if(typeof(blnInit) === "undefined"){blnInit = false;}
			//최초 dhtmlx 달력 object 생성
			if(blnInit){
				dhtmlXCalendarObject.prototype.langData["kr"] = {
				    dateformat: '%Y/%m/%d',
				    monthesFNames: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
				    monthesSNames: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
				    daysFNames: ["일","월","화","수","목","금","토"],
				    daysSNames: ["일","월","화","수","목","금","토"],
				    weekstart: 0,
				    weekname: "주",
				    today: "오늘",
				    clear: "초기화"
				};
				//일 선택 달력 form 생성
				gobjDhxDayCalendar = new dhtmlXCalendarObject();
				gobjDhxDayCalendar.loadUserLanguage("kr");
				gobjDhxDayCalendar.setSkin("material");
				strCurrDay = gobjDhxDayCalendar.getFormatedDate("%Y/%m/%d", new Date());
				gobjDhxDayCalendar.hideTime();
				gobjDhxDayCalendar.showToday();
				
				gobjDhxDayCalendar.attachEvent("onShow", function(){
					if($(gobjDhxDayCalendar.baseInput).hasClass("twbDisabled")){
						gobjDhxDayCalendar.hide();
					}else{
						if(!$(gobjDhxDayCalendar.baseInput).hasClass("active_element")){
							$(gobjDhxDayCalendar.baseInput).addClass("active_element");
						}
						$(gobjDhxDayCalendar.baseInput).attr("preValue", $(gobjDhxDayCalendar.baseInput).valExt());
						if(date_onCheck($(gobjDhxDayCalendar.baseInput).valExt(), "") === ""){
							gobjDhxDayCalendar.setDate(strCurrDay);
						}else{
							gobjDhxDayCalendar.setDate(date_onCheck($(gobjDhxDayCalendar.baseInput).valExt(), ""));
						}
						gobjActiveDhxCalendar.push(gobjDhxDayCalendar);
					}
				});
				gobjDhxDayCalendar.attachEvent("onHide", function(){
					$(gobjDhxDayCalendar.baseInput).removeClass("active_element");
					if($(gobjDhxDayCalendar.baseInput).attr("preValue") != $(gobjDhxDayCalendar.baseInput).valExt()){
						$(gobjDhxDayCalendar.baseInput).trigger("change");
					}
				});
				gobjDhxDayCalendar.attachEvent("onButtonClick", function(currDay){
					gobjDhxDayCalendar.hide();
				});
				
				//월 선택 달력 form 생성
				gobjDhxMonthCalendar = new dhtmlXCalendarObject();
				gobjDhxMonthCalendar.loadUserLanguage("kr");
				gobjDhxMonthCalendar.setSkin("material");
				gobjDhxMonthCalendar.hideTime();
				gobjDhxMonthCalendar.showToday();
				
				$(gobjDhxMonthCalendar.base).find(".dhtmlxcalendar_days_cont, .dhtmlxcalendar_dates_cont").hide();
				$(gobjDhxMonthCalendar.base).find(".dhtmlxcalendar_label_today").text("현재월");
				
				//input이 readonly일 경우 달력 안보여줌
				gobjDhxMonthCalendar.attachEvent("onShow", function(){
					if($(gobjDhxMonthCalendar.baseInput).hasClass("twbDisabled")){
						gobjDhxMonthCalendar.hide();
					}else{
						if(!$(gobjDhxMonthCalendar.baseInput).hasClass("active_element")){
							$(gobjDhxMonthCalendar.baseInput).addClass("active_element");
						}
						$(gobjDhxMonthCalendar.baseInput).attr("preValue", $(gobjDhxMonthCalendar.baseInput).valExt());
						if(date_onCheck($(gobjDhxMonthCalendar.baseInput).valExt(), "") === ""){
							gobjDhxMonthCalendar.setDate(strCurrDay);
						}else{
							gobjDhxMonthCalendar.setDate(date_onCheck($(gobjDhxMonthCalendar.baseInput).valExt() + "01", ""));
						}
						gobjActiveDhxCalendar.push(gobjDhxMonthCalendar);
					}
				});
				gobjDhxMonthCalendar.attachEvent("onHide", function(){
					$(gobjDhxMonthCalendar.baseInput).removeClass("active_element");
					if($(gobjDhxMonthCalendar.baseInput).attr("preValue") != $(gobjDhxMonthCalendar.baseInput).valExt()){
						$(gobjDhxMonthCalendar.baseInput).trigger("change");
					}
				});
				gobjDhxMonthCalendar.attachEvent("onArrowClick", function(date, nextdate){
				    $(gobjDhxMonthCalendar.baseInput).valExt(gobjDhxMonthCalendar.getFormatedDate("%Y/%m", nextdate));
				});
				gobjDhxMonthCalendar.attachEvent("onChange", function(date, state){
				    if(!state){
				    	$(gobjDhxMonthCalendar.baseInput).valExt(gobjDhxMonthCalendar.getFormatedDate("%Y/%m", date));
				    }
				});
				gobjDhxMonthCalendar.attachEvent("onButtonClick", function(currDay){
					if(currDay == null){$(gobjDhxMonthCalendar.baseInput).valExt("");}
					else{$(gobjDhxMonthCalendar.baseInput).valExt(gobjDhxMonthCalendar.getFormatedDate("%Y/%m", currDay));}
					gobjDhxMonthCalendar.hide();
				});
				
				
				//시간 선택 달력 form 생성
				gobjDhxTimeCalendar = new dhtmlXCalendarObject();
				gobjDhxTimeCalendar.loadUserLanguage("kr");
				gobjDhxTimeCalendar.setSkin("material");
				gobjDhxTimeCalendar.setDateFormat("%H:%i");
				gobjDhxTimeCalendar.setMinutesInterval(1);
				gobjDhxTimeCalendar.showTime();
				gobjDhxTimeCalendar.showToday();
				
				$(gobjDhxTimeCalendar.base).find(".dhtmlxcalendar_month_cont, .dhtmlxcalendar_days_cont, .dhtmlxcalendar_dates_cont").hide();
				$(gobjDhxTimeCalendar.base).find(".dhtmlxcalendar_label_today").text("현재시간");
				
				//input이 readonly일 경우 달력 안보여줌
				gobjDhxTimeCalendar.attachEvent("onShow", function(){
					if($(gobjDhxTimeCalendar.baseInput).hasClass("twbDisabled")){
						gobjDhxTimeCalendar.hide();
					}else{
						if(!$(gobjDhxTimeCalendar.baseInput).hasClass("active_element")){
							$(gobjDhxTimeCalendar.baseInput).addClass("active_element");
						}
						$(gobjDhxTimeCalendar.baseInput).attr("preValue", $(gobjDhxTimeCalendar.baseInput).valExt());
						gobjDhxTimeCalendar.setDate(gobjDhxTimeCalendar.getFormatedDate("%H:%i:%s", new Date()));
						if(time_onCheck($(gobjDhxTimeCalendar.baseInput).valExt(), "") !== ""){
							gobjDhxTimeCalendar.setDate(time_onCheck($(gobjDhxTimeCalendar.baseInput).valExt(), ""));
						}
						gobjActiveDhxCalendar.push(gobjDhxTimeCalendar);
					}
				});
				gobjDhxTimeCalendar.attachEvent("onHide", function(){
					$(gobjDhxTimeCalendar.baseInput).removeClass("active_element");
					if($(gobjDhxTimeCalendar.baseInput).attr("preValue") != $(gobjDhxTimeCalendar.baseInput).valExt()){
						$(gobjDhxTimeCalendar.baseInput).trigger("change");
					}
				});
				gobjDhxTimeCalendar.attachEvent("onTimeChange", function(d){
					$(gobjDhxTimeCalendar.baseInput).valExt($.rpad((d.getHours()).toString(), 2, "0") + ":" + $.rpad((d.getMinutes()).toString(), 2, "0"));
				});
				gobjDhxTimeCalendar.attachEvent("onButtonClick", function(currTime){
					if(currTime == null){$(gobjDhxTimeCalendar.baseInput).valExt("");}
					else{
						currTime = gobjDhxTimeCalendar.getFormatedDate("%H:%i", new Date());
						$(gobjDhxTimeCalendar.baseInput).valExt(currTime);
					}
					gobjDhxTimeCalendar.hide();
				});
			}
			
			//타겟 ROOT 설정
			if(typeof(objParent) === "undefined"){
				objParent = document.body;
			}else{
				if(typeof(objParent) === "string"){
					var strFormID = objParent;
					objParent = document.getElementById(strFormID);
					if(typeof(objParent) === "undefined" || objParent == null || $(objParent).length == 0){
						objParent = document.body;
					}
				}
			}

			$(objParent).find(".class_datepicker, .class_monthpicker, .class_timepicker").each(function(){
                var objInput			= this;
                var objForm				= $(objInput.form);
                var strRangeFromToId	= $(objInput).attr("rangeId");
                var strButtonId			= $(objInput).attr("id") + "_CALENDAR";
                var strIconClass		= "";
                if(typeof(strRangeFromToId) === "undefined"){strRangeFromToId = "";}
                if($(objInput).hasClass("class_datepicker")){strIconClass = "is-calendar";}
                if($(objInput).hasClass("class_monthpicker")){strIconClass = "is-calendar";}
                if($(objInput).hasClass("class_timepicker")){strIconClass = "is-time";}
                //버튼ID생성
                if(typeof($(objForm).attr("id")) !== "undefined"){strButtonId = $(objForm).attr("id") + "_" + strButtonId;}
                if(strRangeFromToId !== "" && (strRangeFromToId.indexOf("FROM_DHXC") >= 0 || strRangeFromToId.indexOf("TO_DHXC") >= 0)){
                    strButtonId = strRangeFromToId + "_CALENDAR";
                }

                //버튼생성
                if(typeof($(objInput).attr("style")) !== "undefined" && $(objInput).attr("style") !== ""){
                    $(objInput).wrap("<div class='twbInput_div' style='" + $(objInput).attr("style") + "'></div>");
                    $(objInput).removeAttr("style");
                }else{
                    $(objInput).wrap("<div class='twbInput_div'></div>");
                }

                $(objInput).css("padding-right", "20px");
                $(objInput).after("<span class='btn_twbInput'><i id='" + strButtonId + "' class='tt-icon-picker " + strIconClass + "'></i></span>");


                if($(this).hasClass("class_datepicker")){
                    if(strRangeFromToId !== "" && strRangeFromToId.indexOf("FROM_DHXC") >= 0){
                        var objCalendar = new dhtmlXDoubleCalendar(strButtonId);
                        objCalendar.baseInputLeft = $(".class_datepicker[rangeId='" + (replaceAll(replaceAll(strRangeFromToId, "FROM_DHXC", ""), "TO_DHXC", "")) + "FROM_DHXC']");
                        objCalendar.baseInputRight = $(".class_datepicker[rangeId='" + (replaceAll(replaceAll(strRangeFromToId, "FROM_DHXC", ""), "TO_DHXC", "")) + "TO_DHXC']");
                        objCalendar.baseButtonLeft = $("#" + strButtonId);
                        //바깥으로 뺀다.
                        $(objCalendar.baseButtonLeft).children().each(function(){
                            $(this).detach().appendTo(document.body);
                        });
                        //버튼 클릭 이벤트 설정
                        $(objCalendar.baseButtonLeft).click(function(e){
                            $.showDhxCalendarObject(this, true, e);
                            return false;
                        });
                        if($(objCalendar.baseInputRight).next().length > 0){
                            if($(objCalendar.baseInputRight).next().children().length > 0){
                                objCalendar.baseButtonRight = $(objCalendar.baseInputRight).next().children();
                                $(objCalendar.baseButtonRight).click(function(e){
                                    $.showDhxCalendarObject(this, true, e);
                                    return false;
                                });
                            }
                        }

                        if(typeof($(objCalendar.baseInputLeft).attr("maxTerm")) !== "undefined" || typeof($(objCalendar.baseInputRight).attr("maxTerm")) !== "undefined"){
                            var intFromMaxTerm	= 0;
                            var intToMaxTerm	= 0;
                            if(typeof($(objCalendar.baseInputLeft).attr("maxTerm")) === "undefined"){
                                TwbMsg($(objCalendar.baseInputLeft).attr("id") + " maxTerm 누락.", "E");
                                return false;
                            }else{
                                intFromMaxTerm = parseInt($(objCalendar.baseInputLeft).attr("maxTerm"), 10);
                            }
                            if(typeof($(objCalendar.baseInputRight).attr("maxTerm")) === "undefined"){
                                TwbMsg($(objCalendar.baseInputRight).attr("id") + " maxTerm 누락.", "E");
                                return false;
                            }else{
                                intToMaxTerm = parseInt($(objCalendar.baseInputRight).attr("maxTerm"), 10);
                            }
                            if(intFromMaxTerm != intToMaxTerm){
                                TwbMsg($(objInput).attr("id") + " From Input, To Input maxTerm 상이.", "E");
                                return false;
                            }
                            if(intFromMaxTerm == 0){
                                intFromMaxTerm = 1;
                                $(objCalendar.baseInputLeft).attr("maxTerm", "1");
                            }
                            if(intToMaxTerm == 0){
                                intToMaxTerm = 1;
                                $(objCalendar.baseInputRight).attr("maxTerm", "1");
                            }
                            objCalendar.baseMaxTermLeft		= intFromMaxTerm;
                            objCalendar.baseMaxTermRight	= intToMaxTerm;
                            intFromMaxTerm	= null;
                            intToMaxTerm	= null;
                        }
                        //달력 기본설정
                        objCalendar.leftCalendar.loadUserLanguage("kr");
                        objCalendar.rightCalendar.loadUserLanguage("kr");
                        objCalendar.leftCalendar.setSkin("material");
                        objCalendar.rightCalendar.setSkin("material");
                        objCalendar.leftCalendar.showToday();
                        objCalendar.rightCalendar.showToday();
                        objCalendar.setDateFormat("%Y/%m/%d");
                        //input 클릭 이벤트 정의
                        $(objCalendar.baseInputLeft).click(function(e){
                            $.showDhxCalendarObject(this, true, e);
                            return false;
                        });
                        $(objCalendar.baseInputRight).click(function(e){
                            $.showDhxCalendarObject(this, true, e);
                            return false;
                        });

                        objCalendar.attachEvent("onClick", function(side, date){
                            if(side === "left"){
                                if(!$(objCalendar.baseInputLeft).hasClass("twbDisabled")){
                                    $(objCalendar.baseInputLeft).valExt(objCalendar.getFormatedDate("%Y/%m/%d", date));
                                }
                            }else if(side === "right"){
                                if(!$(objCalendar.baseInputRight).hasClass("twbDisabled")){
                                    $(objCalendar.baseInputRight).valExt(objCalendar.getFormatedDate("%Y/%m/%d", date));
                                }
                            }
                            if($(objCalendar.baseInputLeft).valExt() !== "" && $(objCalendar.baseInputRight).valExt() !== ""){
                                objCalendar.hide();
                            }else{
                                if(typeof(objCalendar.baseMaxTermLeft) !== "undefined" && objCalendar.baseMaxTermLeft > 0){
                                    var strFromDt	= date_onCheck($(objCalendar.baseInputLeft).valExt(), "");
                                    var strToDt		= date_onCheck($(objCalendar.baseInputRight).valExt(), "");
                                    var strCalcDate	= "";
                                    if(side === "left"){
                                        strCalcDate = $.getSvrDateAdd("%Y/%m/%d","dd", (objCalendar.baseMaxTermLeft-1), strFromDt);
                                        objCalendar.rightCalendar.setSensitiveRange(strFromDt, strCalcDate);
                                    }else if(side === "right"){
                                        strCalcDate = $.getSvrDateAdd("%Y/%m/%d","dd", -(objCalendar.baseMaxTermLeft-1), strToDt);
                                        objCalendar.leftCalendar.setSensitiveRange(strCalcDate, strToDt);
                                    }
                                    strFromDt	= null;
                                    strToDt		= null;
                                    strCalcDate	= null;
                                }
                            }
                        });
                        objCalendar.leftCalendar.attachEvent("onShow", function(){
                            //input이 readonly일 경우 달력 안보여줌
                            if($(objCalendar.baseInputLeft).hasClass("twbDisabled") || $(objCalendar.baseInputRight).hasClass("twbDisabled")){
                                objCalendar.hide();
                            }else{
                                if(!$(objCalendar.baseInputLeft).hasClass("active_element")){
                                    $(objCalendar.baseInputLeft).addClass("active_element");
                                }
                                if(!$(objCalendar.baseInputRight).hasClass("active_element")){
                                    $(objCalendar.baseInputRight).addClass("active_element");
                                }
                                $(objCalendar.baseInputLeft).attr("preValue", $(objCalendar.baseInputLeft).valExt());
                                $(objCalendar.baseInputRight).attr("preValue", $(objCalendar.baseInputRight).valExt());
                                try{
                                    var strFromDt	= date_onCheck($(objCalendar.baseInputLeft).valExt(), "");
                                    var strToDt		= date_onCheck($(objCalendar.baseInputRight).valExt(), "");
                                    var strCurrDay	= objCalendar.getFormatedDate("%Y/%m/%d", new Date());
                                    var strCalcDate = "";
                                    if(strFromDt !== "" && strToDt !== ""){
                                        objCalendar.setDates(strFromDt, strToDt);
                                        objCalendar.leftCalendar.setSensitiveRange(null, strToDt);
                                        objCalendar.rightCalendar.setSensitiveRange(strFromDt, null);
                                    }else if(strFromDt === "" && strToDt !== ""){
                                        objCalendar.leftCalendar.setDate(strCurrDay);
                                        objCalendar.rightCalendar.setDate(strToDt);
                                        objCalendar.leftCalendar.setSensitiveRange(null, strToDt);
                                        objCalendar.rightCalendar.clearSensitiveRange();
                                    }else if(strFromDt !== "" && strToDt === ""){
                                        objCalendar.leftCalendar.setDate(strFromDt);
                                        objCalendar.rightCalendar.setDate(strCurrDay);
                                        objCalendar.leftCalendar.clearSensitiveRange();
                                        objCalendar.rightCalendar.setSensitiveRange(strFromDt, null);
                                    }else{
                                        objCalendar.setDates(strCurrDay, strCurrDay);
                                        objCalendar.leftCalendar.clearSensitiveRange();
                                        objCalendar.rightCalendar.clearSensitiveRange();
                                    }
                                    if(typeof(objCalendar.baseMaxTermLeft) !== "undefined" && objCalendar.baseMaxTermLeft > 0){
                                        if(strFromDt !== ""){
                                            strCalcDate = $.getSvrDateAdd("%Y/%m/%d","dd", (objCalendar.baseMaxTermLeft-1), strFromDt);
                                            objCalendar.rightCalendar.setSensitiveRange(strFromDt, strCalcDate);
                                        }
                                        if(strToDt !== ""){
                                            strCalcDate = $.getSvrDateAdd("%Y/%m/%d","dd", -(objCalendar.baseMaxTermLeft-1), strToDt);
                                            objCalendar.leftCalendar.setSensitiveRange(strCalcDate, strToDt);
                                        }
                                    }
                                    strFromDt	= null;
                                    strToDt		= null;
                                    strCurrDay	= null;
                                    strCalcDate	= null;
                                }catch(E){console.log("error=", E);}

                                gobjActiveDhxCalendar.push(objCalendar);
                            }
                        });
                        objCalendar.leftCalendar.attachEvent("onHide", function(){
                            $(objCalendar.baseInputLeft).removeClass("active_element");
                            $(objCalendar.baseInputRight).removeClass("active_element");
                            if($(objCalendar.baseInputLeft).attr("preValue") != $(objCalendar.baseInputLeft).valExt()){
                                $(objCalendar.baseInputLeft).trigger("change");
                            }
                            if($(objCalendar.baseInputRight).attr("preValue") != $(objCalendar.baseInputRight).valExt()){
                                $(objCalendar.baseInputRight).trigger("change");
                            }
                        });
                        objCalendar.leftCalendar.attachEvent("onButtonClick", function(currDay){
                            if(!$(objCalendar.baseInputLeft).hasClass("twbDisabled")){
                                if(currDay == null){
                                    $(objCalendar.baseInputLeft).valExt("");
                                    if($(objCalendar.baseInputRight).valExt() === ""){
                                        objCalendar.hide();
                                    }
                                }else{$(objCalendar.baseInputLeft).valExt(objCalendar.getFormatedDate("%Y/%m/%d", currDay));}
                                var strFromDt	= date_onCheck($(objCalendar.baseInputLeft).valExt(), "");
                                var strToDt		= date_onCheck($(objCalendar.baseInputRight).valExt(), "");
                                var strCalcDate	= "";
                                if(strFromDt !== "" && strToDt !== ""){
                                    objCalendar.setDates(strFromDt, strToDt);
                                    objCalendar.leftCalendar.setSensitiveRange(null, strToDt);
                                    objCalendar.rightCalendar.setSensitiveRange(strFromDt, null);
                                }else if(strFromDt === "" && strToDt !== ""){
                                    objCalendar.rightCalendar.setDate(strToDt);
                                    objCalendar.leftCalendar.setSensitiveRange(null, strToDt);
                                    objCalendar.rightCalendar.clearSensitiveRange();
                                }else if(strFromDt !== "" && strToDt === ""){
                                    objCalendar.leftCalendar.setDate(strFromDt);
                                    objCalendar.leftCalendar.clearSensitiveRange();
                                    objCalendar.rightCalendar.setSensitiveRange(strFromDt, null);
                                }else{
                                    objCalendar.leftCalendar.clearSensitiveRange();
                                    objCalendar.rightCalendar.clearSensitiveRange();
                                }
                                if($(objCalendar.baseInputLeft).valExt() !== "" && $(objCalendar.baseInputRight).valExt() !== ""){
                                    objCalendar.hide();
                                }else{
                                    if(typeof(objCalendar.baseMaxTermLeft) !== "undefined" && objCalendar.baseMaxTermLeft > 0){
                                        if(strFromDt !== ""){
                                            strCalcDate = $.getSvrDateAdd("%Y/%m/%d","dd", (objCalendar.baseMaxTermLeft-1), strFromDt);
                                            objCalendar.rightCalendar.setSensitiveRange(strFromDt, strCalcDate);
                                        }
                                        if(strToDt !== ""){
                                            strCalcDate = $.getSvrDateAdd("%Y/%m/%d","dd", -(objCalendar.baseMaxTermLeft-1), strToDt);
                                            objCalendar.leftCalendar.setSensitiveRange(strCalcDate, strToDt);
                                        }
                                    }
                                }
                                strFromDt	= null;
                                strToDt		= null;
                                strCalcDate	= null;
                            }
                        });
                        objCalendar.rightCalendar.attachEvent("onButtonClick", function(currDay){
                            if(!$(objCalendar.baseInputRight).hasClass("twbDisabled")){
                                if(currDay == null){
                                    $(objCalendar.baseInputRight).valExt("");
                                    if($(objCalendar.baseInputLeft).valExt() === ""){
                                        objCalendar.hide();
                                    }
                                }
                                else{$(objCalendar.baseInputRight).valExt(objCalendar.getFormatedDate("%Y/%m/%d", currDay));}
                                var strFromDt	= date_onCheck($(objCalendar.baseInputLeft).valExt(), "");
                                var strToDt		= date_onCheck($(objCalendar.baseInputRight).valExt(), "");
                                var strCalcDate	= "";
                                if(strFromDt !== "" && strToDt !== ""){
                                    objCalendar.setDates(strFromDt, strToDt);
                                    objCalendar.leftCalendar.setSensitiveRange(null, strToDt);
                                    objCalendar.rightCalendar.setSensitiveRange(strFromDt, null);
                                }else if(strFromDt === "" && strToDt !== ""){
                                    objCalendar.rightCalendar.setDate(strToDt);
                                    objCalendar.leftCalendar.setSensitiveRange(null, strToDt);
                                    objCalendar.rightCalendar.clearSensitiveRange();
                                }else if(strFromDt !== "" && strToDt === ""){
                                    objCalendar.leftCalendar.setDate(strFromDt);
                                    objCalendar.leftCalendar.clearSensitiveRange();
                                    objCalendar.rightCalendar.setSensitiveRange(strFromDt, null);
                                }else{
                                    objCalendar.leftCalendar.clearSensitiveRange();
                                    objCalendar.rightCalendar.clearSensitiveRange();
                                }
                                if($(objCalendar.baseInputLeft).valExt() !== "" && $(objCalendar.baseInputRight).valExt() !== ""){
                                    objCalendar.hide();
                                }else{
                                    if(typeof(objCalendar.baseMaxTermLeft) !== "undefined" && objCalendar.baseMaxTermLeft > 0){
                                        if(strFromDt !== ""){
                                            strCalcDate = $.getSvrDateAdd("%Y/%m/%d","dd", (objCalendar.baseMaxTermLeft-1), strFromDt);
                                            objCalendar.rightCalendar.setSensitiveRange(strFromDt, strCalcDate);
                                        }
                                        if(strToDt !== ""){
                                            strCalcDate = $.getSvrDateAdd("%Y/%m/%d","dd", -(objCalendar.baseMaxTermLeft-1), strToDt);
                                            objCalendar.leftCalendar.setSensitiveRange(strCalcDate, strToDt);
                                        }
                                    }
                                }
                                strFromDt	= null;
                                strToDt		= null;
                                strCalcDate	= null;
                            }
                        });

                        objCalendar.baseInputLeft[0].dhxCalendar = objCalendar;
                        objCalendar.baseInputRight[0].dhxCalendar = objCalendar;

                    }else if(strRangeFromToId !== "" && strRangeFromToId.indexOf("TO_DHXC") >= 0){
                        var objCalendar = null;
                        $(this).each(function(){
                            objCalendar = this.dhxCalendar;
                        });
                        if(typeof(objCalendar) !== "undefined" && objCalendar != null){
                            objCalendar.baseButtonRight = $("#" + strButtonId);
                            $(objCalendar.baseButtonRight).click(function(e){
                                $.showDhxCalendarObject(this, true, e);
                                return false;
                            });
                        }
                    }else{
                        $(objInput).click(function(e){
                            $.showDhxCalendarObject(this, false, e);
                            return false;
                        });
                        $("#" + strButtonId).click(function(e){
                            $.showDhxCalendarObject(this, false, e);
                            return false;
                        });
                    }
                }else if($(this).hasClass("class_monthpicker")){
                    if(strRangeFromToId !== "" && strRangeFromToId.indexOf("FROM_DHXC") >= 0){
                        var objCalendar = new dhtmlXDoubleCalendar(strButtonId);
                        objCalendar.baseInputLeft = $(".class_monthpicker[rangeId='" + (replaceAll(replaceAll(strRangeFromToId, "FROM_DHXC", ""), "TO_DHXC", "")) + "FROM_DHXC']");
                        objCalendar.baseInputRight = $(".class_monthpicker[rangeId='" + (replaceAll(replaceAll(strRangeFromToId, "FROM_DHXC", ""), "TO_DHXC", "")) + "TO_DHXC']");
                        objCalendar.baseButtonLeft = $("#" + strButtonId);
                        //바깥으로 뺀다.
                        $(objCalendar.baseButtonLeft).children().each(function(){
                            $(this).detach().appendTo(document.body);
                        });
                        //버튼 클릭 이벤트 설정
                        $(objCalendar.baseButtonLeft).click(function(e){
                            $.showDhxCalendarObject(this, true, e);
                            return false;
                        });
                        if($(objCalendar.baseInputRight).next().length > 0){
                            if($(objCalendar.baseInputRight).next().children().length > 0){
                                objCalendar.baseButtonRight = $(objCalendar.baseInputRight).next().children();
                                $(objCalendar.baseButtonRight).click(function(e){
                                    $.showDhxCalendarObject(this, true, e);
                                    return false;
                                });
                            }
                        }
                        if(typeof($(objCalendar.baseInputLeft).attr("maxTerm")) !== "undefined" || typeof($(objCalendar.baseInputRight).attr("maxTerm")) !== "undefined"){
                            var intFromMaxTerm	= 0;
                            var intToMaxTerm	= 0;
                            if(typeof($(objCalendar.baseInputLeft).attr("maxTerm")) === "undefined"){
                                TwbMsg($(objCalendar.baseInputLeft).attr("id") + " maxTerm 누락.", "E");
                                return false;
                            }else{
                                intFromMaxTerm = parseInt($(objCalendar.baseInputLeft).attr("maxTerm"), 10);
                            }
                            if(typeof($(objCalendar.baseInputRight).attr("maxTerm")) === "undefined"){
                                TwbMsg($(objCalendar.baseInputRight).attr("id") + " maxTerm 누락.", "E");
                                return false;
                            }else{
                                intToMaxTerm = parseInt($(objCalendar.baseInputRight).attr("maxTerm"), 10);
                            }
                            if(intFromMaxTerm != intToMaxTerm){
                                TwbMsg($(objInput).attr("id") + " From Input, To Input maxTerm 상이.", "E");
                                return false;
                            }
                            if(intFromMaxTerm == 0){
                                intFromMaxTerm = 1;
                                $(objCalendar.baseInputLeft).attr("maxTerm", "1");
                            }
                            if(intToMaxTerm == 0){
                                intToMaxTerm = 1;
                                $(objCalendar.baseInputRight).attr("maxTerm", "1");
                            }
                            objCalendar.baseMaxTermLeft		= intFromMaxTerm;
                            objCalendar.baseMaxTermRight	= intToMaxTerm;
                            intFromMaxTerm	= null;
                            intToMaxTerm	= null;
                        }
                        //달력 기본설정
                        objCalendar.leftCalendar.loadUserLanguage("kr");
                        objCalendar.rightCalendar.loadUserLanguage("kr");
                        objCalendar.leftCalendar.setSkin("material");
                        objCalendar.rightCalendar.setSkin("material");
                        objCalendar.leftCalendar.hideTime();
                        objCalendar.rightCalendar.hideTime();
                        objCalendar.leftCalendar.showToday();
                        objCalendar.rightCalendar.showToday();
                        objCalendar.setDateFormat("%Y/%m");
                        $(objCalendar.leftCalendar.base).find(".dhtmlxcalendar_days_cont, .dhtmlxcalendar_dates_cont").hide();
                        $(objCalendar.leftCalendar.base).find(".dhtmlxcalendar_label_today").text("현재월");
                        $(objCalendar.rightCalendar.base).find(".dhtmlxcalendar_days_cont, .dhtmlxcalendar_dates_cont").hide();
                        $(objCalendar.rightCalendar.base).find(".dhtmlxcalendar_label_today").text("현재월");
                        //input 클릭 이벤트 정의
                        $(objCalendar.baseInputLeft).click(function(e){
                            $.showDhxCalendarObject(this, true, e);
                            return false;
                        });
                        $(objCalendar.baseInputRight).click(function(e){
                            $.showDhxCalendarObject(this, true, e);
                            return false;
                        });
                        objCalendar.leftCalendar.attachEvent("onShow", function(){
                            //input이 readonly일 경우 달력 안보여줌
                            if($(objCalendar.baseInputLeft).hasClass("twbDisabled") || $(objCalendar.baseInputRight).hasClass("twbDisabled")){
                                objCalendar.hide();
                            }else{
                                if(!$(objCalendar.baseInputLeft).hasClass("active_element")){
                                    $(objCalendar.baseInputLeft).addClass("active_element");
                                }
                                if(!$(objCalendar.baseInputRight).hasClass("active_element")){
                                    $(objCalendar.baseInputRight).addClass("active_element");
                                }
                                $(objCalendar.baseInputLeft).attr("preValue", $(objCalendar.baseInputLeft).valExt());
                                $(objCalendar.baseInputRight).attr("preValue", $(objCalendar.baseInputRight).valExt());
                                try{
                                    var strFromDt	= date_onCheck($(objCalendar.baseInputLeft).valExt(), "");
                                    var strToDt		= date_onCheck($(objCalendar.baseInputRight).valExt(), "");
                                    var strCurrDay	= objCalendar.getFormatedDate("%Y/%m", new Date());
                                    if(strFromDt !== "" && strToDt !== ""){
                                        objCalendar.setDates(strFromDt, strToDt);
                                    }else if(strFromDt === "" && strToDt !== ""){
                                        objCalendar.setDates(strToDt, strToDt);
                                    }else if(strFromDt !== "" && strToDt === ""){
                                        objCalendar.setDates(strFromDt, strFromDt);
                                    }else{
                                        objCalendar.setDates(strCurrDay, strCurrDay);
                                    }
                                    strFromDt	= null;
                                    strToDt		= null;
                                    strCurrDay	= null;
                                }catch(E){console.log("error=", E);}
                                gobjActiveDhxCalendar.push(objCalendar);
                            }
                        });
                        objCalendar.leftCalendar.attachEvent("onHide", function(){
                            $(objCalendar.baseInputLeft).removeClass("active_element");
                            $(objCalendar.baseInputRight).removeClass("active_element");
                            if($(objCalendar.baseInputLeft).attr("preValue") != $(objCalendar.baseInputLeft).valExt()){
                                $(objCalendar.baseInputLeft).trigger("change");
                            }
                            if($(objCalendar.baseInputRight).attr("preValue") != $(objCalendar.baseInputRight).valExt()){
                                $(objCalendar.baseInputRight).trigger("change");
                            }
                        });
                        objCalendar.leftCalendar.attachEvent("onArrowClick", function(date, nextdate){
                            if(!$(objCalendar.baseInputLeft).hasClass("twbDisabled")){
                                objCalendar.rightCalendar.clearSensitiveRange();
                                $(objCalendar.baseInputLeft).valExt(objCalendar.getFormatedDate("%Y/%m", nextdate));
                                if($(objCalendar.baseInputRight).valExt() === ""){
                                    objCalendar.rightCalendar.setDate(objCalendar.getFormatedDate("%Y/%m", nextdate));
                                }
                                $(objCalendar.baseInputLeft).trigger("blur");
                            }
                        });
                        objCalendar.rightCalendar.attachEvent("onArrowClick", function(date, nextdate){
                            if(!$(objCalendar.baseInputRight).hasClass("twbDisabled")){
                                objCalendar.leftCalendar.clearSensitiveRange();
                                $(objCalendar.baseInputRight).valExt(objCalendar.getFormatedDate("%Y/%m", nextdate));
                                if($(objCalendar.baseInputLeft).valExt() === ""){
                                    objCalendar.leftCalendar.setDate(objCalendar.getFormatedDate("%Y/%m", nextdate));
                                }
                                $(objCalendar.baseInputRight).trigger("blur");
                            }
                        });
                        objCalendar.leftCalendar.attachEvent("onButtonClick", function(currDay){
                            if(!$(objCalendar.baseInputLeft).hasClass("twbDisabled")){
                                objCalendar.rightCalendar.clearSensitiveRange();
                                if(currDay == null){
                                    $(objCalendar.baseInputLeft).valExt("");
                                    if($(objCalendar.baseInputRight).valExt() === ""){
                                        objCalendar.hide();
                                    }else{
                                        objCalendar.leftCalendar.setDate(date_onCheck($(objCalendar.baseInputRight).valExt(), ""));
                                    }
                                }else{
                                    $(objCalendar.baseInputLeft).valExt(objCalendar.getFormatedDate("%Y/%m", currDay));
                                    $(objCalendar.baseInputLeft).trigger("blur");
                                    if($(objCalendar.baseInputLeft).valExt() === ""){
                                        objCalendar.leftCalendar.setDate(date_onCheck($(objCalendar.baseInputRight).valExt(), ""));
                                    }
                                }
                            }
                        });
                        objCalendar.rightCalendar.attachEvent("onButtonClick", function(currDay){
                            if(!$(objCalendar.baseInputRight).hasClass("twbDisabled")){
                                objCalendar.leftCalendar.clearSensitiveRange();
                                if(currDay == null){
                                    $(objCalendar.baseInputRight).valExt("");
                                    if($(objCalendar.baseInputLeft).valExt() === ""){
                                        objCalendar.hide();
                                    }else{
                                        objCalendar.rightCalendar.setDate(date_onCheck($(objCalendar.baseInputLeft).valExt(), ""));
                                    }
                                }else{
                                    $(objCalendar.baseInputRight).valExt(objCalendar.getFormatedDate("%Y/%m", currDay));
                                    $(objCalendar.baseInputRight).trigger("blur");
                                    if($(objCalendar.baseInputRight).valExt() === ""){
                                        objCalendar.rightCalendar.setDate(date_onCheck($(objCalendar.baseInputLeft).valExt(), ""));
                                    }
                                }
                            }
                        });
                        objCalendar.leftCalendar.attachEvent("onChange", function(date, state){
                            if(!state){
                                $(objCalendar.baseInputLeft).valExt(objCalendar.getFormatedDate("%Y/%m", date));
                                $(objCalendar.baseInputLeft).trigger("blur");
                            }
                        });
                        objCalendar.rightCalendar.attachEvent("onChange", function(date, state){
                            if(!state){
                                $(objCalendar.baseInputRight).valExt(objCalendar.getFormatedDate("%Y/%m", date));
                                $(objCalendar.baseInputRight).trigger("blur");
                            }
                        });
                        objCalendar.baseInputLeft[0].dhxCalendar = objCalendar;
                        objCalendar.baseInputRight[0].dhxCalendar = objCalendar;
                    }else if(strRangeFromToId !== "" && strRangeFromToId.indexOf("TO_DHXC") >= 0){
                        var objCalendar = null;
                        $(this).each(function(){
                            objCalendar = this.dhxCalendar;
                        });
                        if(typeof(objCalendar) !== "undefined" && objCalendar != null){
                            objCalendar.baseButtonRight = $("#" + strButtonId);
                            $(objCalendar.baseButtonRight).click(function(e){
                                $.showDhxCalendarObject(this, true, e);
                                return false;
                            });
                        }
                    }else{
                        $(objInput).click(function(e){
                            $.showDhxCalendarObject(this, false, e);
                            return false;
                        });
                        $("#" + strButtonId).click(function(e){
                            $.showDhxCalendarObject(this, false, e);
                            return false;
                        });
                    }

                }else if($(this).hasClass("class_timepicker")){
                    $(objInput).click(function(e){
                        $.showDhxCalendarObject(this, false, e);
                        return false;
                    });
                    $("#" + strButtonId).click(function(e){
                        $.showDhxCalendarObject(this, false, e);
                        return false;
                    });
                }
            });
		}catch(E){console.log("error=", E);}
	},
	//마우스 우클릭 기능 여부 설정
	setAvailableRightClick:function(blnEnable){
		$(document).on("contextmenu",function(e){
			//$.closingActiveDhxComponent(e);
	        return blnEnable;
	    });
	},
	//새로고침 및 뒤로가기 기능 제어 (F5, Ctrl+R, Backspace)
	setAvailableRefresh:function(blnEnable){
		if(!blnEnable){
			$(document).keydown(function(e){
		        if(e.which === 116){
		        	if(typeof(event) == "object"){
		        		event.keyCode = 0;
		        	}
		        	return false;
		        }else if(e.which === 82 && e.ctrlKey){
		        	return false;
		        }else if(e.which === 8){
		        	if(e.target.nodeName === "INPUT" || e.target.nodeName === "TEXTAREA"){
		        		if(typeof($(e.target).attr("readonly")) !== "undefined" || $(e.target).hasClass("twbDisabled") || $(e.target).is(":disabled")){
		        			return false;
		        		}else{
		        			return true;
		        		}
		        	}else{
		        		return false;
		        	}
		        }
		    });
		}
	},
	//input focus시 값 자동선택 
	setAutoSelectWithFocus:function(blnEnable){
		if(blnEnable){
			$(document).on('focus', ':input:not(button)', function(e){
				if($(this).attr("type") === "text" || $(this).attr("type") === "password"){
					$(this).one('mouseup.mouseupSelect', function(){
			    		$(this).select();
			    		if($(this).attr("type") === "text" && $(this).valExt() === ""){
							//class에 따른 input masking placeholder 이벤트 호출
						}
			            return false;
			        }).one('mousedown', function(){
			            // compensate for untriggered 'mouseup' caused by focus via tab
			        	$(this).off('mouseup.mouseupSelect');
			        }).select();
				}
		    });
		}
	},
	//dhtmlx combo ui component 통한 콤보박스 로드
	drawComboBox:function(objParent){
		if(typeof(objParent) === "undefined"){
			objParent = document.body;
		}else{
			if(typeof(objParent) === "string"){
				var strFormID = objParent;
				objParent = document.getElementById(strFormID);
				if(typeof(objParent) === "undefined" || objParent == null || $(objParent).length == 0){
					objParent = document.body;
				}
			}
		}
		
		$(objParent).find(".twbCombo").each(function(){
			var objCombo	= this;
			var strId		= $(objCombo).attr("id");
			var objForm		= $(objCombo.form);
			var strFormId	= "";
			var strPId		= "";
			var blnMulti	= $(objCombo).attr("multiple");
			if(typeof(blnMulti) === "undefined"){blnMulti = false;}
			if(typeof(objForm) !== "undefined" && objForm.length > 0){
				strFormId = $(objForm).attr("id");
			}
			
			var strInlineStyle = $(objCombo).attr("style");
			if(typeof(strInlineStyle) === "undefined"){
				strInlineStyle = "";
			}
			
			strPId = "twbCombo_" + strFormId + strId;
			
			if(strInlineStyle !== ""){
				$(objCombo).after("<div class='twbCombo_div' id='" + strPId + "' style='" + strInlineStyle + "'></div>");
			}else{
				$(objCombo).after("<div class='twbCombo_div' id='" + strPId + "'></div>");
			}
			$(objCombo).hide();
			
			var objDhxCombo = null;
			if(!blnMulti){
				objDhxCombo = new dhtmlXCombo(strPId);
				$(objDhxCombo.getBase()).append("<div class='twbCombo_selected'></div>");
				
				objDhxCombo.attachEvent("onOpen", function(){
					//자동으로 활성화되어있는 dhtmlx 컴포넌트 오브젝트들을 닫아준다.
					$.closingActiveDhxComponent(event);
					
					$(objDhxCombo.getList()).css("width", $(objDhxCombo.getBase()).width() + 8);
					$(objDhxCombo.getBase()).addClass("active_element");
					var blnPush = true;
					for(var i = 0; i < gobjActiveDhxCombo.length; i++){
						if(gobjActiveDhxCombo[i] == objDhxCombo){blnPush = false; break;}
					}
					if(blnPush){gobjActiveDhxCombo.push(objDhxCombo);}
					
					return false;
				});
				objDhxCombo.attachEvent("onChange", function(value, text){
					$(objDhxCombo.getBase()).find(".twbCombo_selected").text(text);
					$(objCombo).val(value);
					if(typeof($(objCombo).attr("program_change")) !== "undefined" && $(objCombo).attr("program_change") === "false"){
						$(objCombo).trigger("change");
					}
				});
			}else{
				objDhxCombo = new dhtmlXCombo(strPId, "", "", "checkbox");
				$(objDhxCombo.getBase()).find(".dhxcombo_top_image").before("<div class='twbCombo_selected'></div>");
				
				objDhxCombo.attachEvent("onOpen", function(){
					//자동으로 활성화되어있는 dhtmlx 컴포넌트 오브젝트들을 닫아준다.
					$.closingActiveDhxComponent(event);
					$(objDhxCombo.getList()).css("width", $(objDhxCombo.getBase()).width() + 8);
		        	$(objDhxCombo.getBase()).addClass("active_element");
		        	$(objCombo).attr("preValue", $(objCombo).valExt());
		        	var blnPush = true;
					for(var i = 0; i < gobjActiveDhxCombo.length; i++){
						if(gobjActiveDhxCombo[i] == objDhxCombo){blnPush = false; break;}
					}
					if(blnPush){gobjActiveDhxCombo.push(objDhxCombo);}
		        });
				objDhxCombo.attachEvent("onClose", function() {
					var strText = "";
					objDhxCombo.forEachOption(function(optId){
	            		objOption = objDhxCombo.getOptionByIndex(optId.index);
						if(objOption.checked){
							strText += objOption.text + ",";
						}
	            	});
					if(strText.substr(0,2) == "전체"){strText = "전체선택";}else if(strText.length > 0){strText = strText.substr(0, strText.length-1);}
					$(objDhxCombo.getBase()).find(".twbCombo_selected").text(strText);
					if($(objCombo).attr("preValue") !== $(objCombo).valExt()){
						$(objCombo).trigger("change");
					}
		        });
		        objDhxCombo.attachEvent("onCheck", function(value, newState){
		        	var checked = null;
		        	if(value == ""){
		        		objDhxCombo.forEachOption(function(optId){
		        		    if(optId.index > 0){objDhxCombo.setChecked(optId.index, newState);}
		        		});
		        		checked = objDhxCombo.getChecked();
		        		if(checked[0] == ""){checked.splice(0,1);}
		        		$(objCombo).val(checked);
		        	}else{
		        		checked = objDhxCombo.getChecked();
		        		if(checked[0] == ""){checked.splice(0,1);}
		        		$(objCombo).val(checked);
		        		if(checked.length < objDhxCombo.getOptionsCount()-1){
		        			objDhxCombo.setChecked(0, false);
		        		}else if(checked.length == objDhxCombo.getOptionsCount()-1){
		        			objDhxCombo.setChecked(0, true);
		        		}
		        		$(objCombo).val(checked);
		        	}
		        });
			}
			$(objDhxCombo.getBase()).css("width", "100%");
			
			if($(this).hasClass("mandatory")){
				$(objDhxCombo.getBase()).addClass("mandatory");
			}
			
			$(objCombo).attr("program_change", false);
			
			$(objDhxCombo.getBase()).click(function(e){
				e.cancelBubble = true;
				return false;
			});
			$(objDhxCombo.getList()).click(function(e){
				e.cancelBubble = true;
				return false;
			});
			
			this.dhxCombo = objDhxCombo;
			
			if($(this).children().length > 0){
				var objOptionData = [];
				$(this).children().each(function(){
					objOptionData.push({"CD":this.value,"CD_NM":this.text});
				});
				$.loadDataComboBox(this, objOptionData);
			}
		});
	},
	//iCheck 플러그인을 통한 체크박스 및 라디오버튼 로드
	drawCheckAndRadio:function(objParent){
		if(typeof(objParent) === "undefined"){
			objParent = document.body;
		}else{
			if(typeof(objParent) === "string"){
				var strFormID = objParent;
				objParent = document.getElementById(strFormID);
				if(typeof(objParent) === "undefined" || objParent == null || $(objParent).length == 0){
					objParent = document.body;
				}
			}
		}
		
		$(objParent).find(".twbCheckbox, .twbRadio").each(function(){
			if($(this).hasClass("twbCheckbox")){
				$(this).iCheck({checkboxClass:"icheckbox_flat-red_custom2"});
				//$(this).iCheck({checkboxClass:"icheckbox_flat-blue_custom"});
				//$(this).iCheck({checkboxClass:"icheckbox_flat-fullred"});
				//$(this).iCheck({checkboxClass:"icheckbox_flat-blue"});
				//$(this).iCheck({checkboxClass:"icheckbox_flat-red_custom"});
			}else{
				$(this).iCheck({radioClass:"iradio_flat-red_custom2"});
				//$(this).iCheck({radioClass:"iradio_flat-fullred"});
				//$(this).iCheck({radioClass:"iradio_flat-blue"});
				//$(this).iCheck({radioClass:"iradio_flat-blue_custom"});
				//$(this).iCheck({radioClass:"iradio_flat-red_custom"});
			}
			$(this).on("ifClicked", function(e){
				//자동으로 활성화되어있는 dhtmlx 컴포넌트 오브젝트들을 닫아준다.
				$.closingActiveDhxComponent(e);
				$(this).trigger("click");
			});
		});
	},
	//readonly처리된 input text필드 class정의
	setTxtInputReadonly:function(){
		$(".twbInput, .twbTxtArea").each(function(){
			if(!$(this).hasClass("twbDisabled") && $(this).attr("readonly")){
				$(this).addClass("twbDisabled");
			}
		});
	},
	
	//팝업 화면일 시 자동 사이즈 조절 및 화면 중앙 이동
	setPopupWindowInit:function(){
		if(top.window == window){
			if(typeof(opener) !== "undefined" && typeof(window.dialogArguments) !== "undefined"){
				var strUrl = document.location.href;
				
				if(strUrl.indexOf("TwbMain") < 0){
//					//파라메터에서 팝업 길이와 너비 추출
//					var contentW = 500;
//					var contentH = 500;
					//로그인화면
//					if(strUrl.indexOf("login-form") >= 0)
//					{
//						contentW = 1280;
//						contentH = 930;
//					}
//					//팝업화면
//					else
//					{
//						var objGetParams = $.cnvtUrlParamToJson();
//						var objData = objGetParams.getDataObject();
//						if(objData.length > 0 && $.toJSON(objData) !== "[{}]"){
//							contentW = parseInt(objData[0].width, 10);
//							contentH = parseInt(objData[0].height, 10);
//						}
//						objGetParams = null;
//						objData = null;
//					}
//					//모니터 해상도
//					var maxW = screen.availWidth;
//					var maxH = screen.availHeight;
//					//창 중앙 위치 위한 좌표
//					var windowX = (maxW/2) - (contentW/2);
//					var windowY = (maxH/2) - (contentH/2);
//					//최초 최소값으로 세팅
//					window.moveTo(windowX, windowY);
//					window.resizeTo(contentW, contentH);
//					
//					//현재 크기 추출
//					var innerW;
//					var innerH;
//					if(window.innerWidth){
//						innerW = window.innerWidth;
//						innerH = window.innerHeight;
//					}else{
//						innerW = document.body.clientWidth;
//						innerH = document.body.clientHeight;
//					}
//					//창의 전체 크기 열기
//					var winW = contentW - (innerW - contentW);
//					var winH = contentH - (innerH - contentH);
//					//모니터보다 큰 경우
//					if(winW > maxW){
//						winW = maxW;
//						windowX = 0;
//					}
//					if(winH > maxH){
//						winH = maxH;
//						windowY = 0;
//					}
//					if(G_BROWSER_INFO !== "MSIE"){
//						winW = contentW+10;
//						winH = contentH+58;
//					}
//					
//					if(winW > 1280){
//						winW = 1280;
//					}
//					if(winH > 930){
//						winH = 930;
//					}
//					
//					window.moveTo(windowX, windowY);
//					window.resizeTo(winW, winH);
					
					//윈도우 사이즈 조정
					screenWidth = screen.availWidth>1920?1920:screen.availWidth;
					screenHeight = screen.availHeight>1080?1080:screen.availHeight;
					
					//팝업일때 사이즈 조정
					if(strUrl.indexOf("login-form") >= 0)
					{
						screenWidth = screen.availWidth>1920?1920:screen.availWidth;
						screenHeight = screen.availHeight>1080?1080:screen.availHeight;
					}
					//팝업화면
					else
					{
						var objGetParams = $.cnvtUrlParamToJson();
						var objData = objGetParams.getDataObject();
						if(objData.length > 0 && $.toJSON(objData) !== "[{}]"){
							screenWidth = parseInt(objData[0].width, 10);
							screenHeight = parseInt(objData[0].height, 10);
						}
						objGetParams = null;
						objData = null;
						
					}
					
					try{ window.moveTo(0,0); } catch(e) { console.log("error=", e); }
				    window.resizeTo(screenWidth, screenHeight);
				}
			}
		}
	},
//#####################################################################################################################################################################################
//############    DOM객체 로드 이후 호출되는 기본기능 정의 종료      ############################################################################################################################
//#####################################################################################################################################################################################
	
	/**
	 * 현재 활성화 탭 화면 ID 반환한다.
	 */
	getCurrMenuID:function(){
		if(top.location.href.indexOf(G_TOP_MAIN_NAME) >= 0){
			if(location.href.indexOf(G_TOP_MAIN_NAME) < 0){
									
//				return top.$("#div_main").getActiveTabId();
				return top.$(".tt-tab-menu-item.is-active").attr("id");
			}else{
				
				return "";
			}
		}
	},
	
	/**
	 * URL경로로 메뉴정보 조회
	 * @param {String} strMenuPath 메뉴URL
	 * @return 조회된 메뉴정보 jsonArray
	 * @author MPC R&D Team
	 */
	getMenuInfoByMenuPath:function(strMenuPath){
		if(typeof(strMenuPath) === "undefined" || strMenuPath === ""){
			return "";
		}
		if(strMenuPath.substring(0,1) !== "/"){strMenuPath = "/" + strMenuPath;}
		//MENU_ID 체크대상여부 판단
		if(!$.isCheckExcludePage(gobjExcludeMenuIDList, strMenuPath)){return "";}
		
		var objJsonParams = new WebJson();
		objJsonParams.setService("twb.MenuMng");
		objJsonParams.setSqlName("selectMenuIdByMenuPath");
		objJsonParams.setData("PATH_NM", strMenuPath);
		var objJsonReturn = $.serviceCall(objJsonParams);
		if(!objJsonReturn.getErrorFlag()){
			if(objJsonReturn.getCount() > 0){
				return objJsonReturn.getDataObject(G_DATA, 0);
			}else{
				return "";
			}
		}else{
			TwbMsg(objJsonReturn.getMsg(), "E");
			return "";
		}
		objJsonParams = null;
		objJsonReturn = null;
	},
	
	/**
	 * Document에 정의된 class 속성이 정의되어 있는 모든 Control Object(input, select, textarea)를 검색하여 Class Format에 맞게 onblur 이벤트와 데이터 포맷 및 디자인을 설정한다.
	 * @author MPC R&D Team 
	 */
	setClassFormats:function(objParent){
		
		if(typeof(objParent) === "undefined"){
			objParent = document.body;
		}else{
			if(typeof(objParent) === "string"){
				var strFormID = objParent;
				objParent = document.getElementById(strFormID);
				if(typeof(objParent) === "undefined" || objParent == null || $(objParent).length == 0){
					objParent = document.body;
				}
			}
		}
		
		$(objParent).find("input[class], select[class], textarea[class]").each(function(){
			$.setClassFormat($(this));
		});
	},
	
	/**
	 * Document에 정의된 class 속성이 정의되어 있는 특정 Control Object(input, select, textarea)를 검색하여 Class Format에 맞게 onblur 이벤트와 데이터 포맷 및 디자인을 설정한다.
	 * @param {Object} objElement jQuery 타입의 오브젝트 or 스트링 타입의 오브젝트 ID
	 * @return 포맷된 스트링 문자열
	 * @author MPC R&D Team 
	 */	
	setClassFormat:function(objElement){
		var strClassName	= "";
		if(typeof(objElement) === "string"){
			var strElement = objElement;
			objElement = document.getElementById(strElement);
			if(objElement == null){TwbMsg(strElement + " " + TWB_MSG.TAG_NO_EXIST, "E");return;}
			objElement = $(strElement);
		}
		if(objElement.attr("class") != null){
			strClassName = objElement.attr("class").toLowerCase();
		}
		
		if(strClassName.indexOf("class_") >= 0){
			if(strClassName.indexOf("date") >= 0){
				if(strClassName.indexOf("time") >= 0){
					$(objElement).attr("maxlength", "19");
				}else{
					$(objElement).attr("maxlength", "10");
				}
			}else if(strClassName.indexOf("month") >= 0){
				$(objElement).attr("maxlength", "7");
			}else if(strClassName.indexOf("time") >= 0){
				$(objElement).attr("maxlength", "8");
			}else if(strClassName.indexOf("biz") >= 0){
				$(objElement).attr("maxlength", "12");
			}else if(strClassName.indexOf("rrn") >= 0){
				$(objElement).attr("maxlength", "14");
			}else if(strClassName.indexOf("post") >= 0){
				$(objElement).attr("maxlength", "7");
			}else if(strClassName.indexOf("tlno") >= 0){
				$(objElement).attr("maxlength", "14");
			}else if(strClassName.indexOf("number") >= 0){
				// https://jqueryui.com/spinner/
				//스피너 적용 (숫자 증감 버튼)
				//2020-07-09 주석처리(이건철) 충분히 테스트 후 적용 필요
				//1. 비활성화시 숨김처리 필요
				// $(objElement).spinner();
				$(objElement).spinner({
					step: 1,
					change: function (event, ui) {
						var val = event.target.value;
						var newVal = "";

						for (var i = val.length - 1, counter = 0; i >= 0; i--) {
							if (counter == 3) {
								counter = 0;
								newVal = "," + newVal;
							}
							counter++;
							newVal = val[i] + newVal;
						}

						event.target.value = newVal;
					}
				}).on("focus", function () {
					$(this).val($(this).val().replace(/,/g, ""));	//,제거 후 증감 처리
				});

				//숫자타입 - 양수
				if(strClassName.indexOf("positive") >= 0)
				{
					//input : 입력 이벤트
					//spinchange : spinner (숫자 증감 버튼 클릭 이벤트) 변경 이벤트
					$(objElement).on("input spinchange", function() {
						var number = $(objElement).val();

						if(number < 0) {
							this.value = 0;

							var strMsg = "0보다 작은 숫자는 입력할 수 없습니다.";

							var objDhxPop = null;

							objDhxPop = new dhtmlXPopup();
							objDhxPop.attachHTML("<p class='tt-info-txt is-red'>" + strMsg + "</p>");

							objDhxPop.attachEvent("onBeforeHide", function(){
								this.unload();
								return false;
							});

							var x = $(objElement).offset().left; // returns left position related to window
							var y = $(objElement).offset().top; // returns top position related to window
							var w = $(objElement).width();
							var h = $(objElement).height();

							objDhxPop.show(x, y, w, h);
							objDhxPop = null;
						}
					});
				}

				//spinner disabled 처리
				$(objElement).spinner( "option", "disabled", $(objElement).hasClass("twbDisabled") ? true : false );
			}

			if(strClassName.indexOf("picker") >= 0){
				$(objElement).blur(function(){
					if(!$(objElement).hasClass("twbDisabled") && $(objElement).prop("disabled") != "true" && $(objElement).attr("readonly") != "true"){
						var strPreVal = $(this).val(); 
						$(this).valExt(strPreVal, true);
						if(strPreVal !== "" && $(this).valExt() === ""){
							gobjDhxMsgPop.attachHTML("<p class='tt-info-txt is-red'>" + TWB_MSG.WRONG_DATA_FORMAT + "</p>");
					        gobjDhxMsgPop.show($(this).offset().left, $(this).offset().top, $(this).width(), $(this).height());
						}else{
							if($(this).valExt() !== ""){
								var strRangeId = $(this).attr("rangeId");
								if(typeof(strRangeId) !== "undefined"){
									strRangeId		= replaceAll(replaceAll(strRangeId, "FROM_DHXC", ""), "TO_DHXC", "");
									var strClass	= $(this).attr("class").toLowerCase();
									var strDiv		= replaceAll(strClass.substring(strClass.indexOf("class_"), strClass.indexOf("picker")), "class_", "");
									var _strDiv		= strDiv.toUpperCase();
									var strMsg		= "";
									if(_strDiv === "DATE"){
										_strDiv = "DAY";
										strMsg = TWB_MSG.OVER_DAY_CONFIRM;
									}else{
										strMsg = TWB_MSG.OVER_MONTH_CONFIRM;
									}
									
									var objFromInput	= $(".class_" + strDiv + "picker[rangeId='" + strRangeId + "FROM_DHXC']");
									var objToInput		= $(".class_" + strDiv + "picker[rangeId='" + strRangeId + "TO_DHXC']");
									var intMaxTerm		= $(this).attr("maxTerm");
									var strFrom			= $(objFromInput).valExt();
									var strTo			= $(objToInput).valExt();
									var intTerm			= -1;
									if(typeof(intMaxTerm) !== "undefined"){
										intMaxTerm	= parseInt(intMaxTerm, 10);
										if(strFrom !== "" && strTo !== ""){
											if(strFrom.length < 8){strFrom = strFrom + "01";}
											if(strTo.length < 8){strTo = strTo + "01";}
											intTerm = parseInt($.selectDiffDate(_strDiv, strFrom, strTo),10) + 1;
											if(intTerm <= 0){
												$(this).val("");
												gobjDhxMsgPop.attachHTML("<p class='tt-info-txt is-red'>" + TWB_MSG.FROM_TO_DATE_CONFIRM + "</p>");
										        gobjDhxMsgPop.show($(this).offset().left, $(this).offset().top, $(this).width(), $(this).height());
											}else if(intTerm > 0){
												if(intTerm > intMaxTerm){
													$(this).val("");
													gobjDhxMsgPop.attachHTML("<p class='tt-info-txt is-red'>" + (intMaxTerm + strMsg) + "</p>");
											        gobjDhxMsgPop.show($(this).offset().left, $(this).offset().top, $(this).width(), $(this).height());
												}
											}
										}
									}else{
										if(strFrom !== "" && strTo !== ""){
											if(strFrom.length < 8){strFrom = strFrom + "01";}
											if(strTo.length < 8){strTo = strTo + "01";}
											intTerm = parseInt($.selectDiffDate(_strDiv, strFrom, strTo),10) + 1;
											if(intTerm <= 0){
												$(this).val("");
												gobjDhxMsgPop.attachHTML("<p class='tt-info-txt is-red'>" + TWB_MSG.FROM_TO_DATE_CONFIRM + "</p>");
												gobjDhxMsgPop.show($(this).offset().left, $(this).offset().top, $(this).width(), $(this).height());
											}
										}
									}
									strClass		= null;
									strDiv			= null;
									_strDiv			= null;
									strMsg			= null;
									objFromInput	= null;
									objToInput		= null;
									intMaxTerm		= null;
									strFrom			= null;
									strTo			= null;
									intTerm			= null;
								}
								strRangeId = null;
							}else{
								/*
								if($(this).hasClass("mandatory")){
									gobjDhxMsgPop.attachHTML("<font style='color:red;'>" + TWB_MSG.EMPTY_DATA_FILL + "</font>");
									gobjDhxMsgPop.show($(this).offset().left, $(this).offset().top, $(this).width(), $(this).height());
								}
								*/
							}
						}
						strPreVal = null;
					}
				});
			}else{
				$(objElement).blur(function(){
					if(!$(objElement).hasClass("twbDisabled") && $(objElement).prop("disabled") != "true" && $(objElement).attr("readonly") != "true"){
						var strPreVal = $(this).val(); 
						$(this).valExt($(this).val(), true);
						if(strPreVal !== "" && $(this).valExt() === ""){
							gobjDhxMsgPop.attachHTML("<p class='tt-info-txt is-red'>" + TWB_MSG.WRONG_DATA_FORMAT + "</p>");
							gobjDhxMsgPop.show($(this).offset().left, $(this).offset().top, $(this).width(), $(this).height());
						}else{
							/*
							if($(this).hasClass("mandatory") && $(this).valExt() === ""){
								gobjDhxMsgPop.attachHTML("<font style='color:red;'>" + TWB_MSG.EMPTY_DATA_FILL + "</font>");
								gobjDhxMsgPop.show($(this).offset().left, $(this).offset().top, $(this).width(), $(this).height());
							}
							*/
						}
						strPreVal = null;
					}
				});
			}
		}else{
			/*
			$(objElement).blur(function(){
				if(!$(objElement).hasClass("twbDisabled") && $(objElement).prop("disabled") != "true" && $(objElement).attr("readonly") != "true"){
					if($(this).hasClass("mandatory") && $(this).valExt() === ""){
						gobjDhxMsgPop.attachHTML("<font style='color:red;'>" + TWB_MSG.EMPTY_DATA_FILL + "</font>");
						gobjDhxMsgPop.show($(this).offset().left, $(this).offset().top, $(this).width(), $(this).height());
					}
				}
			});
			*/
		}
		
		strClassName = null;
	},
	
	/**
	 * objElement에 정의된 class 기준으로 값을 포맷해서 설정한다.
	 * @param {Object} objElement jQuery 타입의 오브젝트 or 스트링타입의 오브젝트 ID
	 * @param {boolean} blnValidate 포맷팅 규약에 어긋나는 값일 시 빈값으로 세팅여부
	 * @return 포맷된 스트링 문자열
	 * @author MPC R&D Team 
	 */	
	setClassFormatData:function(objElement, blnValidate){
		if(typeof(blnValidate) === "undefined"){blnValidate = false;}
		var strClassName = "";
		if(typeof(objElement) === "string"){
			var strElement = objElement;
			objElement = document.getElementById(strElement);
			if(objElement == null){TwbMsg(strElement + " " + TWB_MSG.TAG_NO_EXIST, "E");return;}
			objElement = $(strElement);
		}
		if(objElement.attr("class") != null){
			strClassName = objElement.attr("class").toLowerCase();	
		}

		if(strClassName.indexOf("class_datetime") >= 0){
			//날짜시간타입(분값을 시간타입으로 변경)	
			if($(objElement).val() !== ""){$(objElement).val(datetime_onCheck($(objElement).val(), (blnValidate ? "" : $(objElement).val())));}
		}else if(strClassName.indexOf("class_month") >= 0 || strClassName.indexOf("class_date") >= 0){
			//날짜타입	
			if($(objElement).val() !== ""){$(objElement).val(date_onCheck($(objElement).val(), (blnValidate ? "" : $(objElement).val())));}
		} else if(strClassName.indexOf("class_time") >= 0){
			//시간타입	
			if($(objElement).val() !== ""){$(objElement).val(time_onCheck($(objElement).val(), (blnValidate ? "" : $(objElement).val())));}
		} else if(strClassName.indexOf("class_tmtime") >= 0){
			//시간타입(초값을 시간타입으로 변경)	
			if($(objElement).val() !== ""){$(objElement).val(tmtime_onCheck($(objElement).val(), (blnValidate ? "" : $(objElement).val())));}
		} else if(strClassName.indexOf("class_mtime") >= 0){
			//시간타입(분값을 시간타입으로 변경)	
			if($(objElement).val() !== ""){$(objElement).val(mtime_onCheck($(objElement).val(), (blnValidate ? "" : $(objElement).val())));}
		} else if(strClassName.indexOf("class_number") >= 0){
			//숫자타입	
			if($(objElement).val() !== ""){$(objElement).val(number_onCheck($(objElement).val(), (blnValidate ? "" : $(objElement).val())));}
			
			//숫자타입 - 양수
			if(strClassName.indexOf("positive") >= 0)
			{
				//input : 입력 이벤트
				//spinchange : spinner (숫자 증감 버튼 클릭 이벤트) 변경 이벤트
				$(objElement).on("input spinchange", function() {
					var number = $(objElement).val() || 0;

					if(number < 0) {
						this.value = 0;

						var strMsg = "0보다 작은 숫자는 입력할 수 없습니다.";

						var objDhxPop = null;

						objDhxPop = new dhtmlXPopup();
						objDhxPop.attachHTML("<p class='tt-info-txt is-red'>" + strMsg + "</p>");

						objDhxPop.attachEvent("onBeforeHide", function(){
							this.unload();
							return false;
						});

						var x = $(objElement).offset().left; // returns left position related to window
						var y = $(objElement).offset().top; // returns top position related to window
						var w = $(objElement).width();
						var h = $(objElement).height();

						objDhxPop.show(x, y, w, h);
						objDhxPop = null;
					}
				});
			}
		} else if(strClassName.indexOf("class_float") >= 0){
			//숫자타입(소숫점1~4자리)
			var intPos = strClassName.indexOf("class_float") + 11;
			var intPoint = parseInt(strClassName.substring(intPos,intPos+1));
			if($(objElement).val() !== ""){$(objElement).val(float_onCheck($(objElement).val(), (blnValidate ? "" : $(objElement).val()), intPoint));}
		} else if(strClassName.indexOf("class_double") >= 0){
			//숫자타입(소수점2자리로 고정)
			if($(objElement).val() !== ""){$(objElement).val(double_onCheck($(objElement).val(), (blnValidate ? "" : $(objElement).val()), 0, 2));}
		} else if(strClassName.indexOf("class_biz") >= 0){
			//사업자번호
			if($(objElement).val() !== ""){$(objElement).val(biz_onCheck($(objElement).val(), (blnValidate ? "" : $(objElement).val())));}
		} else if(strClassName.indexOf("class_rrno") >= 0){
			//주민번호
			if($(objElement).val() !== ""){$(objElement).val(rrno_onCheck($(objElement).val(), (blnValidate ? "" : $(objElement).val())));}
		} else if(strClassName.indexOf("class_rrn") >= 0){
			//주민번호
			if($(objElement).val() !== ""){$(objElement).val(rrno_onEncriptCheck($(objElement).val(), (blnValidate ? "" : $(objElement).val())));}
		} else if(strClassName.indexOf("class_post") >= 0){
			//우편번호
			if($(objElement).val() !== ""){$(objElement).val(post_onCheck($(objElement).val(), (blnValidate ? "" : $(objElement).val())));}
		} else if(strClassName.indexOf("class_card") >= 0){
			//카드번호
			if($(objElement).val() !== ""){$(objElement).val(card_onCheck($(objElement).val(), (blnValidate ? "" : $(objElement).val())));}
		} else if(strClassName.indexOf("class_tlnoor") >= 0){
			//전화번호
			if($(objElement).val() !== ""){$(objElement).val(tlno_onCheck($(objElement).val(), (blnValidate ? "" : $(objElement).val())));}
		} else if(strClassName.indexOf("class_tlno") >= 0){
			//전화번호 마스킹
			if($(objElement).val() !== ""){$(objElement).val(tlno_onEncriptCheck($(objElement).val(), (blnValidate ? "" : $(objElement).val())));}
		} else {
		}
	},	

	/**
	 * objElement에 정의된 class 기준으로 값의 포맷을 제거하고 반환한다.
	 * @param {Object} objElement jQuery 타입의 오브젝트 or 스트링타입의 오브젝트 ID
	 * @return 포맷이 제거된 스트링 문자열
	 * @author MPC R&D Team 
	 */	
	getClassFormatData:function(objElement){
		var strClassName = "";
		if(typeof(objElement) === "string"){
			var strElement = objElement;
			objElement = document.getElementById(strElement);
			if(objElement == null){TwbMsg(strElement + " " + TWB_MSG.TAG_NO_EXIST, "E");return;}
			objElement = $(strElement);
		}else{
			objElement = $(objElement);
		}
		if(objElement.attr("class") != null){
			strClassName = objElement.attr("class").toLowerCase();	
		}
		var strRetValue = "";
		if(strClassName.indexOf("class_monthpicker") >= 0	||
		   strClassName.indexOf("class_datepicker") >= 0	||
		   strClassName.indexOf("class_date") >= 0			||
		   strClassName.indexOf("class_time") >= 0			||
		   strClassName.indexOf("class_tmtime") >= 0		||
		   strClassName.indexOf("class_mtime") >= 0			||
		   strClassName.indexOf("class_biz") >= 0			||
		   strClassName.indexOf("class_rrno") >=0 			||
		   strClassName.indexOf("class_post") >= 0			||
		   strClassName.indexOf("class_card") >= 0			||
		   strClassName.indexOf("class_tlnoor") >= 0)
		{
			strRetValue = $(objElement).val().replace(/[^0-9]/g, "");
		} else if(strClassName.indexOf("class_number") >= 0	||
				  strClassName.indexOf("class_float") >= 0	||
		   		  strClassName.indexOf("class_double") >= 0)
		{
			//숫자타입	
			strRetValue = $(objElement).val().replace(/[^0-9 . -]/g, "");
		} else if(strClassName.indexOf("class_rrn") >= 0	||
				  strClassName.indexOf("class_tlno") >= 0)
		{
			//주민번호	
			strRetValue = $(objElement).val().replace(/[^0-9 *]/g, "");
		} else {
			strRetValue = $(objElement).val();
		}
		
		return strRetValue;
	},		

	/**
	 * Teleweb Object 타입의 데이터를 키 기준으로 화면 박스에 로드한다.
	 * objForm 오브젝트 파라메터가 존재할 경우 해당 폼 태그에 데이터만 로드한다.
	 * Teleweb Framework 2.0부터 setFormData 함수명 사용(formPrintData함수명은 사용하지 않음)
	 * @param {Object} objData Teleweb Object 타입의 데이터
	 * @param {String} strGroupName Teleweb Object에 정의된 그룹명(미정의시 DATA)
	 * @param {Object} objForm Form 태그 객체 or Form ID(미정의시 화면에 모든 Object)
	 * @return 없음
	 * @author MPC R&D Team 
	 */	
	setFormData:function(objData, strGroupName, objForm){
		return $.formPrintData(objData, strGroupName, objForm);
	},
	//해당 함수(formPrintData)는 업무에서 직접 호출하지 않고 setFormData로 호출한다.
	formPrintData:function(objData, strGroupName, objForm){
		//폼객체 체크
		if(typeof(objForm) === "undefined"){objForm = null;}
		if(typeof(objForm) === "string"){
			var strFormID = objForm;
			objForm = document.getElementById(strFormID);
		}
		
		var objJsonData;
		if(typeof(objData.jsonData) !== "undefined"){
			if(typeof(strGroupName) !== "undefined"){
				objJsonData = objData.createGroup(strGroupName)[0];
			} else {
				objJsonData = objData.createGroup("DATA")[0];
			}
		} else {
			objJsonData = objData;
		}
		
		$.each(objJsonData, function(key, val){
			var objTarget = $("#" + key);
			if(objForm != null){
				objTarget = $("#" + key, objForm);
			}
			if(objTarget.length > 0){
				$(objTarget).valExt(val);
			}else{
				objTarget = $("input:radio[name='" + key + "']");
				if(objTarget.length > 0){
					if(objForm != null){
						objTarget = $("input:radio[name='" + key + "']", objForm);
					}
					if(objTarget.length > 0){
						$(objTarget).valExt(val);
					}
				}
			}
		});
		
		objJsonData=null;
	},	

	/**
	 * 화면 박스안에 데이터를 모두 지운다.(라디오버튼은 제외:개발자가 직접 초기화)
	 * objForm 오브젝트 파라메터가 존재할 경우 해당 폼 태그에 데이터만 지운다.
	 * @param {Object} objForm HTML Form객체 or ID
	 * @param {boolean} blnNumZero 데이터를 지울 때 숫자 포맷 박스값을 0으로 초기화할지 여부(미지정시 false)
	 * @param {boolean} blnHiddenClear Hidden 타입의 INPUT 값도 지울지 여부(미지정시 false)
	 * @return 없음
	 * @author MPC R&D Team 
	 */
	setFormDataClear:function(objForm, blnNumZero, blnHiddenClear){
		//폼객체 체크
		if(typeof(objForm) === "string"){
			var strFormID = objForm;
			objForm = document.getElementById(strFormID);
			if(objForm == null){TwbMsg(strFormID + " " + TWB_MSG.FORM_NO_EXIST, "E");return;}
		}else{
			if($(objForm).length == 0){
				TwbMsg(TWB_MSG.FORM_NO_EXIST, "E");
				return;
			}
		}
		
		if(typeof(blnNumZero) === "undefined"){blnNumZero=false;}
		if(typeof(blnHiddenClear) === "undefined"){blnHiddenClear=false;}
		
		//해당 폼객체의 컨트롤 오브젝트만 처리
		var strType = "";
		var strClassName = "";
		var blnIsNum = false;
		$(":input", objForm).each(function(){
			blnIsNum = false;
			if(typeof(this.id) !== "undefined" && this.id != null && this.id !== ""){
				if((this.id).indexOf("dhxcombo") >= 0 || (this.id).indexOf("_PAGING_BAR_INPUT") >= 0){
					return true;
				}
			}
			if(typeof($(this).attr("class")) !== "undefined" && $(this).attr("class") !== ""){
				strClassName = $(this).attr("class").toLowerCase();
			}
			if(strClassName.indexOf("class_number") >= 0 || strClassName.indexOf("class_float") >= 0 || strClassName.indexOf("class_double") >= 0 ){blnIsNum = true;}
			switch($(this).attr("type")){
				case "checkbox" :
					//체크박스는 체크만 해제함
					try{$(this).iCheck("uncheck");}catch(E){console.log("error=", E);}
					$(this).prop("checked",false);
					break;
				case "radio" :
					//라디오버튼 (초기값이 Y일지 1일지 N일지 0일지 알수 없기 때문에 처리하지 않음)
					break;
				case "hidden" :
					if(blnHiddenClear){$(this).valExt("");}
					break;
				default :
					if(blnIsNum && blnNumZero){$(this).valExt(0);}
					else{$(this).valExt("");}
					break;
			}
		});
		
		strType = null;
		strClassName = null;
		blnIsNum = null;
	},	

	/**
	 * 화면상의 모든 input element 데이터의 값을 해당 element ID를 KEY값으로 하는 JSON Array 형태로 반환한다.
	 * objFormID 오브젝트 파라메터가 존재할 경우 해당 폼 태그에 속한 컨트롤태그만 반환한다.
	 * Teleweb Framework 2.0부터 getFormData 함수명 사용(formGetData함수명은 사용하지 않음)
	 * @param {Object} objFormID Form 태그 객체 or Form ID
	 * @param {boolean} blnFormat 값 설정시 포맷을 제거할지 여부(true:제거하지않음, false:포맷을제거하고 값만 설정)
	 * @return JSON Array
	 * @author MPC R&D Team 
	 */
	getFormData : function(objFormID, blnFormat){
		return $.formGetData(objFormID, blnFormat);
	},
	//해당 함수(formGetData)는 업무에서 직접 호출하지 않고 getFormData로 호출한다.
	formGetData : function(objFormID, blnFormat){
		var objRetJsonData = {};
		if(typeof(blnFormat) === "undefined"){blnFormat = true;}
		
		var objRootTag; 
		if(typeof(objFormID) === "undefined"){
			objRootTag = $(":input");
		} else {
			if(typeof(objFormID) === "string"){
				var strFormID = "";
				strFormID = objFormID; 
				objFormID = document.getElementById(strFormID);
				if(objFormID == null){TwbMsg(strFormID + " " + TWB_MSG.FORM_NO_EXIST, "E");return;}
			}
			objRootTag = $(":input", objFormID);
		}

		objRootTag.each(function(){
			var objIdTag	= null;
			var objNameTag	= null;
			if(typeof(this.id) !== "undefined" && this.id != null && this.id !== "" && (this.id).indexOf("dhxcombo") < 0 && (this.id).indexOf("_PAGING_BAR_INPUT") < 0){
				objIdTag = $("#" + this.id);
			}
			if(typeof(this.name) !== "undefined" && this.name != null && this.name !== "" && (this.name).indexOf("dhxcombo") < 0 && (this.name).indexOf("_PAGING_BAR_INPUT") < 0){
				objNameTag = $("#" + this.name);
			}
			
			if(objIdTag != null || objNameTag != null){
				if(typeof(objFormID) !== "undefined"){
					if(typeof(objFormID) === "string"){
						var strFormID = objFormID;
						objFormID = document.getElementById(strFormID);
						if(objFormID == null){TwbMsg(strFormID + " " + TWB_MSG.FORM_NO_EXIST, "E");return;}
					}
					if(objIdTag != null){objIdTag = $("#" + this.id,objFormID);}
					if(objNameTag != null){objNameTag = $("#" + this.name,objFormID);}
				}
			}else{
				return true;
			}
			
			//ID 또는 NAME 속성이 존재할 경우만 처리
			if( this.id != "" || this.name != "" ){
				if( this.tagName=="INPUT" ){
					if(this.id != ""){
						if(this.type === "checkbox"){
							if(this.checked){
								if(this.value !== "on"){
									objRetJsonData[this.id] = objIdTag.valExt();
								} else {
									objRetJsonData[this.id] = "true";
								}	
							}else{
								objRetJsonData[this.id] = "";
							}
						}else if(this.type === "radio"){
							if($(":input:radio[name="+this.id+"]:checked").length > 0){
								objRetJsonData[this.id] = $(":input:radio[name="+this.id+"]:checked").valExt();
							}else{
								objRetJsonData[this.id] = "";
							}
						}else{
							if(blnFormat){
								objRetJsonData[this.id] = objIdTag.val();
							}else{
								objRetJsonData[this.id] = objIdTag.valExt();
							}
						}
					}else if(this.id == "" && this.name != "" ){
						if(this.type === "checkbox"){
							if(this.checked){
								if(this.value !== "on"){
									objRetJsonData[this.name] = objIdTag.valExt();
								} else {
									objRetJsonData[this.name] = "true";
								}	
							}else{
								objRetJsonData[this.name] = "";
							}
						}else if(this.type === "radio"){
							if($(":input:radio[name="+this.name+"]:checked").length > 0){
								objRetJsonData[this.name] = $(":input:radio[name="+this.name+"]:checked").valExt();
							}else{
								objRetJsonData[this.name] = "";
							}
						}else{
							if(blnFormat){
								objRetJsonData[this.name] =  objNameTag.val();
							}else{
								objRetJsonData[this.name] =  objNameTag.valExt();
							}
						}	
					}
				}else if(this.tagName == "SELECT") {
					if(this.id !=""){
						objRetJsonData[this.id] = objIdTag.valExt();	
					}else if(this.id =="" && this.name != ""){
						objRetJsonData[this.name] = objNameTag.valExt();
					}
				}else if( this.tagName == "TEXTAREA" ) {
					if(this.id != ""){
						objRetJsonData[this.id] = objIdTag.valExt();
					}else if(this.id == "" && this.name != ""){
						objRetJsonData[this.name] = objNameTag.valExt();
					}
				}
			}	
		});
		
		return objRetJsonData;
	},
	
	/**
	 * Document에 정의된 Control Object의 데이터에 대한 기본적인 체크를 한다.
	 * class가 mandantory로 정의된 필수 항목 체크
	 * maxlength 체크
	 * @param {Object} objForm Form 태그 객체 or Form ID
	 * @return true:정상, false:이상
	 * @author MPC R&D Team 
	 */
	checkDataValidation:function(objForm){
		if(typeof(objForm) === "undefined"){
			objForm = null;
		}else{
			if(typeof(objForm) === "string"){
				var strFormID = objForm;
				objForm = document.getElementById(strFormID);
				if(objForm == null){TwbMsg(strFormID + " " + TWB_MSG.FORM_NO_EXIST, "E");return;}
			}
		}
		var objCheckArray = [];
		//포커스 설정을 최상단에 두기위해 역순으로 each 작업하도록 함.
		$($(("input[class],  textarea[class]"), objForm).get().reverse()).each(function(){
			var objElement = $(this);
			var strMsg = "";
			//클래스명추출
			var strClassName = "";
			if(objElement.attr("class") != null){
				strClassName = objElement.attr("class").toLowerCase();	
			}	
			//필수사항 클래스가 존재할 경우 해당 값이 있는지 확인함
			if(strClassName.indexOf("mandatory") >= 0){
				if(objElement.valExt() === null || objElement.valExt() === ""){
					strMsg = objElement.attr("title") + " 은(는) 필수입력입니다.";
					$(objElement).focus(); //포커스 
				}
			}
			//maxLength가 존재할 경우 길이를 초과한 것이 있는지 체크함
			if(this.tagName !== "SELECT"){
				if(typeof(objElement.attr("maxlength")) !== "undefined"){
					var intMaxLength = Number(objElement.attr("maxlength")); 
					var intValLength = getByte(objElement.valExt());
					if(intValLength > intMaxLength){
						if(strMsg !== ""){strMsg = strMsg + "\n";}
						strMsg = strMsg + objElement.attr("title") + " 의 길이가 초과되었습니다.[최대(" + intMaxLength + "),입력값(" + intValLength + ")]";
						$(objElement).focus(); //포커스 
					}
				}
			}
			if(strMsg !== ""){
				strMsg = "<p class='tt-info-txt is-red'>" + strMsg + "</p>";
				objCheckArray.push({target:objElement, message:strMsg});
			}
		});
		
		var blnRetVal = false;
		var objDhxPop = null;
		if(objCheckArray.length > 0){
			for(var i = 0; i < objCheckArray.length; i++){
				objDhxPop = new dhtmlXPopup();
				objDhxPop.attachHTML(objCheckArray[i].message);
				objDhxPop.attachEvent("onBeforeHide", function(){
					this.unload();
					return false;
				});
				
				if($(objCheckArray[i].target).hasClass("twbCombo")){
					objCheckArray[i].target = $(objCheckArray[i].target).next();
				}
				
				var x = $(objCheckArray[i].target).offset().left; // returns left position related to window
		        var y = $(objCheckArray[i].target).offset().top; // returns top position related to window
		        var w = $(objCheckArray[i].target).width();
		        var h = $(objCheckArray[i].target).height();
		        
		        objDhxPop.show(x, y, w, h);
			}
			
			objDhxPop = null;
			
			blnRetVal = false;
		}else{
			blnRetVal = true;
		}
		
		objCheckArray = null;
		
		return blnRetVal;
	},	
	
	/**
	 * 폼객체 그룹안에 모든 컨트롤박스에 대해 일괄 enabled disabled, 데이터 초기화 처리를 한다.
	 * @param {Object} objForm Form 태그 객체 or Form ID
	 * @param {boolean} blnIsDisabled true : Disabled 처리, false : Enabled 처리
	 * @param {boolean} blnIsClear true : 초기화 함, false : 초기화 처리하지 않음
	 * @param {boolean} blnNumZero true : 숫자타입 0으로 초기화, false : 빈문자로 초기화(미정의시 false)
	 * @return 없음
	 * @author MPC R&D Team
	 */
	setFormDisabled : function (objForm, blnIsDisabled, blnIsClear, blnNumZero){
		//폼객체 체크
		if(typeof(objForm) === "string"){
			var strFormID = objForm;
			objForm = document.getElementById(strFormID);
			if(objForm == null){TwbMsg(strFormID + " " + TWB_MSG.FORM_NO_EXIST, "E");return;}
		}else{
			if($(objForm).length == 0){
				TwbMsg(TWB_MSG.FORM_NO_EXIST, "E");
				return;
			}
		}
		
		if(typeof(blnIsDisabled) === "undefined"){blnIsDisabled = true;}
		if(typeof(blnIsClear) === "undefined"){blnIsClear = true;}
		if(typeof(blnNumZero) === "undefined"){blnNumZero = false;}
		
		//해당 폼객체의 컨트롤 오브젝트만 처리
		$(":input", objForm).each(function(){
			$.inputDisabled(this, blnIsDisabled, blnIsClear, blnNumZero);

			//spinner disabled 처리
			if ($(this).hasClass("class_number"))
			{
				$(this).spinner( "option", "disabled", $(this).hasClass("twbDisabled") ? true : false );
			}
		});
	},
	
	/**
	 * 타겟 컨트롤박스에 대해 enabled disabled, 데이터 초기화 처리를 한다.
	 * @param {Object} objTarget 타겟 컨트롤박스 오브젝트
	 * @param {boolean} blnIsDisabled true : Disabled 처리, false : Enabled 처리
	 * @param {boolean} blnIsClear true : 초기화 함, false : 초기화 처리하지 않음
	 * @param {boolean} blnNumZero true : 숫자타입 0으로 초기화, false : 빈문자로 초기화(미정의시 false)
	 * @return 없음
	 * @author MPC R&D Team
	 */
	inputDisabled:function(objTarget, blnIsDisabled, blnIsClear, blnNumZero){
		if(typeof(objTarget) === "undefined" || objTarget.length == 0){return;}
		
		if(typeof(objTarget.id) !== "undefined" && objTarget.id != null && objTarget.id !== ""){
			if((objTarget.id).indexOf("dhxcombo") >= 0 || (objTarget.id).indexOf("_PAGING_BAR_INPUT") >= 0){
				return;
			}
		}
		
		var strType = $(objTarget).prop("type");
		var strDisableClassNm = "twbDisabled";
		
		switch(strType){
			case "radio" :
				if($(objTarget).hasClass("twbRadio")){
					if(blnIsDisabled){
						$(objTarget).iCheck("disable");
						if(!$(objTarget).hasClass(strDisableClassNm)){
							$(objTarget).addClass(strDisableClassNm)
						}
					}else{
						$(objTarget).iCheck("enable");
						if($(objTarget).hasClass(strDisableClassNm)){
							$(objTarget).removeClass(strDisableClassNm)
						}
					}
					if(blnIsClear){$(objTarget).iCheck("uncheck");}
				}else{
					if(blnIsDisabled){
						
					}else{
						
					}
					if(blnIsClear){}
				}
				
				break;
			case "checkbox" :
				if($(objTarget).hasClass("twbCheckbox")){
					if(blnIsDisabled){
						$(objTarget).iCheck("disable");
						if(!$(objTarget).hasClass(strDisableClassNm)){
							$(objTarget).addClass(strDisableClassNm)
						}
					}else{
						$(objTarget).iCheck("enable");
						if($(objTarget).hasClass(strDisableClassNm)){
							$(objTarget).removeClass(strDisableClassNm)
						}
					}
					if(blnIsClear){$(objTarget).iCheck("uncheck");}
				}else{
					if(blnIsDisabled){
						
					}else{
						
					}
					if(blnIsClear){}
				}
				
				break;
			case "select-one" :
				$(objTarget).prop("disabled", blnIsDisabled);
				
				var objDhxCombo = null;
				$(objTarget).each(function(){
					objDhxCombo = this.dhxCombo;
				});
				
				if(typeof(objDhxCombo) !== "undefined" && objDhxCombo != null){
					if(blnIsDisabled){
						objDhxCombo.disable();
						if(!$(objTarget).hasClass(strDisableClassNm)){
							$(objTarget).addClass(strDisableClassNm);
							$(objDhxCombo.getBase()).addClass(strDisableClassNm);
							$(objDhxCombo.getBase()).find(".dhxcombo_select_button").addClass(strDisableClassNm);
							$(objDhxCombo.getBase()).find(".twbCombo_selected").addClass(strDisableClassNm);
						}
					}else{
						objDhxCombo.enable();
						if($(objTarget).hasClass(strDisableClassNm)){
							$(objTarget).removeClass(strDisableClassNm);
							$(objDhxCombo.getBase()).removeClass(strDisableClassNm);
							$(objDhxCombo.getBase()).find(".dhxcombo_select_button").removeClass(strDisableClassNm);
							$(objDhxCombo.getBase()).find(".twbCombo_selected").removeClass(strDisableClassNm);
						}
					}
				}else{
					if(blnIsDisabled){
						if(!$(objTarget).hasClass(strDisableClassNm)){
							$(objTarget).addClass(strDisableClassNm);
						}
					}else{
						if($(objTarget).hasClass(strDisableClassNm)){
							$(objTarget).removeClass(strDisableClassNm);
						}
					}
				}
				
				if(blnIsClear){$(objTarget).valExt("");}
				
				if($(objTarget).hasClass("mandatory")){
					$(objDhxCombo.getBase()).addClass("mandatory");
				}
				
				objDhxCombo = null;
				
				break;
			case "select-multiple" :
				$(objTarget).prop("disabled", blnIsDisabled);
				
				var objDhxCombo = null;
				$(objTarget).each(function(){
					objDhxCombo = this.dhxCombo;
				});
				
				if(typeof(objDhxCombo) !== "undefined" && objDhxCombo != null){
					if(blnIsDisabled){
						objDhxCombo.disable();
						if(!$(objTarget).hasClass(strDisableClassNm)){
							$(objTarget).addClass(strDisableClassNm)
							$(objDhxCombo.getBase()).addClass(strDisableClassNm);
							$(objDhxCombo.getBase()).find(".twbCombo_selected").addClass(strDisableClassNm);
							$(objDhxCombo.getBase()).find("div").each(function(){
								$(this).addClass(strDisableClassNm);
							});
						}
					}else{
						objDhxCombo.enable();
						if($(objTarget).hasClass(strDisableClassNm)){
							$(objTarget).removeClass(strDisableClassNm)
							$(objDhxCombo.getBase()).removeClass(strDisableClassNm);
							$(objDhxCombo.getBase()).find(".twbCombo_selected").removeClass(strDisableClassNm);
							$(objDhxCombo.getBase()).find("div").each(function(){
								$(this).removeClass(strDisableClassNm);
							});
						}
					}
				}else{
					if(blnIsDisabled){
						if(!$(objTarget).hasClass(strDisableClassNm)){
							$(objTarget).addClass(strDisableClassNm);
						}
					}else{
						if($(objTarget).hasClass(strDisableClassNm)){
							$(objTarget).removeClass(strDisableClassNm);
						}
					}
				}
				
				if(blnIsClear){$(objTarget).valExt("");}
				
				if($(objTarget).hasClass("mandatory")){
					$(objDhxCombo.getBase()).addClass("mandatory");
				}
				
				objDhxCombo = null;
				
				break;
			default :
				$(objTarget).prop("readonly", blnIsDisabled);
				if(blnIsDisabled){
					if(!$(objTarget).hasClass(strDisableClassNm)){
						$(objTarget).addClass(strDisableClassNm)
					}
					if($(objTarget).hasClass("class_datepicker") || $(objTarget).hasClass("class_monthpicker") || $(objTarget).hasClass("class_timepicker")){
						if(!$(objTarget).next().hasClass(strDisableClassNm)){
							$(objTarget).next().addClass(strDisableClassNm)
						}
					}
				}else{
					if($(objTarget).hasClass(strDisableClassNm)){
						$(objTarget).removeClass(strDisableClassNm)
					}
					if($(objTarget).hasClass("class_datepicker") || $(objTarget).hasClass("class_monthpicker") || $(objTarget).hasClass("class_timepicker")){
						if($(objTarget).next().hasClass(strDisableClassNm)){
							$(objTarget).next().removeClass(strDisableClassNm)
						}
					}
				}
				if(blnIsClear){
					$(objTarget).valExt("");
					var strClass = $(objTarget).attr("class");
					if(blnNumZero && (strClass.indexOf("class_number") >= 0 || strClass.indexOf("class_float") >= 0 || strClass.indexOf("class_double") >= 0)){
						$(objTarget).valExt(0);
					}
				}
				
				break;
		}
	},
	
	/**
	 * 컨트롤박스에 대해 일괄 enabled disabled, 데이터 초기화 처리를 한다.
	 * @param {Object} objArray 배열 구조 ["formId.ID","ID","ID"] 또는 [{name:"formId.ID",disabled:true,clear:true,numzero:true},{name:"ID",disabled:false,clear:false,numzero:true}]
	 * @param {boolean} blnIsDisabled true : Disabled 처리, false : Enabled 처리
	 * @param {boolean} blnIsClear true : 초기화 함, false : 초기화 처리하지 않음
	 * @param {boolean} blnNumZero true : 숫자타입 0으로 초기화, false : 빈문자로 초기화(미정의시 false)
	 * @return 없음
	 * @author MPC R&D Team 
	 */
	input_disabled : function (objArray, blnIsDisabled, blnIsClear, blnNumZero){
		if(typeof(objArray) === "undefined"){return;}
		if(typeof(blnIsDisabled) === "undefined"){blnIsDisabled = true;}
		if(typeof(blnIsClear) === "undefined"){blnIsClear = true;}
		if(typeof(blnNumZero) === "undefined"){blnNumZero = false;}
		
		var objInputArry = [];
		if(typeof(objArray[0]) === "string"){
			for(var i = 0; i < objArray.length; i++){
				objInputArry.push({name:objArray[i], disabled:blnIsDisabled, clear:blnIsClear, numzero:blnNumZero});
			}
		}else{
			for(var i = 0; i < objArray.length; i++){
				if(typeof(objArray[i].disabled) === "undefined"){objArray[i].disabled = true;}
				if(typeof(objArray[i].blnIsClear) === "undefined"){objArray[i].blnIsClear = true;}
				if(typeof(objArray[i].blnNumZero) === "undefined"){objArray[i].blnNumZero = false;}
			}
			objInputArry = objArray;
		}
		
		var objTarget = null;
		var objForm = null;
		var objSplitArry = null;
		for(var j = 0; j < objInputArry.length; j++){
			objTarget		= null;
			objForm			= null;
			objSplitArry	= null;
			if((objInputArry[j].name).indexOf(".") >= 0){
				objSplitArry = (objInputArry[j].name).split(".");
				objForm = $("#" + objSplitArry[0]); 
				if(objForm.length == 0){
					objTarget = $("#" + objSplitArry[1]);
				}else{
					objTarget = $("#" + objSplitArry[1], objForm);
				}
			}else{
				objTarget = $("#" + objInputArry[j].name);
			}
			if(objTarget.length > 0){
				$.inputDisabled(objTarget, objInputArry[j].disabled, objInputArry[j].clear, objInputArry[j].numzero);

				//spinner disabled 처리
				if (objTarget.hasClass("class_number"))
				{
					objTarget.spinner( "option", "disabled", objTarget.hasClass("twbDisabled") ? true : false );
				}
			}
		}
		
		objArray = null;
		objInputArry = null;
	},
	
	/**
	 * 활성화버튼, 비활성화버튼에 대해 일괄 enabled disabled 처리를 한다.(div와 i태그 구조의 버튼)
	 * @param {Object} objArray 배열 구조. ["Img ID","Img ID","Img ID"] 또는 [{name:"Img ID",disabled:true},{name:"Img ID",disabled:false}]  
	 * @param {boolean} blnIsDisabled true : Disabled 처리, false : Enabled 처리
	 * @return 없음
	 * @author MPC R&D Team 
	 */	
	btn_disabled: function(objArray,blnIsDisabled){
		if(typeof(objArray) === "undefined"){return;}
		if(typeof(blnIsDisabled) === "undefined"){blnIsDisabled = true;}
		
		var objBtnArry = [];
		if(typeof(objArray[0]) === "string"){
			for(var i = 0; i < objArray.length; i++){
				objBtnArry.push({name:objArray[i], disabled:blnIsDisabled});
			}
		}else{
			for(var i = 0; i < objArray.length; i++){
				if(typeof(objArray[i].disabled) === "undefined"){objArray[i].disabled = true;}
			}
			objBtnArry = objArray;
		}
		
		var objTarget 		= null;
		var objForm			= null;
		var objSplitArry	= null;
		var objChild		= null;
		
		for(var j = 0; j < objBtnArry.length; j++){
			objForm			= null;
			objSplitArry	= null;
			objChild		= null;
			if((objBtnArry[j].name).indexOf(".") >= 0){
				objSplitArry = (objBtnArry[j].name).split(".");
				objForm = $("#" + objSplitArry[0]); 
				if(objForm.length == 0){
					objTarget = $("#" + objSplitArry[1]);
				}else{
					objTarget = $("#" + objSplitArry[1], objForm);
				}
			}else{
				objTarget = $("#" + objBtnArry[j].name);
			}
			if(objTarget.length > 0){
				objChild = $(objTarget).children();
				$(objTarget).attr("disabled", objBtnArry[j].disabled);
				if(objChild.length > 0){
					$(objChild).attr("disabled", objBtnArry[j].disabled);
				}
				if(objBtnArry[j].disabled){
					if(!$(objTarget).hasClass("twbDisabled")){
						$(objTarget).addClass("twbDisabled");
						if(objChild.length > 0){
							objChild.addClass("twbDisabled");
						}
					}
				}else{
					if($(objTarget).hasClass("twbDisabled")){
						$(objTarget).removeClass("twbDisabled");
						if(objChild.length > 0){
							objChild.removeClass("twbDisabled");
						}
					}
				}
			}
		}
		
		objArray = null;
		objBtnArry = null;
	},
	
	/**
	 * 활성화버튼, 비활성화버튼에 대해 일괄 show hide 처리를 한다.(div 와 span 태그와 a태그 구조의 버튼)
	 * @param {Object} objArrayID 배열 구조의 img ID ["Img ID","Img ID","Img ID"] 또는 [{name:"Img ID",visibled:true},{name:"Img ID",visibled:false}]
	 * @param {boolean} blnIsVisible true : show 처리, false : hide 처리
	 * @return 없음
	 * @author MPC R&D Team
	 */
	btn_visibled: function(objArrayID,blnIsVisible){
		if(typeof(objArrayID) === "undefined"){return;}
		if(typeof(blnIsVisible) === "undefined"){blnIsVisible = true;}
		
		var objBtnArry = [];
		if(typeof(objArrayID[0]) === "string"){
			for(var i = 0; i < objArrayID.length; i++){
				objBtnArry.push({name:objArrayID[i], visibled:blnIsVisible});
			}
		}else{
			for(var i = 0; i < objArrayID.length; i++){
				if(typeof(objArrayID[i].visibled) === "undefined"){objArrayID[i].visibled = true;}
			}
			objBtnArry = objArrayID;
		}
		
		var objTarget 		= null;
		var objForm			= null;
		var objSplitArry	= null;
		var objChild		= null;
		
		for(var j = 0; j < objBtnArry.length; j++){
			objForm			= null;
			objSplitArry	= null;
			objChild		= null;
			if((objBtnArry[j].name).indexOf(".") >= 0){
				objSplitArry = (objBtnArry[j].name).split(".");
				objForm = $("#" + objSplitArry[0]); 
				if(objForm.length == 0){
					objTarget = $("#" + objSplitArry[1]);
				}else{
					objTarget = $("#" + objSplitArry[1], objForm);
				}
			}else{
				objTarget = $("#" + objBtnArry[j].name);
			}
			if(objTarget.length > 0){
				if(!objBtnArry[j].visibled){
					$(objTarget).hide();
					$(objTarget).attr("userhide", "true");
				}else{
					$(objTarget).show();
					$(objTarget).removeAttr("userhide");
				}
			}
		}
		
		objArray = null;
		objBtnArry = null;
	},
	
	/**
	 * 자리수 만큼 문자열 채워준다.
	 * @param {String} strVal 베이스 문자열.  
	 * @param {int} intLen 리턴 문자열 자리수.
	 * @param {String} strExtVal 문자열 자리수에 맞춰 채워넣을 문자열.
	 * @param {String} strDirection 문자열 채울 방향 'L', 'R' 
	 * @return {String} strRetVal 반환되는 padding 문자열
	 * @author MPC R&D Team 
	 */	
	setTxtPad:function(strVal, intLen, strExtVal, strDirection){
		if(typeof(strVal) === "undefined"){return "";}
		if(typeof(strVal) !== "string"){strVal = strVal.toString();}
		if(typeof(intLen) === "undefined"){intLen = 0;}
		if(typeof(strExtVal) === "undefined"){return strVal;}
		if(typeof(strDirection) === "undefined"){strDirection = "L";}
		if(strVal.length >= intLen){return strVal;}
		
		var strRetVal = strVal;
		intLen = intLen - strVal.length;
		for(var i = 0 ; i < intLen; i++){
			if(strDirection === "L"){
				strRetVal = strExtVal + strRetVal;
			}else{
				strRetVal = strRetVal + strExtVal;
			}
		}
		
		return strRetVal;
	},
	rpad:function(strVal, intLen, strExtVal){
		return $.setTxtPad(strVal, intLen, strExtVal, "L");
	}
	,lpad : function(str , _length, ch_str){
		return $.setTxtPad(strVal, intLen, strExtVal, "R");
	},
	
	
	/**
	 * 콤보박스에 데이터를 새롭게 로드하거나 기존 데이터에 데이터를 추가한다.
	 * @param {Object} objCombo 데이터를 로드할 콤보박스 $(오브젝트) or ID / 특정 Form 객체안에 콤보박스만 로드할 경우 "FormID.ComboID" 구조로 표시 
	 * @param {Object} objJsonArray 콤보박스에 로드할 JSONArray 타입의 데이터(KeyName이 CD, CD_NM 구조)
	 * @param {String} strHeadText 초기 데이터표시가 필요할 경우 텍스트 값(예:선택, 전체, ...) 
	 * @param {String} strHeadValue 초기 데이터표시가 필요할 경우 텍스트의 Value
	 * @param {boolean} blnAppen 데이터에 Append할지 여부(true:Append, false or 미정의시: Clear 후 생성)
	 * @return 없음
	 * @author MPC R&D Team 
	 */
	loadDataComboBox:function(objCombo, objJsonArray, strHeadText, strHeadValue, blnAppend){
		if( typeof(objCombo) == "string" ){
			var objComboSplit = objCombo.split(".");
			if(objComboSplit.length === 1){
				objCombo = $("#" + objComboSplit[0]);
			} else{
				objCombo = $("#" + objComboSplit[1], document.getElementById(objComboSplit[0]));
			}
		}
		
		if(typeof(blnAppend )=== "undefined" ){blnAppend = false;}
		if(typeof(objJsonArray) === "undefined" || objJsonArray == null || $.toJSON(objJsonArray) === "[{}]"){return;}
		
		var objDhxCombo = null;
		$(objCombo).each(function(){
			objDhxCombo = this.dhxCombo;
		});
		var objData = [];
		var strOption = "";
		if(typeof(objDhxCombo) !== "undefined"){
			objDhxCombo.clearAll();
			$(objCombo).html("");
			if(typeof(strHeadText) !== "undefined" && strHeadText !== ""){
				if(typeof(strHeadValue) === "undefined"){strHeadValue = "";}
				objData.push({value:strHeadValue, text:strHeadText});
				strOption += "<option value='" + strHeadValue + "'>" + strHeadText + "</option>";
			}else{
				if(typeof($(objCombo).attr("multiple")) !== "undefined"){
					objData.push({value:"", text:"전체"});
					strOption += "<option value=''>전체</option>";
				}
			}
			if(blnAppend){
				var objPreOption = null;
				objDhxCombo.forEachOption(function(optId){
					objPreOption = objDhxCombo.getOptionByIndex(optId.index);
					if(objPreOption.value != ""){
						objData.push({value:objPreOption.value, text:objPreOption.text});
						strOption += "<option value='" + objPreOption.value + "'>" + objPreOption.text + "</option>";
					}
				});
				objPreOption = null;
			}
			for(var i = 0; i < objJsonArray.length; i++){
				objData.push({value:objJsonArray[i].CD, text:objJsonArray[i].CD_NM});
				strOption += "<option value='" + objJsonArray[i].CD + "'>" + objJsonArray[i].CD_NM + "</option>";
			}
			$(objCombo).html(strOption);
			objDhxCombo.addOption(objData);
			if(typeof($(objCombo).attr("multiple")) === "undefined"){
				$(objCombo).val(objData[0].value);
				objDhxCombo.selectOption(0);
				$(objDhxCombo.getBase()).find(".twbCombo_selected").text(objData[0].text);
			}
		}
	},
	
	/**
	 * 콤보박스 데이터를 초기화한다.(초기화시 초기값을 설정할 수 있다)
	 * @param {Object} objCombo 데이터를 초기화할 콤보박스 $(오브젝트) or ID / 특정 Form객체의 콤보박스를 초기화할 경우에는 "FormID.ComboID" 구조로 표시 
	 * @param {String} strHeadText 초기 데이터표시가 필요할 경우 텍스트 값(예:선택, 전체, ...) 
	 * @param {String} strHeadValue 초기 데이터표시가 필요할 경우 텍스트의 Value
	 * @return 없음
	 * @author MPC R&D Team 
	 */
	clearDataComboBox:function(objCombo, strHeadText, strHeadValue){
		if( typeof(objCombo) == "string" ){
			var objComboSplit = objCombo.split(".");
			if(objComboSplit.length === 1){
				objCombo = $("#" + objComboSplit[0]);
			} else{
				objCombo = $("#" + objComboSplit[1], document.getElementById(objComboSplit[0]));
			}
		}
		
		objCombo.html("");
		var objDhxCombo = null;
		$(objCombo).each(function(){
			objDhxCombo = this.dhxCombo;
		});
		if(typeof(objDhxCombo) !== "undefined" && objDhxCombo != null){
			$(objDhxCombo.getBase()).find(".twbCombo_selected").text("");
			objDhxCombo.clearAll();
		}
		if(typeof(strHeadText) !== "undefined"){
			if(typeof(strHeadValue) === "undefined"){strHeadValue = "";}
			if(typeof($(objCombo).attr("multiple")) !== "undefined"){
				objCombo.html("<option value=''>전체</option>");
			}else{
				objCombo.html("<option value='" + strHeadValue + "'>" + strHeadText + "</option>");
			}
			if(typeof(objDhxCombo) !== "undefined" && objDhxCombo != null){
				var objData = [];
				if(typeof($(objCombo).attr("multiple")) !== "undefined"){
					objData.push({value:"", text:"전체"});
				}else{
					objData.push({value:strHeadValue, text:strHeadText});
				}
				objDhxCombo.addOption(objData);
			}
			$(objCombo).valExt(strHeadValue);
		}
		objDhxCombo = null;
	},	

	/**
	 * get방식으로 넘어온 파라메터 값을 WebJson형태로 변환하여 리턴한다. 
	 * @param {String} strGroupName WebJson 오브젝트 생성시 그룹명(미정의시 DATA)
	 * @return WebJson 구조의 파라메터값
	 * @author MPC R&D Team 
	 */
	cnvtUrlParamToJson:function(strGroupName){
		if(typeof(strGroupName) === "undefined"){strGroupName="DATA";}
		var objJsonParams = new WebJson();
		objJsonParams.createBaseGroup();
		var strURL = document.location.href;
		if(strURL.indexOf("?")>= 0){
			strURL = strURL.substring(strURL.indexOf("?")+1);
	   		var objArrayData = strURL.split("&");
	   		for(var i = 0; i < objArrayData.length ; i++){
	   			if(objArrayData[i] !== ""){
	   				var objParamInfo = objArrayData[i].split("=");
	   				if(objParamInfo.length == 2){
	   					objJsonParams.setData(objParamInfo[0], objParamInfo[1], 0,strGroupName);
	   				}
	   			}
	   		}
		}
		return objJsonParams;
	},
	
	/**
	 * 문서의 주소(URL)정보를 반환한다.
	 * @param {String} strGb 구분값 ("IP", "PORT")
	 * @return 접속 host의 IP정보 혹은 PORT 정보
	 * @author MPC R&D Team
	 */
	getHostInfo:function(strGb){
		if(typeof(strGb) === "undefined"){strGb="IP";}
		var rtnVal = "";
		if(strGb === "IP"){rtnVal = document.location.hostname;
		}else{rtnVal = document.location.port;}
		return rtnVal;
	},
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	/**
	 * 팝업윈도우 화면을 호출한다.(스크린 중앙에 나타나게 한다) 
	 * Teleweb Framework 2.0부터 showWindow 함수명 사용(windowsOpen 함수명은 사용하지 않음)
	 * @param {String} strUrl 호출할 페이지 경로
	 * @param {String} strName 팝업윈도우 이름
	 * @param {int} intWidth 팝업윈도우 넓이 길이
	 * @param {int} intHeight 팝업윈도우 높이 길이
	 * @param {boolean} blnResizable 팝업윈도우 크기조절 가능여부(미입력시 false)
	 * @param {boolean} blnModal 모달 팝업 여부(미입력시 false)
	 * @param {object} objParams 팝업 창에 전달할 파라메터
	 * @param {object} objCallbackFn 팝업창 닫힌 후 호출 되는 콜백 function
	 * @return WebJson 구조의 파라메터값
	 * @author MPC R&D Team 
	 */	
	showWindow:function(strUrl, strName, intWidth, intHeight, blnResizable, blnModal, objParams, objCallbackFn){
		var blnPass			= false;
		var blnHasMenuId	= false;
		var objMenuInfo		= null;
		var strMenuID		= "";
		if(strUrl.substring(0,1) !== "/"){strUrl = "/" + strUrl;}
		
		//MENU_ID 체크대상여부 판단
		if(!$.isCheckExcludePage(gobjExcludeMenuIDList, strUrl)){blnPass = true;}
		
		if(!blnPass){
			objMenuInfo	= $.getMenuInfoByMenuPath(strUrl);
			strMenuID	= objMenuInfo.MENU_ID;
			if(strMenuID !== ""){
				if(strUrl.indexOf("MENU_ID=") < 0){ 
					if(strUrl.indexOf("?") >= 0){
						strUrl += "&MENU_ID=" + strMenuID;
					}else{
						strUrl += "?MENU_ID=" + strMenuID;
					}
				}
				blnPass			= true;
				blnHasMenuId	= true;
			}
		}
		
		if(blnPass){
			if(!blnHasMenuId){
				if(typeof(strName)		=== "undefined"){strName		= "";}
				if(typeof(intWidth)		=== "undefined"){intWidth		= 500;}
				if(typeof(intHeight)	=== "undefined"){intHeight		= 500;}
			}else{
				if(objMenuInfo.VIEW_TRGT === "MAIN"){
					TwbMsg("팝업 메뉴정보가 아닙니다.", "W");
				}else{
					if(objMenuInfo.PGM_PARM !== ""){
						strUrl += "&" + objMenuInfo.PGM_PARM;
					}
					if(typeof(strName)		=== "undefined"){strName		= objMenuInfo.MENU_NM;}
					if(typeof(intWidth)		=== "undefined"){intWidth		= (objMenuInfo.PUP_WIDTH_SIZE > 0 ? objMenuInfo.PUP_WIDTH_SIZE : 500);}
					if(typeof(intHeight)	=== "undefined"){intHeight		= (objMenuInfo.PUP_HGHT_SIZE > 0 ? objMenuInfo.PUP_HGHT_SIZE : 500);}
				}
			}
			if(typeof(blnResizable) 	=== "undefined"){blnResizable	= false;}
			if(typeof(blnModal)			=== "undefined"){blnModal		= false;}
			if(typeof(objParams)		=== "undefined"){objParams		= "";}

	         if(G_BROWSER_INFO == "CHROME"){   
	            intHeight = Number(intHeight)-0;
	         }else if(G_BROWSER_INFO == "SAFARI"){
	            intHeight = Number(intHeight)+22;
	         }
			if(typeof(objCallbackFn) === "function"){
				var objReturn = $.windowsOpen(strUrl, strName, intWidth, intHeight, (blnResizable ? "yes" : "no"), blnModal, objParams);
				objCallbackFn.call("", objReturn);
			}else{
				return $.windowsOpen(strUrl, strName, intWidth, intHeight, (blnResizable ? "yes" : "no"), blnModal, objParams);
			}
		}else{
			TwbMsg("메뉴ID가 존재하지 않습니다.", "W", undefined, "메뉴경로를 다시 확인바랍니다.");
		}
		
		blnPass			= null;
		blnHasMenuId	= null;
		objMenuInfo		= null;
		strMenuID		= null;
	},
	windowsOpen:function(strUrl, strName, intWidth, intHeight, strResizable, blnModal, objParams){
		try{
			
			if(strName === ""){strName = strUrl.substring(strUrl.lastIndexOf("/")+1, strUrl.lastIndexOf(".jsp")+4);}
			var option = "status=no,resizable="+strResizable;
			if(strUrl.indexOf("?") >= 0 || strUrl.indexOf("&") >= 0){
				strUrl += "&width=" + intWidth + "&height=" + intHeight;
			}else{
				strUrl += "?width=" + intWidth + "&height=" + intHeight;
			}
			
			//메뉴아이디를 세팅한다
			var jsonParams = $.cnvtUrlParamToJson();
			var strMenuID = jsonParams.getData("MENU_ID",0);
			//화면을 링크처리 한다.
			if(typeof(strMenuID) !== "undefined" && strMenuID !== ""){
				if(strUrl.indexOf("?MENU_ID") < 0 && strUrl.indexOf("&MENU_ID") < 0){
					strUrl += "&MENU_ID=" + strMenuID;
				} 
			}
			
			if(blnModal){
				
				option = "status=no;center=yes;border=thin;resizable=" + strResizable + ";dialogWidth=" + intWidth + "px;dialogHeight=" + intHeight + "px;";
				var retVal = window.showModalDialog(strUrl, objParams, option);
				
				return retVal;
			}else{
			
				if(typeof(objParams) === "string" && objParams.indexOf("&") >= 0){
					strUrl += objParams;
				}
				var winObj = window.open("", "_blank", option);
				
				winObj.location.href = strUrl;
				winObj.resizeTo(intWidth, intHeight);
				winObj.focus();
				var blnFindWin = false;
				var intFindIdx = 0;
				for(var i=0; i<winPopNM.length; i++){
					if(winPopNM[i] === strName){
						blnFindWin = true;
						intFindIdx = i;
					}
				}
				if(blnFindWin){
					winPopObj[intFindIdx] = winObj;
				}else{
					winPopObj.push(winObj);
					winPopNM.push(winObj.name);
				}
				return winObj;
			}
			
		}catch(e){console.log("error=", e);}
	},
	
	/**
	 * 모달팝업윈도우 화면을 호출한다.(스크린 중앙에 나타나게 한다) 
	 * @param {String} strUrl 호출할 페이지 경로
	 * @param {String} strParams 모달팝업화면에 전달할 파라메터
	 * @param {int} intWidth 모달팝업윈도우 넓이 길이
	 * @param {int} intHeight 모달팝업윈도우 높이 길이
	 * @param {boolean} blnResizable 팝업윈도우 크기조절 가능여부(미입력시 false) 
	 * @return WebJson 구조의 파라메터값
	 * @author MPC R&D Team 
	 */	
	showModalDialog : function(strUrl, strParams , intWidth, intHeight, blnResizable){
		if(typeof(blnResizable) === "undefined"){blnResizable = false;}
		var options = "status=no;center=yes;border=thin;resizable=" + (blnResizable ? "yes" : "no") + ";statusbar=no;scrollbars=yes;dialogWidth=" + intWidth + "px;dialogHeight=" + intHeight + "px";
		var winObj = window.showModalDialog(strUrl,strParams,options);
		return winObj;
	},	
	
	showModelessDialog : function(strUrl, strParams , intWidth, intHeight, strResizable){
		if(typeof(strResizable) == "undefined" || strResizable === ""){strResizable = "yes";}
		var options = "status=no;center=yes;border=thin;resizable=" + strResizable + ";statusbar=no;scrollbars=yes;dialogWidth=" + intWidth + "px;dialogHeight=" + intHeight + "px";
		var winObj = window.showModelessDialog(strUrl,strParams,options);
		return winObj;
	},
	
	/**
	 * 날짜 FROM ~ TO 기간을 체크한다. 
	 * @param {String} strFromDate 기간의 FROM DATE
	 * @param {String} strToDate 기간의 TO DATE
	 * @param {int} intMaxDay 제한된 기간의 차이 일수(미정의시 체크하지 않음)
	 * @param {String} strOverMsg 제한된 기간의 차이 일수가 존재할 경우 초과 시 초과된 항목의 이름
	 * @return true:기간이 정상적임, false:정상적인 기간이 아님
	 * @author MPC R&D Team 
	 */
	checkFromToDate:function(strFromDate, strToDate, intMaxDay , strOverMsg){
		//두개의 날짜가 존재할 경우만 체크
		if(strFromDate === "" || strToDate === ""){return true;}
		if(typeof(strOverMsg) === "undefined"){strOverMsg = "";}
		strFromDate = strFromDate.replace(/[^0-9]/g, "");
		strToDate = strToDate.replace(/[^0-9]/g, "");
		if(date_onCheck(strFromDate,"") === "" ){TwbMsg(TWB_MSG.FROM_DATE_CONFIRM, "W");return false;}
		if(date_onCheck(strToDate,"") === "" ){TwbMsg(TWB_MSG.TO_DATE_CONFIRM, "W");return false;}
		if(Number(strFromDate) > Number(strToDate) ){TwbMsg(TWB_MSG.FROM_TO_DATE_CONFIRM, "W");return false;}
		if(!intMaxDay) intMaxDay = 0;
		if( intMaxDay > 0 ){
			var st = new Date( strFromDate.substring(0,4) , Number(strFromDate.substring(4,6))-1,Number(strFromDate.substring(6) ));
			var et = new Date( strToDate.substring(0,4) , Number(strToDate.substring(4,6))-1,Number(strToDate.substring(6) ));
			var fromto = (et-st)/(1000*60*60*24);
			if(intMaxDay < fromto){
				TwbMsg(strOverMsg + " " + intMaxDay + TWB_MSG.OVER_DAY_CONFIRM, "W");
				return false;
			}
		}
		return true;
	},
	
	extendDateValue:function(strValue){
		if($.isNumber(strValue)){
			var dtTody  = new Date();
			strValue = strValue.toString();
			if(strValue.length === 1 || strValue.length === 2){
				return dtTody.getFullYear() + $.setTwoCharWithZero(dtTody.getMonth() + 1) + $.setTwoCharWithZero(strValue);
			} else if(strValue.length === 3){
				return dtTody.getFullYear() + $.setTwoCharWithZero(strValue.substring(0,1)) + strValue.substring(1,3);
			} else if(strValue.length === 4){
				return dtTody.getFullYear() + strValue.substring(0,2) + strValue.substring(2,4);
			} else if(strValue.length === 6){
				return "20" + strValue.substring(0,2) + strValue.substring(2,4) + strValue.substring(4,6);
			} else {
				return strValue;
			}
		} else {
			return strValue;
		}
	},
	
	setTwoCharWithZero:function(strValue){
		strValue = strValue.toString();
		if(strValue.length == 1){
			return "0" + strValue;
		} else {
			return strValue.toString();
		}
	},
	
	getRangeNum:function(startIdx , endIdx, interval) {
		
		var obj = [];
		
		for( var i=startIdx; i<endIdx; i=i+interval)
		{
			var val = $.setTwoCharWithZero(i);
			obj.push({CD : val , CD_NM : val});
		}
		
		return obj;	
	}, 
	
	/**
	 * 문자열이 숫자타입인지 여부를 체크한다.
	 * @param {String} strValue 문자열
	 * @return true:숫자타입, false:숫자타입이 아님
	 * @author MPC R&D Team 
	 */		
	isNumber : function(strValue){
		var reg = /^\d+$/;
		return reg.test(strValue);
	},	
	
	/**
	 * 비즈니스로직 없이 SQL파일의 SQL문을 직접 실행시켜 결과를 반환 받는다.(Teleweb Framework Control Function) 
	 * @param {String} objParams WebJson 구조의 파라메터
	 * @param {boolean} blnAsync true:비동기처리방식, false:동기처리방식(미정의 시 false)
	 * @param {String} strCallBackFunc 비동기처리방식일 경우 호출할 Call Back 함수명
	 * @return 동기처리방식일 경우 WebJson 구조의 반환데이터, 비동기처리방식일 경우 내부적으로 strCallBackFunc을 호출하여 자동으로 반환 
	 * @author MPC R&D Team 
	 */		
	serviceCall:function(objParams, blnAsync, strCallBackFunc){
		
		gintRequestCnt++;
		
		var objJsonReturn = new WebJson();
		try{
			var strMenuID	= $.getCurrMenuID();				//메뉴ID
			var strGridId	= objParams.getGridId();			//그리드ID
			var blnIsGrid	= false;							//그리드정의여부
			var blnIsPage	= false;							//페이징처리적용여부
			var blnIsScrollAppend = false;						//스크롤append적용여부
			
			if(typeof(strMenuID) === "undefined" || strMenuID == null){strMenuID = "";}
			if(typeof(strGridId) !== "undefined" && strGridId !== ""){
				blnIsGrid = true;
				blnIsPage = $("#" + strGridId).getIsPageGrid();
				blnIsScrollAppend = $("#" + strGridId).getIsScrollAppendGrid();
			}
			
			objParams.setHeaderKey("MENU_ID", strMenuID);
			
			if(typeof(blnAsync) === "undefined" || blnAsync !== true){blnAsync = false;}
			objParams.setAsyncMode(blnAsync);
			if(blnAsync === true && typeof(strCallBackFunc) !== "undefined"){
				objParams.setCallBack(strCallBackFunc);
			}
			//if(typeof(objParams.getDataGridBindFlag()) === "undefined"){objParams.setDataGridBindFlag(true);}
			
			//로딩바 생성
			if(blnAsync === true){
				if(blnIsGrid === true){$("#" + strGridId).showGridProgressBar();}
				else{$.showDocProgressBar();}
			}
			
//			var strURL = "/TelewebChannel_XML_SERVICE." + objParams.getService() + "." + objParams.getSqlName() + ".do";
			var strURL = "/api/" + objParams.getService() + "/" + objParams.getSqlName();
			strURL = strURL.replace(/(\/\/)|[\.]/g, "/");
//			console.log("strUrl=", strURL);
			objParams.setCallType("XML_SERVICE");
			objParams.setURL(strURL);

			//Grid 정보를 설정할 경우
			if(blnIsGrid === true && (blnIsPage === true || blnIsScrollAppend === true)){
				objParams.setRowCnt($("#" + strGridId).getRowCntPerPage());
				if(objParams.getPages() == undefined || objParams.getPages() == 0){
					objParams.setPages(1);
				}
			}
			
			
			//파라메터다이제스트 생성
			objParams.replaceXSSTextForRequest();
			var arrayDataInfo = $.getKeyListDataList(objParams);
			objParams.setHeaderKey("MD_KEY_LIST", arrayDataInfo[0]);
			objParams.setHeaderKey("MD_DATA_LIST", Hash.encryptMD5(arrayDataInfo[1]));
			
			$.ajax({
				type:"POST",
				url: objParams.getURL(),
				data: objParams.getJsonObj(),
				dataType:"json",
				async: blnAsync,
				beforeSend :function(xhr){
					xhr.setRequestHeader($("meta[name='_csrf_header']").attr('content'), $("meta[name='_csrf']").attr('content'));
				},
				success:function(obj){
					if(gintRequestCnt > 0){gintRequestCnt--;}
					//로딩바 제거
					if(blnAsync === true){
						if(blnIsGrid === true){$("#" + strGridId).showGridProgressBar(false);}
						else{$.showDocProgressBar(false);}
					}
					if(obj !=  null){
						if(typeof(obj.HEADER.COUNT) === "undefined"){obj.HEADER.COUNT = 0;}
						if(typeof(obj.HEADER.TOT_COUNT) === "undefined"){obj.HEADER.TOT_COUNT = 0;}
						
						objJsonReturn.setJsonObj(obj);
						
						//악의적인 XSS 공격에 대비한 결과데이터 태그정보 치환
						objJsonReturn.replaceXSSText();
						
						if(blnAsync === true && typeof(strCallBackFunc) !== "undefined"){
							objJsonReturn.setCallBack(strCallBackFunc);
						}
						
						//위변조에 따른 페이지 강제이동
						if(objJsonReturn.getHeaderKey("MD_CHECK_FAIL") == "true"){$.goMDFailPage();return;}
						//세션정보 소멸에 따른 페이지 강제이동
						if(objJsonReturn.getHeaderKey("EXPIRE_SESSION") == "true"){$.goExpirePage("TWB");return;}
						
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
						alert('test');
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
							//objJsonReturn.setHeaderKey("ERROR_MSG", $.toJSON(e)); GS 인증관련 제거
							objJsonReturn.setHeaderKey("ERROR_MSG", TWB_MSG.EXCEPTION_01);
						}
					}else{
						objJsonReturn.setHeaderKey("ERROR_MSG", TWB_MSG.EXCEPTION_01);
						if(G_SVR_SVC_MODE === "DEV"){
							//objJsonReturn.setHeaderKey("ERROR_MSG", e);GS 인증관련 제거
							objJsonReturn.setHeaderKey("ERROR_MSG", TWB_MSG.EXCEPTION_01);
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
					objJsonReturn.setHeaderKey("ERROR_MSG", $.toJSON(e));
				}
			}else{
				objJsonReturn.setHeaderKey("ERROR_MSG", TWB_MSG.EXCEPTION_01);
				if(G_SVR_SVC_MODE === "DEV"){
					objJsonReturn.setHeaderKey("ERROR_MSG", e);
				}
			}
			//콜백함수 호출
			if(blnAsync === true){
				try{eval(strCallBackFunc + "(objJsonReturn);");}catch(E){console.log("error=", E);}
			}
		}
		
		return objJsonReturn;
	},	
	
	/**
	 * 비즈니스로직을 호출하여 처리 결과를 반환 받는다.(Teleweb Framework Control Function)
	 * @param {String} objParams WebJson 구조의 파라메터
	 * @param {boolean} blnAsync true:비동기처리방식, false:동기처리방식(미정의 시 false)
	 * @param {String} strCallBackFunc 비동기처리방식일 경우 호출할 Call Back 함수명
	 * @return 동기처리방식일 경우 WebJson 구조의 반환데이터, 비동기처리방식일 경우 내부적으로 strCallBackFunc을 호출하여 자동으로 반환
	 * @author MPC R&D Team
	 */		
	bizServiceCall:function(objParams, blnAsync, strCallBackFunc){
		
		gintRequestCnt++;
		
		var objJsonReturn = new WebJson();
		try{
			var strMenuID	= $.getCurrMenuID();				//메뉴ID
			var strGridId	= objParams.getGridId();			//그리드ID
			var blnIsGrid	= false;							//그리드정의여부
			var blnIsPage	= false;							//페이징처리적용여부
			var blnIsScrollAppend = false;						//스크롤append적용여부
			
			if(typeof(strMenuID) === "undefined" || strMenuID == null){
				strMenuID = objParams.getHeaderKey("MENU_ID");
			}
			if(typeof(strGridId) !== "undefined" && strGridId !== ""){
				blnIsGrid = true;
				blnIsPage = $("#" + strGridId).getIsPageGrid();
				blnIsScrollAppend = $("#" + strGridId).getIsScrollAppendGrid();
			}
			
			objParams.setHeaderKey("MENU_ID", strMenuID);
			
			if(typeof(blnAsync) === "undefined" || blnAsync !== true){blnAsync = false;}
			objParams.setAsyncMode(blnAsync);
			if(blnAsync === true && typeof(strCallBackFunc) !== "undefined"){
				objParams.setCallBack(strCallBackFunc);
			}
			//if(typeof(objParams.getDataGridBindFlag()) === "undefined"){objParams.setDataGridBindFlag(true);}
			
			//로딩바 생성
			if(blnAsync === true){
				if(blnIsGrid === true){$("#" + strGridId).showGridProgressBar();}
				else{$.showDocProgressBar();}
			}
			
//			var strURL = "/TelewebChannel_BIZ_SERVICE." + objParams.getService() + "." + objParams.getMethod() + ".do";
			var strURL = "/api/" + objParams.getService() + "/" + objParams.getMethod();
			strURL = strURL.replace(/(\/\/)|[\.]/g, "/");
			objParams.setCallType("BIZ_SERVICE");
			objParams.setURL(strURL);

			//Grid 정보를 설정할 경우
			if(blnIsGrid === true && (blnIsPage === true || blnIsScrollAppend === true)){
				objParams.setRowCnt($("#" + strGridId).getRowCntPerPage());
				if(objParams.getPages() == undefined || objParams.getPages() == 0){
					objParams.setPages(1);
				}
			}
			//파라메터다이제스트 생성
			objParams.replaceXSSTextForRequest();
			var arrayDataInfo = $.getKeyListDataList(objParams);
			objParams.setHeaderKey("MD_KEY_LIST", arrayDataInfo[0]);
			objParams.setHeaderKey("MD_DATA_LIST", Hash.encryptMD5(arrayDataInfo[1]));
			
			$.ajax({
				type:"POST",
//				contentType: "application/json",
				url: objParams.getURL(),
				data: objParams.getJsonObj(),
				dataType:"json",
				async: blnAsync,
				beforeSend :function(xhr){
					//X-CSRF-TOKEN
					
					xhr.setRequestHeader($("meta[name='_csrf_header']").attr('content'), $("meta[name='_csrf']").attr('content'));
					
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
						if(blnIsGrid === true){$("#" + strGridId).showGridProgressBar(false);}
						else{$.showDocProgressBar(false);}
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
	},

	/**
	 * DB 데이터를 검색하여 결과정보를 엑셀파일로 컨버전한 후 다운로드 한다. 
	 * @param {String} objParams WebJson 구조의 파라메터
	 * @return true 정상다운로드, false 다운로드실패 
	 * @author MPC R&D Team 
	 */		
	excelServiceCall:function(objParams){
		
		objParams.setRowCnt(9999999);
		objParams.setPages(1);
		
		var objExclForm = $("#exportExcelForm");
		if(objExclForm.length == 0){
			$(document.body).append("<form id='exportExcelForm' name='exportExcelForm' method='post'></form>");
			objExclForm = $("#exportExcelForm");
			objExclForm.append("<input type='hidden' id='excelInfo' name='PARAMS'/>");
			objExclForm.append("<input type='hidden' name='_csrf' value='"+ document.querySelector("meta[name='_csrf']").getAttribute('content') +"'/>");
			objExclForm.append("<iframe name='targetFrame' id='targetFrame' width='0' height='0' frameborder='0' framespacing='0' style='display:none;'></iframe>");
			objExclForm.attr("action","/servlet/ExcelExportServlet");
			objExclForm.attr("target","targetFrame");
		}
		
		$("#excelInfo").val($.toJSON(objParams.jsonData));
		
		objExclForm.submit();
		
		$("#excelInfo").val("");

		return true;
	},	

	/**
	 * 파일키 또는 파일명을 이용하여 이미지 파일을 뷰어로 본다
	 * @param {String} strFileKey 파일키
	 * @param {String} strFileName 다운받을 파일명
	 * @param {boolean} blnOrgImg 전체이미지보기로 윈도우 오픈
	 * @return 없음 
	 * @author MPC R&D Team 
	 */
	viewImgFile:function(strFileKey, strFileName, blnOrgImg){
		if(typeof(strFileKey) === "undefined"){strFileKey = "";}
		if(typeof(strFileName) === "undefined"){strFileName = "";}
		if(typeof(blnOrgImg) === "undefined"){blnOrgImg = false;}
		
		//다운받을 파일정보 체크
		if(strFileKey === "" && strFileName === ""){TwbMsg(TWB_MSG.FILE_INFO_NO_EXIST, "E");return;}
		
		if(strFileKey !== ""){
			if(blnOrgImg){
				$.showWindow("/common/web/img-viewer02?downFileKey=" + strFileKey, "viewImgFileOrg" , 800, 562, true);
			} else {
				$.showWindow("/common/web/img-viewer01?downFileKey=" + strFileKey, "viewImgFile" , 800, 562, false);
			}
		} else if(strFileName !== ""){
			if(blnOrgImg){
				$.showWindow("/common/web/img-viewer02?downFileName=" + strFileName, "viewImgFileOrg" , 800, 562, true);
			} else {
				$.showWindow("/common/web/img-viewer01?downFileName=" + strFileName, "viewImgFile" , 800, 562, false);
			}
		}
	},	

	/**
	 * PDF 문서를 오픈소스 뷰어를 이용하여 웹화면에 바로 보여준다
	 * @param {String} strFileKey 파일키
	 * @param {String} strFileName 다운받을 파일명
	 * @return 없음 
	 * @author MPC R&D Team 
	 */
	viewPdfFile:function(strFileKey, strFileName){
		if(typeof(strFileKey) === "undefined"){strFileKey = "";}
		if(typeof(strFileName) === "undefined"){strFileName = "";}

		//다운받을 파일정보 체크
		if(strFileKey === "" && strFileName === ""){TwbMsg(TWB_MSG.FILE_INFO_NO_EXIST, "E");return;}
	
		if(strFileKey !== ""){
			$.showWindow("/common/web/pdf-viewer01?downFileKey=" + strFileKey, "viewPdfFile" , 800, 600, true);
		} else if(strFileName !== ""){
			$.showWindow("/common/web/pdf-viewer01?downFileName=" + strFileName, "viewPdfFile" , 800, 600, true);
		}
	},
	
	/**
	 * 다운로드 처리하는 Form 태그 객체를 Document에 동적으로 생성한다.
	 * 참고: 해당 함수는 Form 객체 안에 두개까지만 입력박스를 동적으로 생성할 수 있다. 
	 * @param {String} strFormID 폼아이디
	 * @param {String} strAction 요청할 서블릿 액션 경로
	 * @param {String} strId01 첫번째 입력박스 ID
	 * @param {String} strValue01 첫번째 입력박스 값
	 * @param {String} strId02 두번째 입력박스 ID
	 * @param {String} strValue02 두번째 입력박스 값
	 * @param {String} strId03 세번째 입력박스 ID
	 * @param {String} strValue03 세번째 입력박스 값
	 * @return 없음 
	 * @author MPC R&D Team 
	 */
	createDownForm:function(strFormID, strAction, strId01, strValue01, strId02, strValue02, strId03, strValue03){
		if(typeof(strFormID) === "undefined" || strFormID === ""){TwbMsg(TWB_MSG.FORM_ID_NO_EXIST, "E");return;}
		if(typeof(strAction) === "undefined" || strAction === ""){TwbMsg(TWB_MSG.FORM_ACTION_NO_EXIST, "E");return;}
		if(typeof(strId01) === "undefined"){strId01 = "";}
		if(typeof(strValue01) === "undefined"){strValue01 = "";}
		if(typeof(strId02) === "undefined"){strId02 = "";}
		if(typeof(strValue02) === "undefined"){strValue02 = "";}
		if(typeof(strId03) === "undefined"){strId03 = "";}
		if(typeof(strValue03) === "undefined"){strValue03 = "";}
		
		var blnCreateForm = false;
		var objForm = document.getElementById(strFormID);
		
		//폼객체 생성
		if(objForm === null){
			objForm = document.createElement("form");
			objForm.id = strFormID;
			objForm.name = strFormID;
			objForm.action = strAction;
			objForm.style.display = "none";
			objForm.method = "POST";
			blnCreateForm = true;
		}

		//첫번째 INPUT박스 설정
		if(strId01 !== ""){
			if(document.getElementById(strId01) === null){
				var objInput01 = document.createElement("input");
				objInput01.id = strId01;
				objInput01.name = strId01;
				objInput01.type = "text";
				objInput01.value = strValue01;
				//Form 객체에 입력박스 추가
				objForm.appendChild(objInput01);
			} else {
				document.getElementById(strId01).value = strValue01;
			}
		}

		//두번째 INPUT박스 설정
		if(strId02 !== ""){
			if(document.getElementById(strId02) === null){
				var objInput02 = document.createElement("input");
				objInput02.id = strId02;
				objInput02.name = strId02;
				objInput02.type = "text";
				objInput02.value = strValue02;
				//Form 객체에 입력박스 추가
				objForm.appendChild(objInput02);
			} else {
				document.getElementById(strId02).value = strValue02;
			}
		}
		
		//세번째 INPUT박스 설정
		if(strId03 !== ""){
			if(document.getElementById(strId03) === null){
				var objInput03 = document.createElement("input");
				objInput03.id = strId03;
				objInput03.name = strId03;
				objInput03.type = "text";
				objInput03.value = strValue03;
				//Form 객체에 입력박스 추가
				objForm.appendChild(objInput03);
			} else {
				document.getElementById(strId03).value = strValue03;
			}
		}
				
		if(blnCreateForm){
			//Document 객체에 폼객체 추가
			document.body.appendChild(objForm);	
		}
	},
	
	
	/**
	 * 파일첨부 오브젝트는 스크립트로 초기화가 불가능하기 때문에 Form안에 모든 태그를 다시 그리는 방식으로 초기화 한다.
	 * @param {String} strFormID 파일첨부를 하기 위한 multipart/form-data 폼객체 ID
	 * @return 없음 
	 * @author MPC R&D Team 
	 */
	initFileForm:function(strFormID){
		var objForm = $("#"+strFormID);
		var objElementForm = document.getElementById(strFormID);
		var strWorkGB = $("#WORK_GB",objElementForm).valExt();
		var strUserID = $("#USER_ID",objElementForm).valExt();
		
		//해당 폼의 모든 데이터를 초기화 한다.
		$.each($("input",objElementForm),function(){
			$(this).valExt("");
		});
		
		//폼안에 IMG TAG가 존재할 경우 경로를 초기화 한다.
		$.each($("img[src]",objElementForm),function(){
			$(this).attr("src","/common/img/icon/blank01.png");
		});

		//디자인 태그를 모두 스트링으로 받는다.
		var strTags = objForm.html();
		
		//다시 디자인을 한다.
		objForm.html("");
		objForm.html(strTags);
		
		//WorkGB를 다시 설정한다.
		$("#WORK_GB", objElementForm).valExt(strWorkGB);
		$("#USER_ID", objElementForm).valExt(strUserID);
		
		strTags = null;	
	},	
	
	
	/**
	 * 파일전체경로를 이용하여 구분에 따른 파일정보를 반환한다.
	 * @param {String} strFileFullPath 파일전체경로
	 * @param {String} strCase 반환할 파일정보(EXT:확장자, NAME:이름, IMG:이미지파일일경우 확장자, PDF:PDF일 경우 확장자, XLS,XLSX:엑셀일경우 확장자)
	 * @return 조건에 맞을 경우 확장자 또는 파일명, 조건에 맞지 않을 경우 빈문자 
	 * @author MPC R&D Team 
	 */
	getFileInfo:function(strFileFullPath, strCase){
	   	var strRetValue = "";
	   	if(strFileFullPath === "" || strFileFullPath === null){return strRetValue;}
	   	var intPosExt = strFileFullPath.lastIndexOf(".");
	   	var intPosFile = strFileFullPath.lastIndexOf("\\");
		
	   	switch (strCase){
	   		case "EXT":
	   			//파일 확장자 추출
	   			if(intPosExt >= 0){strRetValue = strFileFullPath.substring(intPosExt+1);}	break;
	   		case "NAME":
	   			//파일이름 추출
	   			if(intPosFile >= 0){strRetValue = strFileFullPath.substring(intPosFile+1);}	break;
	   		case "IMG":
	   			//이미지파일일 경우 확장자 반환
	   			if(intPosExt >= 0){strRetValue = strFileFullPath.substring(intPosExt+1);}
	   			if(TWB_CONST.IMG_LIST.indexOf(strRetValue.toUpperCase()) == -1){strRetValue = "";}
	   			break;
	   		case "PDF":
	   		case "XLS":
	   		case "XLSX":
	   			//PDF, XLS, XLSX 파일일 경우 확장자 반환
	   			if(intPosExt >= 0){strRetValue = strFileFullPath.substring(intPosExt+1);}
	   			if(strCase.indexOf(strRetValue.toUpperCase()) == -1){strRetValue = "";}
	   			break;
	   		default:
	   			break;	
	   	};
	   	return strRetValue;
	},		
	
	/**
	 * TwbJson 구조의 파라메터에서 특정 그룹의 1번째 로우값 기준으로 키와 데이터를 순차적으로 분리해서 반환한다.
	 * @param {TwbJson} jsonArrayData 파라메터정보
	 * @param {String} strGroup Group 명 (없을 경우 DATA)
	 * @return ["키이름 리스트(구분자 ||)", "데이터 리스트(구분자 ||)"]
	 *         데이터가 없을 경우 ["NO_KEY_LIST","NO_DATA_LIST"]
	 * @author MPC R&D Team 
	 */
	getKeyListDataList:function(jsonArrayData, strGroup){
		var objInfo = [];
		var strKeyList = "";
		var strValueList = "";
	   	if(typeof(strGroup) === "undefined") {strGroup = "DATA";}
		
	   	var jsonData = jsonArrayData.getDataObject(strGroup);
		
	   	for(var strIdx in jsonData){
			if(strIdx === "0"){
				if(jsonData.hasOwnProperty(strIdx)){
					for(var strKey in jsonData[strIdx]){
						if(jsonData[strIdx].hasOwnProperty(strKey)){
							strKeyList += strKey + "||";
							if(typeof(jsonData[strIdx][strKey]) === "undefined"){
								strValueList += "" + "||";
							} else {
								if(jsonData[strIdx][strKey] == null){
									strValueList += "" + "||";
								} else {
									strValueList += jsonData[strIdx][strKey] + "||";
								}
							}
			        	}
					}
				}
			}
		}


		
		if(strKeyList === ""){strKeyList = "NO_KEY_LIST";} else {strKeyList = strKeyList.substring(0,strKeyList.length-2);}
		if(strValueList === ""){strValueList = "NO_DATA_LIST";} else {strValueList = strValueList.substring(0,strValueList.length-2);}


		objInfo.push(strKeyList);
		objInfo.push(strValueList);

		return objInfo;
	},	
	
	
	/**
	 * JSON 오브젝트를 스트링으로 변경해서 반환한다.
	 * Teleweb Framework 2.0 부터는 cnvtJSONtoString 함수를 사용한다.
	 * @param {String} jsonData JSON 타입의 오브젝트
	 * @returns 스트링으로 변경된 데이터
	 * @author MPC R&D Team  
	 */
	cnvtJSONtoString:function(jsonData){
		var isArray = $.checkIsArray(jsonData);
		var results = [];
		
		for (var i in jsonData) {
			var value = jsonData[i];
			if (typeof value == "object"){
				results.push((isArray ? "" : "\"" + i.toString() + "\":") + $.cnvtJSONtoString(value));
			} else if (value != null){
				results.push((isArray ? "" : "\"" + i.toString() + "\":") + (typeof value == "string" || typeof value == "boolean" ? "\"" + value + "\"" : value));
			}
		}
		return (isArray ? "[" : "{") + results.join(",") + (isArray ? "]":"}");
	},

	/**
	 * 접속한 클라이언트의 기본정보를 검색한다.
	 * @param {String} strCase REMOTE_HOST, REMOTE_ADDR 
	 * @return 구분에 따른 서버정보
	 * @author MPC R&D Team
	 */
	getClientInfo:function(strCase){
		var objJsonParams = new WebJson();
		objJsonParams.setService("TwbCommon");
		objJsonParams.setMethod("getClientInfo");
		objJsonParams.setData("CASE", strCase, 0);
		var objJsonReturn = $.bizServiceCall(objJsonParams);
		if(!objJsonReturn.getErrorFlag()) {
			objJsonParams = null;
			return objJsonReturn.getData("RET_VAL", 0);
		} else {
			TwbMsg(objJsonReturn.getMsg(), "E");
			objJsonParams = null;
			return "";
		}
	},	
	
	/**
	 * 접속한 서버의 기본정보를 검색한다.
	 * @param {String} strCase HOST_NAME, HOST_ADDR, HOST_PORT, SERVLET_PATH, REQUEST_URL
	 * @return 구분에 따른 서버정보
	 * @author MPC R&D Team
	 */
	getServerInfo:function(strCase){
		var objJsonParams = new WebJson();
		objJsonParams.setService("TwbCommon");
		objJsonParams.setMethod("getServerInfo");
		objJsonParams.setData("CASE", strCase, 0);
		var objJsonReturn = $.bizServiceCall(objJsonParams);
		if(!objJsonReturn.getErrorFlag()) {
			objJsonParams = null;
			return objJsonReturn.getData("RET_VAL", 0);
		} else {
			TwbMsg(objJsonReturn.getMsg(), "E");
			objJsonParams = null;
			return "";
		}
	},	
	
	/**
	 * 서버에 정의된 환경정보(Property) 정보를 리턴한다.
	 * @param {String} strKeyName 환경정보 키(Property Key)
	 * @param {String} strDefault 키가 정의되어 있지 않을 경우 디폴트값
	 * @return Property Key에 대한 값, 키가 존재하지 않을 경우 디폴트값
	 * @author MPC R&D Team
	 */
	getProperty:function(strKeyName, strDefault){
		var objJsonParams = new WebJson();
		objJsonParams.setService("TwbCommon");
		objJsonParams.setMethod("getJsProperty");
		objJsonParams.setData("KEY_NAME", strKeyName, 0);
		objJsonParams.setData("DEFAULT", strDefault, 0);
		var objJsonReturn = $.bizServiceCall(objJsonParams);
		if(!objJsonReturn.getErrorFlag()) {
			objJsonParams = null;
			return objJsonReturn.getData("RET_VAL", 0);
		} else {
			TwbMsg(objJsonReturn.getMsg(), "E");
			objJsonParams = null;
			return "";
		}
	},
	
	/**
	 * 쿠키 정보를 생성한다.
	 * @param {String} strKeyName 키이름
	 * @param {String} strKeyValue 키값
	 * @return 없음
	 * @author MPC R&D Team
	 */
	setCookie:function(strKeyName, strKeyValue){
		var dtTody  = new Date();
	    var dtExpire = new Date(dtTody.getTime() + 60*60*24*31*1000);
		document.cookie = strKeyName + "=" + escape(strKeyValue) + ( (dtExpire) ? "; expires=" + dtExpire.toGMTString() : "");
	},		
	setCookie2:function(strKeyName, strKeyValue){
		var dtTody  = new Date();
	    var dtExpire = new Date(dtTody.getTime() + 60*60*10*1000);
		document.cookie = strKeyName + "=" + escape(strKeyValue) + ( (dtExpire) ? "; expires=" + dtExpire.toGMTString() : "");
	},	
	
	/**
	 * 쿠키 정보를 가져온다.
	 * @param {String} strKeyName 키이름
	 * @return 없음
	 * @author MPC R&D Team
	 */
	getCookie:function(strKeyName){
		//키 이름 패턴의 쿠키정보가 있는지 확인한다.
		var intStartPos = document.cookie.indexOf(strKeyName + "=");
		
		if (intStartPos >= 0){
			intStartPos += strKeyName.length + 1;
			var intEndPos = document.cookie.indexOf(";", intStartPos);
			if(intEndPos == -1){intEndPos = document.cookie.length;}
			return unescape(document.cookie.substring(intStartPos, intEndPos));
		} else {
			return "";
		}
	},
	
	/**
	 * 세션정보 소멸페이지로 이동한다.
	 * @return 없음
	 * @author MPC R&D Team
	 */
	goExpirePage:function(strWinName)
	{
		window.top.logoutFlag = true;
		window.top.location.replace(G_LOGOUT_PAGE);		// 메인창
		
		//alert("팝업창 open 여부 " + self.opener);
		/*
		if(self.opener)
		{
			window.top.logoutFlag = true;
			window.top.location.replace(G_EXPIRE_PAGE);		// 메인창
		}
		else
		{
			//location.replace(G_EXPIRE_PAGE);				// 팝업창
		}
		*/
	},

	/**
	 * 변조화면 체크 페이지로 이동한다.
	 * @return 없음
	 * @author MPC R&D Team
	 */
	goMDFailPage:function()
	{
		try{
			window.top.location.replace(G_MD_FAIL_PAGE);
			self.close();
		} catch(e){
			try{window.close();}catch(e){console.log("error=", e);}
		}
	},	
	
	/**
	 * 공통파일첨부 팝업화면을 호출하고 임시로 저장된 파일정보 JSONArray로 반환한다.
	 * @param {String} strUserID 파일첨부를 하는 사용자ID
	 * @param {String} strWorkGB 업무구분
	 * @return JSONArray 타입의 임시로 저장된 파일정보 
	 * @author MPC R&D Team
	 */
	showAttachFiles:function(strWorkGB, objCallbackFn){
		
		//파라메터체크
		if(typeof(strWorkGB) === "undefined" || strWorkGB === ""){TwbMsg(TWB_MSG.FILE_WORK_GB_NO_EXIST, "W"); return;}
		if(typeof(objCallbackFn) !== "function"){TwbMsg("파일 첨부 화면 열기 실패!", "W", undefined, "반드시 콜백 function이 정의되어야 합니다."); return;}
		//전송파라메터생성
		var objJsonParams = new WebJson();
		objJsonParams.setData("USER_ID", Session.getUserID());				//파일전송자 정보
		objJsonParams.setData("WORK_GB", strWorkGB);						//파일업무구분 정보
		
		// 이미지 첨부는 미리보기화면 포함한 크기로 셋팅한다.SJH
		height = 430;
		if('TWBIMG' == strWorkGB) 	height = 600;
		
		//파일첨부 공통팝업 화면 호출
		$.showWindow("/common/web/attach-file", "공통파일관리", 800, height, false, true, objJsonParams, objCallbackFn);
	},
	
	/**
	 * 첨부한 임시파일을 업로드한다.
	 */
	uploadAttachFiles:function(objFileParams, strCallBackFn){
		if(typeof(strCallBackFn) === "undefined"){TwbMsg("파일 업로드 실패!", "W", undefined, "반드시 콜백 function이 정의되어야 합니다."); return null;}
		//파라메터정의
		var objJsonParams = new WebJson();
		objJsonParams.setService("TwbCommon");
		objJsonParams.setMethod("processRtnAttachFiles");
		objJsonParams.setData("USER_ID", Session.getUserID());
		objJsonParams.setData("WRTR_DRPT_CD", Session.getDeptCode());
		objJsonParams.setDataObject(G_DATA, objFileParams.getDataObject());
		//파일첨부 서비스 호출
		$.bizServiceCall(objJsonParams, true, strCallBackFn);
		//명시적 객체해제
		objJsonParams = null;
	},
	
	/**
	 * 업로드 파일 및 첨부된 임시파일을 삭제한다.
	 */
	removeAttachedFiles:function(objFile, blnAttached){
		if(typeof(objFile) === "undefined" || objFile === ""){TwbMsg("파일 삭제 실패!", "W", undefined, "파일 정보가 누락되었습니다."); return;}
		if(typeof(blnAttached) === "undefined"){blnAttached = true;}
		//파라메터정의
		var objJsonParams = new WebJson();
		objJsonParams.setService("TwbCommon");
		objJsonParams.setMethod("deleteRtnAttachFiles");
		if(!blnAttached){
			for(var i = 0; i < objFile.length; i++){
				objJsonParams.setData("FILE_GROUP_KEY", objFile[i].FILE_GROUP_KEY, i);
				objJsonParams.setData("FILE_KEY", objFile[i].FILE_KEY, i);
			}
		}else{
			if(!$.checkIsArray(objFile)){
				objJsonParams.setData("FILE_NAME", objFile);
			}else{
				for(var i = 0; i < objFile.length; i++){
					objJsonParams.setData("FILE_NAME", objFile[i], i);
				}
			}
		}
		//파일첨부 서비스 호출
		var objJsonReturn = $.bizServiceCall(objJsonParams);
		if(!objJsonReturn.getErrorFlag()){
			TwbMsg(COM_MSG.DEL_OK);
		}else{
			TwbMsg(objJsonReturn.getMsg());
		}
		//명시적 객체해제
		objJsonParams = null;
		objJsonReturn = null;
	},
	
	/**
	 * 파일키 또는 파일명을 이용하여 서버의 특정 파일을 다운로드 받는다.
	 * 폼이름 frmDownFile, 키입력박스이름 downFileKey, 파일명입력박스이름 downFileName은 공통처리를 위해 고정시킨다.
	 * @param {String} strFileKey 파일키
	 * @param {String} strFileName 다운받을 파일명
	 * @param {boolean} blnForm 폼방식으로 처리할지 여부(true:폼방식으로 다운, false:빈윈도우방식으로 다운)
	 * @return 없음 
	 * @author MPC R&D Team 
	 */
	downAttachedFiles:function(strFileGroupKey, strFileKey, strFileName, blnForm){
		if(typeof(strFileGroupKey) === "undefined"){strFileGroupKey = "";}
		if(typeof(strFileKey) === "undefined"){strFileKey = "";}
		if(typeof(strFileName) === "undefined"){strFileName = "";}
		if(typeof(blnForm) === "undefined"){blnForm = false;}
		
		//다운받을 파일정보 체크
		if(strFileKey === "" && strFileName === ""){TwbMsg(TWB_MSG.FILE_INFO_NO_EXIST, "E");return;}

		if(blnForm){
			//폼객체가 없을 경우 Form 객체를 동적으로 생성한다.
			$.createDownForm("frmDownFile", "/servlet/FileDownloadServlet", "downFileGroupKey", strFileGroupKey, "downFileKey", strFileKey, "downFileName", strFileName);
			$("#frmDownFile").submit();
		} else {
			if(strFileGroupKey !== "" && strFileKey !== ""){
				$.showWindow("/servlet/FileDownloadServlet?downFileGroupKey=" + strFileGroupKey + "&downFileKey=" + strFileKey, "downloadFile", 800, 600, false);
			} else if(strFileName !== ""){
				$.showWindow("/servlet/FileDownloadServlet?downFileName=" + strFileName, "downloadFile" , 800, 600, false);
			}
		}
	},
	
	/**
	 * XSS이 적용된 문자를 원래문자로 변환한다.
	 * @param {String} strText 전체 문자열
	 */
	restoreXSS:function(strText){
		//값존재유무 체크
		if(strText === "" || strText == null){return strText;}
		strText = strText.toString();

		//문자열 길이가 4이상일 경우만 처리
		if(strText.length <= 3){return strText;}

		//XSS이 적용되었을 경우 원래 문자로 치환하여 반환한다.
		strText = replaceAll(strText,"&amp;","&");
//		strText = replaceAll(strText,"&lt;","&#60;");
//		strText = replaceAll(strText,"&gt;","&#62;");
//		strText = replaceAll(strText,"&lt;","<");
//		strText = replaceAll(strText,"&gt;",">");
		strText = replaceAll(strText,"&lt;","&lt;");
		strText = replaceAll(strText,"&gt;","&gt;");
		//트리에서 스크립트 사용시 문제되서 주석처리함
		// strText = replaceAll(strText,"<","&lt;");
		// strText = replaceAll(strText,">","&gt;");
		strText = replaceAll(strText,"&#40;","(");
		strText = replaceAll(strText,"&#41;",")");
		strText = replaceAll(strText,"&apos;","'");
		strText = replaceAll(strText,"&#91;","[");
		strText = replaceAll(strText,"&#93;","]");
		strText = replaceAll(strText,"&quot;",'"');

		return strText;
	},
	
	restoreXSS_Dec:function(strText){
		//값존재유무 체크
		if(strText === "" || strText == null){return strText;}
		strText = strText.toString();

		//문자열 길이가 4이상일 경우만 처리 
		// 이부분이 왜 걸려잇는지 모르겠음...테스트 후 길이체크는 막을 예정..
		// if(strText.length <= 3){return strText;}

		//XSS이 적용되었을 경우 원래 문자로 치환하여 반환한다.
		strText = replaceAll(strText,"<","&lt;");
		strText = replaceAll(strText,">","&gt;");
		strText = replaceAll(strText,"(","&#40;");
		strText = replaceAll(strText,")","&#41;");
		strText = replaceAll(strText,"[","&#91;");
		strText = replaceAll(strText,"]","&#93;");
		//strText = replaceAll(strText,"'","&apos;");
		//strText = replaceAll(strText,"&","&amp;");

		return strText;
	},
	
	restoreXSS_Dec2:function(strText){
		//값존재유무 체크
		if(strText === "" || strText == null){return strText;}
		strText = strText.toString();

		//문자열 길이가 4이상일 경우만 처리
		if(strText.length <= 3){return strText;}

		//XSS이 적용되었을 경우 원래 문자로 치환하여 반환한다.
		strText = replaceAll(strText,"<","&lt;");
		strText = replaceAll(strText,">","&gt;");
		strText = replaceAll(strText,"(","&#40;");
		strText = replaceAll(strText,")","&#41;");
		strText = replaceAll(strText,"[","&#91;");
		strText = replaceAll(strText,"]","&#93;");

		return strText;
	},
	
	showDocProgressBar:function(blnDoShow, strProcTitle){
		if(typeof(blnDoShow) === "undefined"){blnDoShow = true;}
		try{
			if(!blnDoShow){
				if(gintRequestCnt == 0){
					$(".tt-loader").fadeOut("fast");
					$("body > .tt-loader").remove();
				}
			}else{
				if(gintRequestCnt == 1){
					$("body").append('<div class="tt-loader"><span></span></div>');
					$(".tt-loader").fadeIn("fast");
				}
			}
		}catch(e){console.log("error=", e);}
//		if(typeof(blnDoShow) === "undefined"){blnDoShow = true;}
//		try{
//			if(!blnDoShow){
//				if(gintRequestCnt == 0){
//					top.$.unblockUI();
//				}
//			}else{
//				if(gintRequestCnt == 1){
//					if(typeof(strProcTitle) === "undefined" || strProcTitle === ""){
//						strProcTitle = "<img src='/common/img/btn/busymsg.gif'>";
//					}
//					top.$.blockUI({message:"<table><tr><td><img src='/common/img/btn/busy.gif'></td><td>" + strProcTitle + "</td></tr></table>", fadeIn:0, fadeOut:400});
//				}
//			}
//		}catch(e){}
	},
	
	showDhxCalendarObject:function(targetObj, blnDoubleCalendar, event){
		
		//이벤트 버블링 제어
		event.cancelBubble = true;
		//자동으로 활성화되어있는 dhtmlx 컴포넌트 오브젝트들을 닫아준다.
		$.closingActiveDhxComponent(event);
		
		var objDhxCalendar	= null;
		var objRoot			= $(targetObj);
		var objRootBtn		= $(targetObj);
		var strClassName	= "";
		if($(targetObj).prop("tagName") === "I"){
			objRoot = objRootBtn.parent().prev();
		}
		strClassName = $(objRoot).attr("class");
		if(!blnDoubleCalendar){
			if(strClassName.indexOf("class_datepicker") >= 0){
				if(typeof(gobjDhxDayCalendar.baseInput) !== "undefined" && gobjDhxDayCalendar.baseInput[0] !== objRoot[0]){
					gobjDhxDayCalendar.detachObj(gobjDhxDayCalendar.baseInput[0]);
				}
				if(typeof(gobjDhxDayCalendar.baseInput) === "undefined" || gobjDhxDayCalendar.baseInput[0] !== objRoot[0]){
					gobjDhxDayCalendar.baseInput	= objRoot;
					gobjDhxDayCalendar.baseButton	= objRootBtn;
					gobjDhxDayCalendar.attachObj(objRoot[0]);
					gobjDhxDayCalendar._detachEventsFromObject(objRoot[0]._dhtmlxcalendar_uid);
				}
				if(gobjDhxDayCalendar.isVisible()){
					gobjDhxDayCalendar.hide();
				}else{
					gobjDhxDayCalendar.show();
				}
			}else if(strClassName.indexOf("class_monthpicker") >= 0){
				if(typeof(gobjDhxMonthCalendar.baseInput) !== "undefined" && gobjDhxMonthCalendar.baseInput[0] !== objRoot[0]){
					gobjDhxMonthCalendar.detachObj(gobjDhxMonthCalendar.baseInput[0]);
				}
				if(typeof(gobjDhxMonthCalendar.baseInput) === "undefined" || gobjDhxMonthCalendar.baseInput[0] !== objRoot[0]){
					gobjDhxMonthCalendar.baseInput	= objRoot;
					gobjDhxMonthCalendar.baseButton	= objRootBtn;
					gobjDhxMonthCalendar.attachObj(objRoot[0]);
					gobjDhxMonthCalendar._detachEventsFromObject(objRoot[0]._dhtmlxcalendar_uid);
				}
				if(gobjDhxMonthCalendar.isVisible()){
					gobjDhxMonthCalendar.hide();
				}else{
					gobjDhxMonthCalendar.show();
				}
			}else if(strClassName.indexOf("class_timepicker") >= 0){
				if(typeof(gobjDhxTimeCalendar.baseInput) !== "undefined" && gobjDhxTimeCalendar.baseInput[0] !== objRoot[0]){
					gobjDhxTimeCalendar.detachObj(gobjDhxTimeCalendar.baseInput[0]);
				}
				if(typeof(gobjDhxTimeCalendar.baseInput) === "undefined" || gobjDhxTimeCalendar.baseInput[0] !== objRoot[0]){
					gobjDhxTimeCalendar.baseInput	= objRoot;
					gobjDhxTimeCalendar.baseButton	= objRootBtn;
					gobjDhxTimeCalendar.attachObj(objRoot[0]);
					gobjDhxTimeCalendar._detachEventsFromObject(objRoot[0]._dhtmlxcalendar_uid);
				}
				if(gobjDhxTimeCalendar.isVisible()){
					gobjDhxTimeCalendar.hide();
				}else{
					gobjDhxTimeCalendar.show();
				}
			}
		}else{
			$(objRoot).each(function(){
				objDhxCalendar = this.dhxCalendar;
			});
			if(typeof(objDhxCalendar) !== "undefined" && objDhxCalendar != null){
				if(objDhxCalendar.leftCalendar.isVisible()){
					objDhxCalendar.hide();
				}else{
					//input이 readonly일 경우 달력 안보여줌
					if(!$(objDhxCalendar.baseInputLeft).hasClass("twbDisabled") && !$(objDhxCalendar.baseInputRight).hasClass("twbDisabled")){
						var intAdjustX		= 0;
						var intAdjustY		= 0;
						var intDocWidth		= parseInt($(document.body).width(), 10) + 1;
						var intDocHeight	= parseInt($(document.body).height(), 10) + 1;
						var intObjPosX		= parseInt($(objRoot).offset().left, 10) + 1;
						var intObjPosY		= parseInt($(objRoot).offset().top, 10) + 1;
						objDhxCalendar.leftCalendar.setPosition(intObjPosX, intObjPosY+20);
						objDhxCalendar.rightCalendar.setPosition(intObjPosX, intObjPosY+20);
						if((intDocWidth-intObjPosX) < 500){
							intAdjustX = -500 + (intDocWidth-intObjPosX);
						}
						if(strClassName.indexOf("class_datepicker") >= 0){
							if((intDocHeight-intObjPosY) < 330){
								intAdjustY = -300;
							}else{
								intAdjustY = 25;
							}
						}else if(strClassName.indexOf("class_monthpicker") >= 0){
							if((intDocHeight-intObjPosY) < 100){
								intAdjustY = -65;
							}else{
								intAdjustY = 25;
							}
						}
						if(intAdjustX != 0 || intAdjustY != 0){
							objDhxCalendar.leftCalendar.setPosition(intObjPosX + intAdjustX, intObjPosY + intAdjustY);
							objDhxCalendar.rightCalendar.setPosition(intObjPosX + intAdjustX, intObjPosY + intAdjustY);
						}
						objDhxCalendar.show();
					}
				}
			}
		}
		objDhxCalendar	= null;
		objRoot			= null;
		objRootBtn		= null;
		strClassName	= null;
	},
	//콤보박스 focus 벗어날 시 자동 닫아주는 기능
	autoCloseActiveDhxCombo:function(event){
		if(gobjActiveDhxCombo.length > 0){
			if(typeof(event) === "undefined"){
				for(var i = 0; i < gobjActiveDhxCombo.length; i++){
					$(gobjActiveDhxCombo[i].getBase()).removeClass("active_element");
					gobjActiveDhxCombo[i].closeAll();
				}
				gobjActiveDhxCombo = [];
			}else{
				var strClassName = $(event.target).attr("class");
				if(typeof(strClassName) === "undefined"){strClassName = "";}
				var objRoot = null;
				if(strClassName.indexOf("dhxcombo_select_img") >= 0){
					objRoot = $(event.target).parent().parent();
				}else if(strClassName.indexOf("twbCombo_selected") >= 0){
					objRoot = $(event.target).parent();
				}else if(strClassName.indexOf("dhxcombo_option_text") >= 0){
					objRoot = $(event.target).parent().parent();
				}else if(strClassName.indexOf("dhxcombo_") >= 0){
					objRoot = $(event.target);
				}
				for(var i = 0; i < gobjActiveDhxCombo.length; i++){
					if(objRoot == null){
						$(gobjActiveDhxCombo[i].getBase()).removeClass("active_element");
		    			gobjActiveDhxCombo[i].closeAll();
		    			/*
		    			if($(gobjActiveDhxCombo[i].getBase()).hasClass("mandatory")){
		    				if(gobjActiveDhxCombo[i].getChecked().length == 0 && (gobjActiveDhxCombo[i].getSelectedValue() == null || gobjActiveDhxCombo[i].getSelectedValue() === "")){
			    				gobjDhxMsgPop.attachHTML("<font style='color:red;'>" + TWB_MSG.EMPTY_DATA_FILL + "</font>");
								gobjDhxMsgPop.show($(gobjActiveDhxCombo[i].getBase()).offset().left, $(gobjActiveDhxCombo[i].getBase()).offset().top, $(gobjActiveDhxCombo[i].getBase()).width(), $(gobjActiveDhxCombo[i].getBase()).height());
			    			}
		    			}
		    			*/
		    			gobjActiveDhxCombo.splice(i,1);
					}else{
						if(gobjActiveDhxCombo[i].getBase() != objRoot[0] && gobjActiveDhxCombo[i].getList() != objRoot[0]){
							$(gobjActiveDhxCombo[i].getBase()).removeClass("active_element");
			    			gobjActiveDhxCombo[i].closeAll();
			    			/*
			    			if($(gobjActiveDhxCombo[i].getBase()).hasClass("mandatory")){
			    				if(gobjActiveDhxCombo[i].getChecked().length == 0 && (gobjActiveDhxCombo[i].getSelectedValue() == null || gobjActiveDhxCombo[i].getSelectedValue() === "")){
				    				gobjDhxMsgPop.attachHTML("<font style='color:red;'>" + TWB_MSG.EMPTY_DATA_FILL + "</font>");
									gobjDhxMsgPop.show($(gobjActiveDhxCombo[i].getBase()).offset().left, $(gobjActiveDhxCombo[i].getBase()).offset().top, $(gobjActiveDhxCombo[i].getBase()).width(), $(gobjActiveDhxCombo[i].getBase()).height());
				    			}
			    			}
			    			*/
			    			gobjActiveDhxCombo.splice(i,1);
						}
					}
				}
			}
		}
	},
	//캘린더 focus 벗어날 시 자동 닫아주는 기능
	autoCloseActiveDhxCalendar:function(event){
		if(gobjActiveDhxCalendar.length > 0){
			var objInput	= null;
			var strClassName = $(event.target).attr("class");
			if(typeof(strClassName) === "undefined"){strClassName = "";}
			if(strClassName.indexOf("icon-calendar") >= 0 || strClassName.indexOf("icon-clock") >= 0){
				objInput	= $(event.target).parent().prev();
			}else if(strClassName.indexOf("class_datepicker") >= 0 || strClassName.indexOf("class_monthpicker") >= 0 || strClassName.indexOf("class_timepicker") >= 0){
				objInput	= $(event.target);
			}
			for(var i = 0; i < gobjActiveDhxCalendar.length; i++){
				if(objInput == null){
					gobjActiveDhxCalendar[i].hide();
					gobjActiveDhxCalendar.splice(i,1);
				}else{
					if(typeof(gobjActiveDhxCalendar[i].baseInput) !== "undefined" && typeof(gobjActiveDhxCalendar[i].baseButton) !== "undefined"){
						if(gobjActiveDhxCalendar[i].baseInput[0] !== objInput[0]){
							gobjActiveDhxCalendar[i].hide();
							gobjActiveDhxCalendar.splice(i,1);
						}
					}else{
						if(gobjActiveDhxCalendar[i].baseInputLeft[0] !== objInput[0] && gobjActiveDhxCalendar[i].baseInputRight[0] !== objInput[0]){
							gobjActiveDhxCalendar[i].hide();
							gobjActiveDhxCalendar.splice(i,1);
						}
					}
				}
			}
		}
	},
	//활성화된 context menu 자동 숨김 기능
	autoHideActiveDhxContextMenu:function(){
		if(gobjActiveDhxContext.length > 0){
			gobjActiveDhxContext[0].hideContextMenu();
			gobjActiveDhxContext.splice(0,1);
		}
	},
	
	//자동으로 활성화되어있는 dhtmlx 컴포넌트 오브젝트들을 닫아준다.
	closingActiveDhxComponent:function(objEvent){
		if(typeof(top.mobjContextMenu) !== "undefined"){
			//top.mobjContextMenu.hideContextMenu();
		}
		//펼쳐져 있는 콤보박스 접기.
		$.autoCloseActiveDhxCombo(objEvent);
		//펼쳐져 있는 달력 접기.
		$.autoCloseActiveDhxCalendar(objEvent);
		//펼쳐져 있는 컨텍스트 메뉴 접기.
		$.autoHideActiveDhxContextMenu();
	},
	
	checkIsArray:function(obj){
		if(typeof(obj) === "undefined"){return false;}
		
		if(typeof((obj.join && obj.pop && obj.push && obj.reverse && obj.shift && obj.slice && obj.splice)) === "undefined"){
			return false;
		}else{
			return true;
		}
	},
	
	checkIsWansungChar:function(strText){
		if(typeof(strText) === "undefined"){return false;}
		
		var blnRetVal = true;
		for(var i = 0; i < strText.length; i++){
			var chr = strText.substr(i,1);
			chr = escape(chr);
			if(chr.charAt(1) == "u"){
				chr = chr.substr(2, (chr.length - 1));
				if((chr < "AC00") || (chr > "D7A3")){blnRetVal = false; break;}
			}else{
				blnRetVal = false;
				break;
			}
		}

		return blnRetVal;
	},
	
	/**
	 * 화면 최초 로드 시 메뉴테이블 상의 메뉴명으로 화면 타이틀명 세팅.
	 * @author MPC R&D Team
	 */
	setMenuNameTitle:function(){
		if(top.document.location.href.indexOf("TwbMain") >= 0){
			var objTab = null;
			top.$("#div_main").each(function(){
				objTab = this.dhxTabs;
			});
			if(typeof(objTab) !== "undefined" && objTab != null){
				try{
					var jsonParams = $.cnvtUrlParamToJson();
					var objActiveTab = objTab.tabs(objTab.getActiveTab());
					if(objActiveTab.getId() === jsonParams.getData("MENU_ID")){
						if(objActiveTab.getText().indexOf("<i ") >= 0){
							$("#spanMenuTitle").html(objActiveTab.getText());
						}else{
							$("#spanMenuTitle").append(objActiveTab.getText());
						}
					}
				}catch(e){console.log("error=", e);}
			}
			objTab = null;
		}
	},
	
	/*
	 * 최대 글자 BYTE수 만큼 자르기, BYTE수 체크
	 * @param 	{String} strId01 			TETAREA ID
	 * @param 	{String} strId02 			BYTE ID
	 * @param 	{String} strFormID			폼아이디
	 * @param 	{String} strMaxByteLength	최대Byte수
	 * @author 	HKC R&D Team
	 */
	getMaxByteString:function(strId01, strId02, strFormID, strMaxByteLength){
		if(typeof(strId01) === "undefined" || strId01 === ""){TwbMsg(TWB_MSG.TAGID_NO_EXIST, "E");return;}
		if(typeof(strFormID) === "undefined" || strFormID === ""){TwbMsg(TWB_MSG.FORM_ID_NO_EXIST, "E");return;}
		if(typeof(strMaxByteLength) === "undefined" || strMaxByteLength === ""){TwbMsg(TWB_MSG.MAX_BYTE_NO_EXIST, "E");return;}
		
		var blnCreateForm = false;
		var objForm = document.getElementById(strFormID);
		var strValue = "";
		var rtnStrValue = "";
		
		//폼객체 생성
		if(objForm === null){
			objForm = document.createElement("form");
			objForm.id = strFormID;
			objForm.name = strFormID;
			objForm.action = strAction;
			objForm.style.display = "none";
			objForm.method = "POST";
			blnCreateForm = true;
		}

		//TEXTAREA 설정
		if(strId01 !== ""){
			if(document.getElementById(strId01) !== null){
				strValue = document.getElementById(strId01).value;
			}
		}
		
		//BYTE수 체크
		if (getByte(strValue) > strMaxByteLength) {
			if(strValue == null || strValue.length == 0) {
				return 0;
			}
			var size = 0;
			var strLen = strValue.length;
			
			for(var i=0; i<strValue.length; i++) {
				size += getByte(strValue.charAt(i));
				if(size == strMaxByteLength) {
					strLen = i+1;
					break;
				} else if(size > strMaxByteLength) {
					strLen = i;
					break;
				}
			}
			strValue = strValue.substring(0, strLen);
		}
		//처리된문자열
		document.getElementById(strId01).value = strValue;
		//처리된문자BYTE수
		if(document.getElementById(strId02) !== null || strId02 === ""){
			document.getElementById(strId02).innerHTML = getByte(strValue);
		}
	}	
});



//해쉬알고리즘
var Hash = {
	encryptMD5:function(strOrgData){
		return this.rstr2hex(this.rstr_md5(this.str2rstr_utf8(strOrgData))); 
	},
	rstr_md5:function(strOrgData){
		return this.binl2rstr(this.binl_md5(this.rstr2binl(strOrgData), strOrgData.length * 8));
	},
	
	binl_md5:function(x, len){
		x[len >> 5] |= 0x80 << ((len) % 32);
		x[(((len + 64) >>> 9) << 4) + 14] = len;
	
		var a =1732584193;
		var b = -271733879;
		var c = -1732584194;
		var d =271733878;
	
		for(var i = 0; i < x.length; i += 16){
			var olda = a;
			var oldb = b;
			var oldc = c;
			var oldd = d;
		
			a = this.md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
			d = this.md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
			c = this.md5_ff(c, d, a, b, x[i+ 2], 17,606105819);
			b = this.md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
			a = this.md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
			d = this.md5_ff(d, a, b, c, x[i+ 5], 12,1200080426);
			c = this.md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
			b = this.md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
			a = this.md5_ff(a, b, c, d, x[i+ 8], 7 ,1770035416);
			d = this.md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
			c = this.md5_ff(c, d, a, b, x[i+10], 17, -42063);
			b = this.md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
			a = this.md5_ff(a, b, c, d, x[i+12], 7 ,1804603682);
			d = this.md5_ff(d, a, b, c, x[i+13], 12, -40341101);
			c = this.md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
			b = this.md5_ff(b, c, d, a, x[i+15], 22,1236535329);
		
			a = this.md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
			d = this.md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
			c = this.md5_gg(c, d, a, b, x[i+11], 14,643717713);
			b = this.md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
			a = this.md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
			d = this.md5_gg(d, a, b, c, x[i+10], 9 ,38016083);
			c = this.md5_gg(c, d, a, b, x[i+15], 14, -660478335);
			b = this.md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
			a = this.md5_gg(a, b, c, d, x[i+ 9], 5 ,568446438);
			d = this.md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
			c = this.md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
			b = this.md5_gg(b, c, d, a, x[i+ 8], 20,1163531501);
			a = this.md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
			d = this.md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
			c = this.md5_gg(c, d, a, b, x[i+ 7], 14,1735328473);
			b = this.md5_gg(b, c, d, a, x[i+12], 20, -1926607734);
		
			a = this.md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
			d = this.md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
			c = this.md5_hh(c, d, a, b, x[i+11], 16,1839030562);
			b = this.md5_hh(b, c, d, a, x[i+14], 23, -35309556);
			a = this.md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
			d = this.md5_hh(d, a, b, c, x[i+ 4], 11,1272893353);
			c = this.md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
			b = this.md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
			a = this.md5_hh(a, b, c, d, x[i+13], 4 ,681279174);
			d = this.md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
			c = this.md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
			b = this.md5_hh(b, c, d, a, x[i+ 6], 23,76029189);
			a = this.md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
			d = this.md5_hh(d, a, b, c, x[i+12], 11, -421815835);
			c = this.md5_hh(c, d, a, b, x[i+15], 16,530742520);
			b = this.md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);
		
			a = this.md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
			d = this.md5_ii(d, a, b, c, x[i+ 7], 10,1126891415);
			c = this.md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
			b = this.md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
			a = this.md5_ii(a, b, c, d, x[i+12], 6 ,1700485571);
			d = this.md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
			c = this.md5_ii(c, d, a, b, x[i+10], 15, -1051523);
			b = this.md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
			a = this.md5_ii(a, b, c, d, x[i+ 8], 6 ,1873313359);
			d = this.md5_ii(d, a, b, c, x[i+15], 10, -30611744);
			c = this.md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
			b = this.md5_ii(b, c, d, a, x[i+13], 21,1309151649);
			a = this.md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
			d = this.md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
			c = this.md5_ii(c, d, a, b, x[i+ 2], 15,718787259);
			b = this.md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);
		
			a = this.safe_add(a, olda);
			b = this.safe_add(b, oldb);
			c = this.safe_add(c, oldc);
			d = this.safe_add(d, oldd);
		}
		
		return Array(a, b, c, d);
	},		
	md5_ff:function(a, b, c, d, x, s, t){
		return this.md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
	},		
	md5_gg:function(a, b, c, d, x, s, t){
		return this.md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
	},	
	md5_hh:function(a, b, c, d, x, s, t){
		return this.md5_cmn(b ^ c ^ d, a, b, x, s, t);
	},		
	md5_ii:function(a, b, c, d, x, s, t){
		return this.md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
	},	
	md5_cmn:function(q, a, b, x, s, t){
		return this.safe_add(this.bit_rol(this.safe_add(this.safe_add(a, q), this.safe_add(x, t)), s),b);
	},	
	str2rstr_utf8:function(input){
		var output = "";
		var i = -1;
		var x, y;

		while(++i < input.length){
		    x = input.charCodeAt(i);
		    y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
		    if(0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF)
		    {
		      x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
		      i++;
		    }
		 
		    if(x <= 0x7F)
		      output += String.fromCharCode(x);
		    else if(x <= 0x7FF)
		      output += String.fromCharCode(0xC0 | ((x >>> 6 ) & 0x1F),
		                                    0x80 | ( x         & 0x3F));
		    else if(x <= 0xFFFF)
		      output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F),
		                                    0x80 | ((x >>> 6 ) & 0x3F),
		                                    0x80 | ( x         & 0x3F));
		    else if(x <= 0x1FFFFF)
		      output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07),
		                                    0x80 | ((x >>> 12) & 0x3F),
		                                    0x80 | ((x >>> 6 ) & 0x3F),
		                                    0x80 | ( x         & 0x3F));
		  }
		
		  return output;
	},		
	rstr2binl:function(input){
		 var output = Array(input.length >> 2);
		  for(var i = 0; i < output.length; i++)
		    output[i] = 0;
		  for(var i = 0; i < input.length * 8; i += 8)
		    output[i>>5] |= (input.charCodeAt(i / 8) & 0xFF) << (i%32);
		  return output;
	},		
	binl2rstr:function(input){
		var output = "";
		for(var i = 0; i < input.length * 32; i += 8)
			output += String.fromCharCode((input[i>>5] >>> (i % 32)) & 0xFF);
		return output;
	},		
	rstr2hex:function(input){
		var hex_tab = 0 ? "0123456789ABCDEF" : "0123456789abcdef";
		var output = "";
		var x;
		for(var i = 0; i < input.length; i++)		  {
			x = input.charCodeAt(i);
			output += hex_tab.charAt((x >>> 4) & 0x0F)
		    	   +  hex_tab.charAt( x        & 0x0F);
		}
		return output;
	},	
	safe_add:function(x, y){
		var lsw = (x & 0xFFFF) + (y & 0xFFFF);
		var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
		return (msw << 16) | (lsw & 0xFFFF);
	},
	bit_rol:function(num, cnt){
		return (num << cnt) | (num >>> (32 - cnt));
	}
};







/**
 * javascript Array 객체 복사
 * @param obj
 * @returns
 */
function clone(obj){
    if(obj == null || typeof(obj) != 'object')
        return obj;
    var temp = obj.constructor();
    for(var key in obj)
        temp[key] = clone(obj[key]);
    return temp;
}




/**
 * 구분에 따라 메시지박스 또는 확인메시지박스를 출력한다.
 * @param strMsg 출력할 메시지
 * @param strCase I:alert 메시지, C:confirm 메시지 (미정의 시 I)
 * @returns strCase가 C일 경우 true/false
 * @author MPC R&D Team
 */
function TwbMsg(strMsg, strCase, callBackFn, strSubMsg){
	if(typeof(strCase) === "undefined"){strCase = "";}
	if(typeof(strSubMsg) === "undefined"){strSubMsg = "";}
	if(strCase === "C" && typeof(callBackFn) !== "function"){
		return false;
	}
	if(strCase === "I"){
		var strOpenMsg = strMsg;
		if(strSubMsg !== ""){strOpenMsg = strOpenMsg + "\n\n" + strSubMsg;}
		alert(strOpenMsg);
	}else if(strCase === "CI"){
		var strOpenMsg = strMsg;
		if(strSubMsg !== ""){strOpenMsg = strOpenMsg + "\n\n" + strSubMsg;}
	}else{
		var strTitle = strMsg;
		var strSubText = strSubMsg;
		var strType,strPosition,blnShowCancel,strConfirmBtnColor,strTheme;
		switch(strCase){
			case "E" :
				strType = "alert";
				strMsg = "<i class='alert-icon is-error'></i><h1>" + strMsg + "</h1>";
				strPosition = "cc";
				strTheme = "";
				break;
			case "S" :
				strType = "alert";
				strMsg = "<i class='alert-icon is-success'></i><h1>" + strMsg + "</h1>";
				strPosition = "cc";
				strTheme = "";
				break;
			case "C" :
				strType = "confirm";
				strMsg = "<i class='alert-icon is-warning'></i><h1>" + strMsg + "</h1>";
				strPosition = "cc";
				strTheme = "";
				break;
			case "W" :
				strType = "alert";
				strMsg = "<i class='alert-icon is-warning'></i><h1>" + strMsg + "</h1>";
				strPosition = "cc";
				strTheme = "";
				break;
			case "P" :
				strType = "prompt";
				strMsg = "<i class='alert-icon is-warning'></i><h1>" + strMsg + "</h1>";
				strPosition = "cc";
				strTheme = "";
				break;
			case "N" :
				strType = "notification";
				strMsg = "<i class='icon-3x icon-warning'></i><h1>" + strMsg + "</h1>";
				strPosition = "cc";
				strTheme = "blood";
				break;
			default :
				strType = "alert";
				strMsg = "<i class='alert-icon is-info'></i><h1>" + strMsg + "</h1>";
				strPosition = "tr";
				strTheme = "";
				break;
		}
		var option = {
			type		: strType,
			title		: strMsg,
			width		: null,
			maxheight	: null,
			vspace		: 15,
			hspace		: 20,
			backdrop	: false,
			close		: true,
			message		: strSubMsg,
			buttons		: {},
			theme		: strTheme,
			interval	: 0,
			margin		: 20,
			position	: strPosition,
			placeholder	: '',
			esc			: true,
			callback	: function(res){
				if(typeof(callBackFn) === "function"){
					callBackFn.call("", res);
				}
				if(gobjActiveElement != null && gobjActiveElement.focus){
					gobjActiveElement.focus();
					gobjActiveElement = null;
				}
			}
		}
		try{
			if(document.activeElement != null){gobjActiveElement = document.activeElement;}
			top.$.alert(option);
			top.window.document.body.focus();
		}catch(E){console.log("error=", E);}
	}
}

/**
 * 문자열에서 특정문자열을 찾아서 특정문자로 변환한다.(정규식 사용하지 않고 직접처리함)
 * @param {String} strText 전체 문자열
 * @param {String} strFind 찾을 문자열
 * @param {String} strChange 변경할 문자열
 * @return {String} 치환된 문자열
 */
function replaceAll(strText, strFind, strChange){
	if(typeof(strText)		=== "undefined"){strText	= "";}
	if(typeof(strFind)		=== "undefined"){strFind	= "";}
	if(typeof(strChange)	=== "undefined"){strChange	= "";}
	if(typeof(strText)		!== "string"){strText	= strText.toString();}
	if(typeof(strFind)		!== "string"){strFind	= strFind.toString();}
	if(typeof(strChange)	!== "string"){strChange	= strChange.toString();}
	return strText.split(strFind).join(strChange);
}

/**
 * TwbGrid에서 호출하는 포맷터함수를 정의함
 * @returns 해당 포맷으로 변환된 결과
 * @author MPC R&D Team
 */
function date_format(a,t,o)		{if(a == null || a == "") return ""; return date_onCheck(a,a);}
function datetime_format(a,t,o)	{if(a == null || a == "") return ""; return datetime_onCheck(a,a);}
function time_format(a,t,o)		{if(a == null || a == "") return ""; return time_onCheck(a,a);}
function tmtime_format(a,t,o)	{if(a == null || a == "") return ""; return tmtime_onCheck(a,a);}
function mtime_format(a,t,o)	{if(a == null || a == "") return ""; return mtime_onCheck(a,a);}
function number_format(a,t,o)	{if(a == null || a == "") return ""; return number_onCheck(Number(a)+"",a);}
function float1_format(a,t,o)	{if(a == null || a == "") return ""; return float_onCheck(a+"",a,1);}
function float2_format(a,t,o)	{if(a == null || a == "") return ""; return float_onCheck(a+"",a,2);}
function float3_format(a,t,o)	{if(a == null || a == "") return ""; return float_onCheck(a+"",a,3);}
function float4_format(a,t,o)	{if(a == null || a == "") return ""; return float_onCheck(a+"",a,4);}
function double_format(a,t,o) 	{if(a == null || a == "") return ""; return double_onCheck(a+"",a,0,2);}
function biz_format(a)			{if(a == null || a == "") return ""; return biz_onCheck(a+"",a);}
function rrno_format(a,t,o)		{if(a == null || a == "") return ""; return rrno_onCheck(a+"");}
function rrn_format(a,t,o)		{if(a == null || a == "") return ""; return rrno_onEncriptCheck(a+"");}
function post_format(a,t,o)		{if(a == null || a == "") return ""; return post_onCheck(a+"",a);}
function card_format(a,t,o)		{if(a == null || a == "") return ""; return card_onCheck(a,a);}
function tlnoor_format(a,t,o)	{if(a == null || a == "") return ""; return tlno_onCheck(a,a) ;}
function tlno_format(a,t,o)		{if(a == null || a == "") return ""; return tlno_onEncriptCheck(a,a);}


/**
 * 날짜형식으로 변환하여 반환한다.
 * @param {String} aival :날짜로 포맷하려는 데이터
 * @param {String} reval :형식이 맞지 않을 경우 디폴트값
 * @param {String} strSep :날짜구분값(디폴트 '/' )
 * @return YYYY, YYYY/MM, YYYY/MM/DD
 * @author MPC R&D Team 
 */
function date_onCheck(aival,reval,strSep){
	if(typeof(aival) === "undefined"){aival = "";}
	if(typeof(strSep) === "undefined"){strSep = "/";}
	if(!reval && reval !== ""){ reval = aival;}
	var ival = aival.replace(/[^0-9]/g, "");
	if( ival != ""  && ival.length == 8){
		if( !dateValidation(ival) ){
			return reval;
		} else {
			return ival.substring(0,4) + strSep + ival.substring(4,6) + strSep + ival.substring(6);
		}
	} else if( ival !== ""  && ival.length === 6) {
		if( !dateValidation(ival) ) {
			return reval;
		} else {
			return ival.substring(0,4) + strSep + ival.substring(4);
		}
	} else if( ival !== ""  && ival.length === 4) {
		if( !dateValidation(ival) ) {
			return reval;
		} else {
			return ival.substring(0,4);
		}
	} else if( ival === "") {
		return reval;
	} else {
		if( !dateValidation(reval) ) { return ""; }
		return reval;
	}
}

/**
 * 날짜 유효성 검사를 한다. (date_onCheck함수에서 문자열을 제거하고 숫자만 만들어서 호출)
 * @param {String} dateStr 숫자로된문자열 YYYY, YYYYMM, YYYYMMDD(3가지유형허용)
 * @return 날짜형식이면 true, 아니면 false
 * @author MPC R&D Team 
 */
function dateValidation(dateStr){
	if( dateStr.length == 8 ){
		var year = Number(dateStr.substr(0,4));  
		var month = Number(dateStr.substr(4,2));
		var day = Number(dateStr.substr(6,2));
		if (year < 1900 || year > 2999) {return false;}
		if (month < 1 || month > 12) {return false;}
		if (day < 1 || day > 31) {return false;}
		if ((month==4 || month==6 || month==9 || month==11) && day==31) {return false;}
		if (month == 2) { // check for february 29th
			var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
			if (day>29 || (day==29 && !isleap)) {
				return false;
			}
		}
		return true;
	} else if( dateStr.length == 6 ){
		var year = Number(dateStr.substr(0,4));
		var month = Number(dateStr.substr(4,2));
		if (year < 1900 || year > 2999) {return false;}
		if (month < 1 || month > 12) {return false;}
		return true;
	} else if( dateStr.length == 4 ){
		var year = Number(dateStr.substr(0,4));
		if (year < 1900 || year > 2999) {return false;}
		return true;
	}
}

/**
 * 시간형식으로 변환하여 반환한다.
 * @param {String} aival :날짜로 포맷하려는 데이터
 * @param {String} reval :형식이 맞지 않을 경우 디폴트값
 * @return HH24:MI:SS, HH24:MI 
 * @author MPC R&D Team 
 */
function time_onCheck(aival,reval){
	if(!reval && reval !== ""){reval = aival;}
	var ival = aival.replace(/[^0-9]/g, "");
	if( ival !== ""  && ival.length === 6){
		if(parseInt(ival.substring(0,2), 10) < 0 || parseInt(ival.substring(0,2), 10) > 23){
			return reval;
		}
		if(parseInt(ival.substring(2,4), 10) < 0 || parseInt(ival.substring(2,4), 10) > 59){
			return reval;
		}
		if(parseInt(ival.substring(4), 10) < 0 || parseInt(ival.substring(4), 10) > 59){
			return reval;
		}
		return ival.substring(0,2) + ":" + ival.substring(2,4) + ":" + ival.substring(4);
	} else if( ival !== ""  && ival.length === 4){
		if(parseInt(ival.substring(0,2), 10) < 0 || parseInt(ival.substring(0,2), 10) > 23){
			return reval;
		}
		if(parseInt(ival.substring(2), 10) < 0 || parseInt(ival.substring(2), 10) > 59){
			return reval;
		}
		return ival.substring(0,2) + ":" + ival.substring(2);
	} else {
		return reval;
	}
}

/**
 * 날짜시간 형식으로 변환하여 반환한다.
 * @param {String} aival :날짜시간형식으로 포맷하려는 데이터
 * @param {String} reval :형식이 맞지 않을 경우 디폴트값
 * @param {String} strSep :날짜구분값(디폴트 '/' )
 * @return YYYY/MM/DD HH24:MI:SS, YYYY/MM/DD HH24:MI
 * @author MPC R&D Team 
 */
function datetime_onCheck(aival,reval,strSep){
	if(typeof(aival) === "undefined"){return "";}
	if(typeof(strSep) === "undefined"){strSep = "/";}
	if(!reval && reval !== ""){ reval = aival;}
	var ival = aival.replace(/[^0-9]/g, "");
	if( ival !== ""  && ival.length === 14 ){
		return date_onCheck(ival.substring(0,8),ival.substring(0,8),strSep) + " " + time_onCheck(ival.substring(8,14),ival.substring(8,14));
	} else if( ival !== ""  && ival.length === 12) {
		return date_onCheck(ival.substring(0,8),ival.substring(0,8),strSep) + " " + time_onCheck(ival.substring(8,12),ival.substring(8,12));
	} else {
		return reval;
	}
}

/**
 * 초값을 시간 형식으로 변환하여 반환한다.
 * @param {String} aival :시간형식으로 포맷하려는 초값
 * @param {String} reval :형식이 맞지 않을 경우 디폴트값
 * @return HH24:MI:SS
 * @author MPC R&D Team 
 */
function tmtime_onCheck(aival,reval){
	if(!reval && reval != ""){ reval = aival;}
	if(typeof(aival) === "number"){aival = aival.toString();}
	aival = aival.replace(/[^0-9]/g, "");
	if(aival == "") return reval; 
	var input = parseInt(aival);
	var hour = parseInt(input/3600); 
	var min = parseInt((input%3600)/60); 
	var sec = parseInt(input%60);
	var time = $.rpad(hour.toString(),2,"0")+":"+$.rpad(min.toString()+"",2,"0")+":"+$.rpad(sec.toString()+"",2,"0");
	return time;
}

/**
 * 분값을 시간 형식으로 변환하여 반환한다.
 * @param {String} aival :시간형식으로 포맷하려는 분값
 * @param {String} reval :형식이 맞지 않을 경우 디폴트값
 * @return HH24:MI:SS
 * @author MPC R&D Team 
 */
function mtime_onCheck(aival,reval){
	if(!reval && reval != ""){ reval = aival;}
	aival = aival.replace(/[^0-9]/g, "");
	if(aival == "") return reval;
	
	aival = Number(aival).toFixed(2);
	aival = aival.toString();
	var _sec = "";
	if( aival.indexOf(".") != -1 ){
		_sec = aival.substring(aival.indexOf(".")+1);
		aival = aival.substring(0,aival.indexOf("."));
	}
	var input = Number(aival);
	var hour = parseInt(input/60); 
	var min = parseInt(input%60); 
	var sec = 0;
	if( _sec != "" ){
		_sec = Number(_sec);
		min = min+parseInt(_sec/60);
		sec = _sec%60;
		
	}
	var time = $.rpad(hour.toString(),2,"0")+":"+$.rpad(min.toString()+"",2,"0")+":"+$.rpad(sec.toString()+"",2,"0");
	return time;
}

/**
 * 숫자형식의 문자열을 천자리를 구분하여 반환
 * @param {String} aival :천자리구분할 숫자구조의 데이터
 * @param {String} reval :형식이 맞지 않을 경우 디폴트값
 * @return 999,999,999
 * @author MPC R&D Team 
 */
function number_onCheck(aival,reval){
	aival = String(aival);
	var minus = "";
	if( aival != "" ){
		if(aival.substring(0,1)  == "-"){minus = "-";}
	}

	var fVal = "";
	if( aival.lastIndexOf(".") != -1 ){
		var l  = aival.lastIndexOf(".");
		fVal = "."+aival.substring(l+1);
		aival = aival.substring(0,l);
	}
	var ival = aival.replace(/[^0-9]/g, "");
	if(!reval && reval != ""){reval = aival;}
	
	if( ival != ""){
		ival = Number(ival)+"";
		var index = ival.length;
		var sRet = "";
		for (var i=0;i<index;i+=3){
			if (index > i+3){
				sRet = "," + ival.substring(index-i-3, index-i) + sRet;
			}else{
				sRet = ival.substring(0,index-i) + sRet;
			}
		}
		return minus+sRet+fVal;
	}else{
		return reval;
	}
}

/**
 * 숫자형식의 문자열을 천자리와 소수점자리를 구분하여 반환
 * @param {String} aival :천자리구분할 숫자구조의 데이터
 * @param {String} reval :형식이 맞지 않을 경우 디폴트값
 * @param {int} f :표현할 소수점 자리수
 * @return 999,999,999.0000
 * @author MPC R&D Team 
 */
function float_onCheck(aival,reval, f){
	return double_onCheck(aival,reval,0,f);
}


/**
 * 숫자형식의 문자열을 천자리와 소수점자리를 구분하여 반환
 * @param {String} aival :더블형식으로 표현할 숫자구조의 데이터
 * @param {String} reval :형식이 맞지 않을 경우 디폴트값
 * @param {int} f :숫자 끝자리에서 강제로 소수점으로 변경할 자리수(123456값에서 f를 2로 설정할 경우 1,234.56으로 표시됨)
 * @param {int} v :표현할 소수점 자리수(화면에 표시될 소숫점 자리수)
 * @return 999,999,999.0000
 * @author MPC R&D Team 
 */
function double_onCheck(aival,reval,f,v){
	var minus = "";
	var strRealVal = "";			//소수점을 제외한 값
	var strPointVal = "";			//소수점이하 값
	
	if(reval === ""){reval = (0).toFixed(v);}
	if( aival === "" ){return reval;}	
	//음수여부
	if(aival.substring(0,1) === "-"){minus = "-";}
	//소수점위치
	var intPos = aival.indexOf(".");
	if(intPos >= 0){
		strRealVal = aival.substring(0,intPos).replace(/[^0-9]/g, "");
		strPointVal = "." + aival.substring(intPos + 1).replace(/[^0-9]/g, "");
	} else {
		strRealVal = aival.replace(/[^0-9]/g, "");
		strPointVal = "";
	}	
	
	var ival = strRealVal + strPointVal;
	
	if( ival !== ""){
		var rval = Number(minus+ival).toFixed(v)+"";
		if(f > 0){
			ival = ival.replace(/[^0-9]/g, "");
			rval = Number(minus+ival).toFixed(f)+"";
		}
		return number_onCheck(rval,rval);
	} else {
		return reval;
	}
}

/**
 * 사업자번호로 포맷을 설정한다.
 * @param aival :사업자번호로 format 하려는 Data
 * @param reval :사업자번호로 format에 맞지 않을 경우 넘겨는 주는 Data
 * @returns 999-99-99999
 * @author MPC R&D Team 
 */
function biz_onCheck(aival,reval){
	if(!reval && reval != ""){ 
		reval = aival;
	}
	var ival = aival.replace(/[^0-9]/g, "");
	if( ival != ""  && ival.length == 10){
		return ival.substring(0,3) + "-" + ival.substring(3,5) + "-" + ival.substring(5);
	} else {
		return reval;
	}
}

/**
 * 주민번호로 포맷을 설정한다.
 * @param aival :주민번호로 format 하려는 Data
 * @param reval :주민번호 format에 맞지 않을 경우 넘겨는 주는 Data
 * @returns 000000-0000000
 * @author MPC R&D Team 
 */
function rrno_onCheck(aival,reval){
	if(!reval && reval != "") reval = aival;
	var ival = aival.replace(/[^0-9]/g, "");
	if( ival != "" && ival.length == 13 ){
		return ival.substring(0,6)+"-"+ival.substring(6);
	} else {
		return reval;
	}
}

/**
 * 주민번호로 포맷을 설정한다.(뒤자리 6자리  ******)
 * @param aival :주민번호로 format 하려는 Data
 * @param reval :주민번호 format에 맞지 않을 경우 넘겨는 주는 Data
 * @returns 000000-0******
 * @author MPC R&D Team 
 */
function rrno_onEncriptCheck(aival,reval){
	if(!reval && reval != "") reval = aival;
	var ival = aival.replace(/[^0-9]/g, "");
	if( ival != "" && ival.length == 13 ){
		return ival.substring(0,6)+"-"+ival.substring(6,7)+"******";
	} else {
		return reval;
	}
}

/**
 * 우편번호로 포맷을 설정한다.
 * @param aival :우편번호로 format 하려는 Data
 * @param reval :우편번호 format에 맞지 않을 경우 넘겨는 주는 Data
 * @returns 000-000
 * @author MPC R&D Team  
 */
function post_onCheck(aival,reval){
	if(!reval && reval != "") reval = aival;
	var ival = aival.replace(/[^0-9]/g, "");
	if( ival != "" && ival.length == 6){
		return ival.substring(0,3) + "-" + ival.substring(3);
	}else if(ival.length == 5){
		return ival;
	}else{
		return reval;
	}
}

/**
 * 카드번호로 포맷을 설정한다.
 * @param aival :카드번호로 format 하려는 Data
 * @param reval :카드번호 format에 맞지 않을 경우 넘겨는 주는 Data
 * @returns 9999-9999-9999-9999
 * @author MPC R&D Team  
 */
function card_onCheck(aival,reval){
	if(!reval && reval != "") reval = aival;
	var ival = aival.replace(/[^0-9]/g, "");
	//일반카드 16자리, Amex카드 15자리, Dinus카드 14자리
	if( ival != "" && (ival.length === 16 || ival.length === 15 || ival.length === 14) ){
		return ival.substring(0,4)+"-"+ival.substring(4,8)+"-"+ival.substring(8,12)+"-"+ival.substring(12);
	} else {
		return reval;
	}
}

/**
 * 전화번호로 포맷을 설정한다.
 * @param aival :전화번호로 format 하려는 Data
 * @param reval :전화번호 format에 맞지 않을 경우 넘겨는 주는 Data
 * @returns 0000-0000-0000
 * @author MPC R&D Team  
 */
function tlno_onCheck(aival,reval){
	var ival = aival.replace(/[^0-9]/g, "");
	if(!reval && reval != "") reval = aival;
	if (ival == ""){return reval;}
    if (ival.length == 4){return aival;}
    if (ival.length < 7 || ival.length > 11){return reval;}
	var sTel3 = ival.substring(ival.length-4,ival.length);
    var sTemp = ival.substring(0, ival.length-4);
	if (sTemp.substring(0,1) != "0"){
        if (ival.length < 9 ){
        	return sTemp + "-" + sTel3;
        }
    } else {
    	switch (sTemp.substring(0,2)) {
	        case "02":  //서울
	            nCnt=2;
	            break;
	        default:
	            switch (sTemp.substring(0,3)) {
	                 //핸드폰or pcs
	                case "011":
					case "013":
	                case "016":
	                case "017":
	                case "018":
	                case "019":
	                case "010":
	                case "070":
	                case "080":
	                case "031":
	                case "032":
	                case "033":
	                case "041":
	                case "042":
	                case "043":
	                case "051":
	                case "052":
	                case "053":
	                case "054":
	                case "055":
	                case "061":
	                case "062":
	                case "063":
	                case "064":
	                    nCnt=3;
	                    break;
	                default:
	                    return reval;
	            }
    	}
    
    	return sTemp.substring(0,nCnt)+"-"+sTemp.substring(nCnt, sTemp.length)+"-"+sTel3;
    }
	return reval;
}

/**
 * 전화번호유효성검사
 * @param aival :전화번호로 format 하려는 Data
 * @param 성공이면 true리턴, 실패면 false리턴
 * @returns XXX-XXXX-XXXX 또는 XXXXXXXXXXX
 * @author MPC R&D Team  
 */
function tlno_onCheck01(aival){
	p = aival.split('-').join('');
	var regPhone = /^(\d{3})(\d{4})(\d{4})$/;

	return regPhone.test(p);
}

/**
 * 전화번호로 포맷을 설정한다.(2번째 블럭을 ****로 표시)
 * @param aival :전화번호로 format 하려는 Data
 * @param reval :전화번호 format에 맞지 않을 경우 넘겨는 주는 Data
 * @returns 0000-****-0000
 * @author MPC R&D Team  
 */
function tlno_onEncriptCheck(aival,reval){
	var ival = $.trim(tlno_onCheck(aival,reval));
	var reval = "";
	if(ival == ""){
		return ival;
	} else {
		var ar = ival.split("-");
		if( ar.length == 3) {
			var tmstr = "";
			for( var i = 0 ; i <  ar[1].length ;i++ ) {
				tmstr += "*";
			}
			reval = ar[0]+"-"+tmstr+"-"+ar[2];
		} else if( ar.length == 1) {
			reval += ar[0];
		} else {
			for(var i = 0 ; i < ar.length ;i++) {
				if( i == 1 ){
					reval += "****";
				} else {
					reval += ar[i]+"-";
				}
			}
		}
	}
	return reval;
}


/**
 * 주민번호 유효성 체크를 한다.
 * @param strNo :주민번호
 * @returns true:맞음/false:맞지않음
 * @author MPC R&D Team  
 */
function isJuminNo(strNo){
	//빈문자일 경우 체크
	if (strNo === "") return false;
	strNo = strNo.replace(/[^0-9]/g, "");
    
	//전체길이 체크
	if(strNo.length !== 13) return false;
	
	var jumin1 = strNo.substring(0,6);
    var jumin2 = strNo.substring(6,13);
    var temp  = new Array(); 

    // 주민등록번호 각 자리를 숫자로 변환후 키값을 곱하여 배열에 저장(마지막 자리 제외)
    temp[temp.length] = parseInt(jumin1.charAt(0))*2;
    temp[temp.length] = parseInt(jumin1.charAt(1))*3;
    temp[temp.length] = parseInt(jumin1.charAt(2))*4;
    temp[temp.length] = parseInt(jumin1.charAt(3))*5;
    temp[temp.length] = parseInt(jumin1.charAt(4))*6;
    temp[temp.length] = parseInt(jumin1.charAt(5))*7;
    temp[temp.length] = parseInt(jumin2.charAt(0))*8;
    temp[temp.length] = parseInt(jumin2.charAt(1))*9;
    temp[temp.length] = parseInt(jumin2.charAt(2))*2;
    temp[temp.length] = parseInt(jumin2.charAt(3))*3;
    temp[temp.length] = parseInt(jumin2.charAt(4))*4;
    temp[temp.length] = parseInt(jumin2.charAt(5))*5;
 
    var total = 0;
    var len = temp.length;
    for (var i = 0 ; i < len ; i++) {
        total += temp[i]; // 전부 합침
    }

    var remain = total % 11; // 11로 나눈 나머지
    var check = 11 - remain; // 11에서 나머지 값을 뺀다
    if (check == 10) {
        check = 0;
    }
    if (check == 11) {
        check = 1;
    }
  
    if (check == parseInt(jumin2.charAt(6))){// 결과값과 마지막 자리 수값을 비교
        return true; // 이상없음
    } else {
       return false;  // 오류
    }
}


/**
 * 법인등록번호 유효성검사
 * @param strVal : 법인등록번호
 * @returns true:맞음/false:맞지않음
 * @author MPC R&D Team  
 */
function isBubinNum(strVal){
	strVal = strVal.replace(/[^0-9]/g, "");
	if(strVal == ""){return false;}
		
	if (strVal.length != 13){
		return false;
	}
	
	var arr_bubinNum = strVal.split("");
	var arr_wt = new Array(1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2);
	var iSum_bubinNum = 0;
	var iCheck_digit = 0;
	
	for (var i = 0; i < 12; i++) {
		iSum_bubinNum += eval(arr_bubinNum[i]) * eval(arr_wt[i]);
	}
	
	iCheck_digit = 10 - (iSum_bubinNum % 10);
	iCheck_digit = iCheck_digit % 10;
	
	if (iCheck_digit != arr_bubinNum[12]) {
		return false; // 오류
	}else{
		return true; // 이상없음
	}
}


/**
 * 사업자번호 유효성검사
 * @param strVal : 사업자번호
 * @returns true:맞음/false:맞지않음
 * @author MPC R&D Team  
 */
function isBizNum(strVal){
	
	strVal = strVal.replace(/[^0-9]/g, "");
	if(strVal == ""){return false;}
	
	if (strVal.length != 10) {return false;}
	
	var checkNum = new Array(1, 3, 7, 1, 3, 7, 1, 3, 5, 1);
	var i, chkSum = 0, temp, remander;
	
	for (i = 0; i <= 7; i++) {
		chkSum += checkNum[i] * strVal.charAt(i);
	}
	
	temp = "0" + (checkNum[8] * strVal.charAt(8));
	temp = temp.substring(temp.length - 2, temp.length);
	chkSum += Math.floor(temp.charAt(0)) + Math.floor(temp.charAt(1));
	remander = (10 - (chkSum % 10)) % 10;
	
	if (Math.floor(strVal.charAt(9)) == remander) {
		return true; // 이상없음
	}else {
		return false; // 오류
	}
}

/**
 * 정규식을 이용하여 태그를 삭제하고 반환한다.
 * @param strVal : 태그를 포함한 데이터
 * @returns 태그를 제외한 문자열 반환
 * @author MPC R&D Team  
 */
function removeTag(strVal){
	 return strVal.replace(/<(\/)?([a-zA-Z]*)(\\s[a-zA-Z]*=[^>]*)?(\\s)*(\/)?>/gi, "");
}


/**
 * 바이트 기준으로 문자열 길이를 계산하여 반환한다.
 * @param agStr : 문자열
 * @returns 문자열의 길이
 * @author MPC R&D Team  
 */
function getByte(agStr){
	var tmpStr;
	var temp=0;
	var onechar;
	var tcount;
	tcount = 0;
	tmpStr = new String(agStr);
	
	temp = tmpStr.length;
	var pCnt = 1;

	for ( var k = 0; k < temp; k++ ){
		onechar = tmpStr.charAt(k);
		pCnt =1;
		if ( escape(onechar).length > 4 ){
			pCnt = 2;
		}
		tcount = tcount+pCnt;
	}
	return tcount;
}

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

function getEncryptKey(){
	var objJsonParams = new WebJson();
	objJsonParams.setService("TwbLogin");						//호출할 Class ID
	objJsonParams.setMethod("createEncryptKey");				//호출할 Class의 함수명
	//서비스 호출하여 결과값을 전송받는다.
	var objJsonReturn = $.bizServiceCall(objJsonParams);
	
	//정상처리여부 확인
	if(objJsonReturn.getErrorFlag()){
		//오류 발생 시 해당 오류메시지 표출
		TwbMsg(objJsonReturn.getMsg(), "E");
		return "";
	}else{
		var strEncryptKey = objJsonReturn.getData("ENCRYPT_KEY");
		if(typeof(strEncryptKey) === "undefined" || strEncryptKey === "" || strEncryptKey.length != 32){
			TwbMsg("LOGIN 실패!", "E", undefined, "암호화 키 생성에 실패하였습니다.");
			return "";
		}
		
		return strEncryptKey;
	}
}

function isNumber(objNo, title){
	let regKor = /^[0-9-]*$/;	// 숫자 및 '-'
	let val = $(objNo).valExt();
	if (!regKor.test(val)){
		TwbMsg( title + "는 숫자와 '-'만 사용할 수 있습니다.", "E");
		$(objNo).valExt(val.replace(/[^0-9]/g, ""));
		objNo.focus();
	}
	return false;
}


//핸드폰 형식 번호 체크
function checkHpNo(objHpNo){
	if($(objHpNo).valExt() == ""){return;}
	
	//핸드폰 번호 형식 체크
	var strHpNo = tlno_onCheck($(objHpNo).valExt(),"");
	if(strHpNo == ""){
		TwbMsg("다시 입력해주세요!", "W", undefined, "전화번호 형식이 맞지 않습니다.");
		$(objHpNo).valExt("");
		objHpNo.focus();
		return;		
	}
	//정상 전화번호 입력일 경우 포맷을 변형해서 입력해준다.
	$(objHpNo).valExt(strHpNo);
}


