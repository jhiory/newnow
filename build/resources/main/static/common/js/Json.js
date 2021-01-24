var TWB_PARAM_TYPE = {
	 SQL_TYPE_NULL : "[!NULL!]"					//특정값을 NULL 처리할수 있는 타입
};

//json 데이터
function WebJson(obj)
{
	this.jsonData = null;

	if (typeof(obj) !== "undefined"){
		if(typeof(obj.jsonData) === "undefined"){
			this.jsonData = obj;
		}else{
			this.jsonData = obj.jsonData;
		}
	};

	this.createBaseGroup = function(){
		this.jsonData = {};
		this.jsonData.HEADER = {};
		this.jsonData.DATA = [{}];
	},

	this.setHeader = function(header){
		if(this.jsonData == null ){this.jsonData = {};}
		this.jsonData.HEADER = {};
		this.jsonData.HEADER = header;
	};

	this.setHeaderKey = function(key, value)
	{
		if(this.jsonData == null ){this.jsonData = {};}
		if(this.jsonData.HEADER == null){this.jsonData.HEADER = {};}

		this.jsonData.HEADER[key] = value;
	};

 	this.getHeaderKey = function(key)
	{
		if(typeof(this.jsonData) === "undefined"){
			if(key == "ERROR_FLAG"){
			return true;
			}
			if(key == "ERROR_MSG"){
				return "시스템에 오류가 발생하였습니다.";
			}
			return "";
		}else{
			if(typeof(this.jsonData.HEADER) === "undefined"){
				if(key == "ERROR_FLAG"){
					return true;
				}
				if(key == "ERROR_MSG"){
					return "시스템에 오류가 발생하였습니다.";
				}
				return "";
			}
		}
		return this.jsonData.HEADER[key];
	};

	this.setService = function(value){
		this.setHeaderKey("SERVICE",value);
	};

	this.getService = function(){
		return this.getHeaderKey("SERVICE");
	};

	this.setMethod = function(value){
		this.setHeaderKey("METHOD",value);
	};

	this.getMethod = function(){
		return this.getHeaderKey("METHOD");
	};

	this.setSqlName = function(value){
		this.setHeaderKey("SQL_NM",value);
	};

	this.getSqlName = function(){
		return this.getHeaderKey("SQL_NM");
	};

	this.setPoolName = function(value){
		this.setHeaderKey("POOL_NM",value);
	};

	this.getPoolName = function(){
		return this.getHeaderKey("POOL_NM");
	};

	this.setDBMSName = function(value){
		this.setHeaderKey("DBMS_NM",value);
	};

	this.getDBMSName = function(){
		return this.getHeaderKey("DBMS_NM");
	};

	this.setURL = function(value){
		this.setHeaderKey("URL",value);
	};

	this.getURL = function(){
		return this.getHeaderKey("URL");
	};

	this.setCallType = function(value){
		this.setHeaderKey("TYPE",value);
	};

	this.getCallType = function(){
		return this.getHeaderKey("TYPE");
	};

	this.setCallBack = function(value){
		this.setHeaderKey("CALL_BACK",value);
	};

	this.getCallBack = function(){
		return this.getHeaderKey("CALL_BACK");
	};

	this.setGridId = function(value){
		this.setHeaderKey("GRID_ID",value);
	};

	this.getGridId = function(){
		return this.getHeaderKey("GRID_ID");
	};

	this.setRowCnt = function(value){
		this.setHeaderKey("ROW_CNT",value);
	};

	this.getRowCnt = function(){
		return this.getHeaderKey("ROW_CNT");
	};

	this.setPages = function(value){
		this.setHeaderKey("PAGES_CNT",value);
	};

	this.getPages = function(){
		return this.getHeaderKey("PAGES_CNT");
	};

	this.getErrorFlag = function(){
		return this.getHeaderKey("ERROR_FLAG");
	};
	
	this.getErrorCode = function(){
		return this.getHeaderKey("ERROR_CODE");
	};

	this.getMsg = function(){
		var strIdentifyKey	= this.getHeaderKey("TELEWEB_IDENTIFIER");
		var strErrMsg		= this.getHeaderKey("ERROR_MSG");
		var blnError		= this.getHeaderKey("ERROR_FLAG");
		if(typeof(blnError) === "undefined" || blnError == null){blnError = false;}
		//오류 메시지는 오류코드 및 identifyKey를 표출하지 않음.
		// if(typeof(strIdentifyKey) !== "undefined" && strIdentifyKey != null && strIdentifyKey !== "" && blnError == true){
		// 	strErrMsg = "[ERROR-CODE:" + strIdentifyKey + "]<br />" + strErrMsg;
		// }
		return strErrMsg;
	};

	this.getCount = function(){
		return this.getHeaderKey("COUNT");
	};

	this.getTotCount = function(){
		return this.getHeaderKey("TOT_COUNT");
	};

	this.initData = function(index, group)
	{
		var strGrp = "DATA";
		if( typeof(group)!=="undefined" ){strGrp = group;}

		var strObj = 'this.jsonData[\"' + strGrp + '\"]';
		var strObj2 = 'this.jsonData[\"'+strGrp+ '\"] = [{}]';
		var strObj3 = 'this.jsonData[\"'+strGrp+ '\"][' + index + ']';
		var strObj4 = 'this.jsonData[\"'+strGrp+ '\"][' + index + '] = {}';

		if(this.jsonData == null ){this.jsonData = {};}
		if( typeof(eval(strObj))==="undefined" ){eval(strObj2);}
		if( typeof(eval(strObj3))==="undefined" ){eval(strObj4);}
	};

	this.setRowData = function(obj, index)
	{
		index = Number(index);
		this.initData(index);
		this.jsonData.DATA[index] = obj;
	};

	this.setAllData = function(obj)
	{
		if(this.jsonData == null ){this.jsonData = {};}
		if(this.jsonData.DATA == null){this.jsonData.DATA = [{}];}

		this.jsonData.DATA = obj;
	};

	this.setData = function(key, value, index, group)
	{
		if( index == undefined || index == null ){index = 0;}
		if(typeof(group) === "undefined" || group === ""){
			group = "DATA";
		}
		index = Number(index);
		this.initData(index);
		this.jsonData[group][index][key] = value;
	};

	this.getDataCount = function(group){
		if( this.jsonData==null ){return 0;}
		if(typeof(group) === "undefined"){group = "DATA";}
		var strData = 'this.jsonData[\"' + group + '\"]';
		if(eval(strData) === null || eval(strData) === undefined){return 0;}
		return eval(strData).length;
	};

	this.getData = function(key, index, group)
	{
		if(index == undefined){index = 0;}
		if(typeof(group) === "undefined"){group = "DATA";}
		var strData = 'this.jsonData[\"' + group + '\"][' + index + '][\"' + key + '\"]';

		return $.restoreXSS(eval(strData));
	};

	this.getIndexData = function(index)
	{
		return this.jsonData.DATA[index];
	};

	this.removeDataKey = function(key, index, group){
		if(index == undefined){index = 0;}
		if(typeof(group) === "undefined" || group === ""){
			group = "DATA";
		}
		delete this.jsonData[group][index][key];
	};

	this.setJsonObj = function(obj){
		this.jsonData = obj;
	};

	this.getJsonObj = function(){
		return this.jsonData;
	};

	this.setDataObj = function(index, obj){
		if(this.jsonData == null ){this.jsonData = {};}
		if(this.jsonData.DATA == null){this.jsonData.DATA = [{}];}

		this.jsonData.DATA[index] = obj;
	};

	this.setDataObject = function(group, dataObj){
		if(!group){return;}
		var dataObject = new WebJson();
		var groupName;
		if(typeof(group) == "object"){
			dataObject = group;
			groupName = "DATA";
		}else{
			dataObject = dataObj;
			groupName = group;
		}
		if(typeof(dataObject.length) === "undefined"){
			this.initData(0, groupName);
			this.createGroup(groupName)[0] = dataObject;
		}else{
			this.initData(0, groupName);
			for(var i = 0; i < dataObject.length; i++){
				this.createGroup(groupName)[i] = dataObject[i];
			}
		}
	};

	this.getDataObject = function(group, idx){
		if(!group){
			group = "DATA";
		}
		if( typeof(idx)!=="undefined" )
		{
			if( typeof(eval('this.jsonData[\"'+group+'\"]'))!=='undefined' ) {
				return eval('this.jsonData[\"'+group+'\"]['+idx+']');
			} else {
				return "";
			}
		}
		else
		{
			if( typeof(eval('this.jsonData[\"'+group+'\"]'))!=="undefined" ) {
				return eval('this.jsonData[\"'+group+'\"]');
			} else {
				return "";
			}
		}
	};

	this.createGroup = function(group)
	{
		var strGrp = "DATA";
		if( typeof(group)!=="undefined" )
		{
			strGrp = group;
		}
		return eval('this.jsonData[\"'+strGrp+'\"]');
	};
	this.setBlankToNull = function(group, idx){
		if(!group){
			group = "DATA";
		}
		if(!idx){
			idx = 0;
		}
		var jsonObj = this;
		var dataObj = jsonObj.getDataObject(group);
		if(dataObj == ""){return;}

		$.each(dataObj[idx], function(key, val){
			if(val == ""){
				jsonObj.setData(key, TWB_PARAM_TYPE.SQL_TYPE_NULL, idx, group);
			}
		});
	};
	this.setAsyncMode = function(value){
		this.setHeaderKey("ASYNC",value);
	};

	this.getAsyncMode = function(){
		return this.getHeaderKey("ASYNC");
	};
	
	this.isContainKey = function(strFindKey, group)
	{
		if(!group){group = "DATA";}
		var jsonObj = this;
		var dataObj = jsonObj.getDataObject(group);
		if(dataObj == ""){return;}
		var blnHasKey = false;
		if(group == "DATA")
		{
			$.each(dataObj[0], function(key, val){
				if(strFindKey === key){
					blnHasKey = true;
					return true;
				}
			});
		}
		else if(group == "HEADER")
		{
			$.each(dataObj, function(key, val){
				if(strFindKey === key){
					blnHasKey = true;
					return true;
				}
			});
		}
		return blnHasKey;
	};
	
	this.replaceXSSText = function(group, blnDecode){
		if(typeof(group) === "undefined"){group = "DATA";}
		if(typeof(blnDecode) === "undefined"){blnDecode = true;}
		var jsonObj	= this;
		var objHeader	= jsonObj.jsonData.HEADER;
		var objData		= jsonObj.getDataObject(group);
		if(objData == ""){return;}
		
		$.each(objHeader, function(key, val){
			if(typeof(val) === "string" && val !== ""){
				jsonObj.setHeaderKey(key, (blnDecode ? $.restoreXSS(val) : $.restoreXSS_Dec(val)) );
			}
		});
		for(var i = 0; i < objData.length; i++){
			$.each(objData[i], function(key, val){
				if(typeof(val) === "string" && val !== ""){
					jsonObj.setData(key, (blnDecode ? $.restoreXSS(val) : $.restoreXSS_Dec(val)), i, group);
				}
			});
		}
	};
	
	this.replaceXSSTextForRequest = function(){
		var objJsonData = this.jsonData;
		if(typeof(objJsonData) === "undefined"){return;}
		var jsonObj	= this;
		$.each(objJsonData, function(key, val){
			if(key !== "HEADER"){
				for(var i = 0; i < objJsonData[key].length; i++){
					$.each(objJsonData[key][i], function(strKey, strVal){
						if(typeof(strVal) === "string" && strVal !== ""){
							jsonObj.setData(strKey, $.restoreXSS_Dec(strVal), i, key);
						}
					});
				}
			}
		});
	};
}
