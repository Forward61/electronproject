import {BrowserWindow} from "electron";
<template>
  <div>
    <el-button type="primary" disabled><router-link id ="Pos001" to="/">Pos应缴资金查询</router-link></el-button>
    <el-button type="primary" disabled><router-link id ="Pos003" to="/Pos003">Pos冲正确认</router-link></el-button>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

      <el-form-item label="交易名称" prop="name">
        <el-form-item  >Pos冲正确认</el-form-item>

      </el-form-item>
      <el-form-item label="原交易流水号" prop="channelSeq" >
        <el-input type="textarea" autosize v-model="ruleForm.channelSeq"></el-input>
      </el-form-item>
      <el-form-item label="原交易日期" prop="channelDate" >
        <el-input type="textarea" autosize v-model="ruleForm.channelDate"></el-input>
      </el-form-item>
        <el-form-item label="终端号" prop="systemNo" >
            <el-input type="textarea" autosize v-model="ruleForm.systemNo"></el-input>
        </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="scope.row.loading" @click="submitForm('ruleForm')">查询</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>

      </el-form-item>

      <el-form-item label="服务器返回" prop="resText" class="bg-success" >
        <el-input  v-model="ruleForm.resText" :disabled=true></el-input>
      </el-form-item>

      <el-row>
        <el-col :span="8">
          <el-form-item label="ip" prop="ip">
            <el-select v-model="ruleForm.ip" placeholder="请选择">
              <el-option
                  v-for="item in ruleForm.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>

          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="端口" prop="port">
            <el-input  v-model="ruleForm.port"></el-input>
          </el-form-item>
        </el-col>

      </el-row>
      <el-form-item label="发送的报文" prop="fsbw">
        <el-input  v-model="ruleForm.fsbw"></el-input>
      </el-form-item>
      <el-form-item label="响应报文" prop="resXmlText" class="" >
        <el-input type="textarea" autosize
                  v-model="ruleForm.resXmlText" ></el-input>
      </el-form-item>

    </el-form>
  </div>
</template>
<script>
function showXml(str){
  var text = str

  //去掉多余的空格
  text = '\n' + text.replace(/(<\w+)(\s.*?>)/g,function($0, name, props)
  {
    return name + ' ' + props.replace(/\s+(\w+=)/g," $1");
  }).replace(/>\s*?</g,">\n<");

  //把注释编码
  text = text.replace(/\n/g,'\r').replace(/<!--(.+?)-->/g,function($0, text)
  {
    var ret = '<!--' + escape(text) + '-->';
    return ret;
  }).replace(/\r/g,'\n');

  //调整格式
  var rgx = /\n(<(([^\?]).+?)(?:\s|\s*?>|\s*?(\/)>)(?:.*?(?:(?:(\/)>)|(?:<(\/)\2>)))?)/mg;
  var nodeStack = [];
  var output = text.replace(rgx,function($0,all,name,isBegin,isCloseFull1,isCloseFull2 ,isFull1,isFull2){
    var isClosed = (isCloseFull1 == '/') || (isCloseFull2 == '/' ) || (isFull1 == '/') || (isFull2 == '/');
    var prefix = '';
    if(isBegin == '!')
    {
      prefix = getPrefix(nodeStack.length);
    }
    else
    {
      if(isBegin != '/')
      {
        prefix = getPrefix(nodeStack.length);
        if(!isClosed)
        {
          nodeStack.push(name);
        }
      }
      else
      {
        nodeStack.pop();
        prefix = getPrefix(nodeStack.length);
      }

    }
    var ret =  '\n' + prefix + all;
    return ret;
  });

  var prefixSpace = -1;
  var outputText = output.substring(1);

  //把注释还原并解码，调格式
  outputText = outputText.replace(/\n/g,'\r').replace(/(\s*)<!--(.+?)-->/g,function($0, prefix,  text)
  {
    if(prefix.charAt(0) == '\r')
      prefix = prefix.substring(1);
    text = unescape(text).replace(/\r/g,'\n');
    var ret = '\n' + prefix + '<!--' + text.replace(/^\s*/mg, prefix ) + '-->';
    return ret;
  });
  //alert(outputText);

  outputText=	outputText.replace(/\s+$/g,'').replace(/\r/g,'\r\n');


  return outputText


}

function getPrefix(prefixIndex)
{
  var span = '    ';
  var output = [];
  for(var i = 0 ; i < prefixIndex; ++i)
  {
    output.push(span);
  }

  return output.join('');
}


function getLength(str) {
  // UTF-8格式占3个，gbk，占用2个
  ///<summary>获得字符串实际长度，中文3，英文1</summary>
  ///<param name="str">要获得长度的字符串</param>
  var str=str+'';
  var realLength = 0;
  var len = str.length;
  var charCode = -1;
  for (var i = 0; i < len; i++) {
    charCode = str.charCodeAt(i);
    if (charCode >= 0 && charCode <= 128)
      realLength += 1;
    else
      realLength += 3;
  }
  return realLength;
};
function getRealLengthReqString(str,length) {
  if (str.length > length||getLength(str)>length){
    alert(str +"的值超长了！");
  }else
  {
    var strlenth= getLength(str);

    var addLenth = length - strlenth;
    //左填充 0
    var addStr = ''.padEnd(addLenth, '0')
    return addStr + str ;
  }

}
function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000
  })

  mainWindow.loadURL("index.html")
  // mainWindow.webContents.openDevTools()
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}
//右填充空格
function rightPad(str,length) {
  var templenth= getLength(str);
  var addLenth = length = templenth;
  if(templenth <length){
    console.log("需要加的长度" + addLenth);
    return str+ new Array(length-templenth).join(' ',  '')+'' ;
  }else
  {
    return str
  }

}

//生成从minNum到maxNum的随机数
function randomNum(minNum,maxNum){
  switch(arguments.length){
    case 1:
      return parseInt(Math.random()*minNum+1,10);
      break;
    case 2:
      return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
      break;
    default:
      return 0;
      break;
  }
}
function formatDate(time, format = 'YYYY/MM/DD hh:mm:ss') {
  var date = new Date(time);
  var year = date.getFullYear(),
      month = date.getMonth() + 1,
      //月份是从0开始的
      day = date.getDate(), hour = date.getHours(), min = date.getMinutes(), sec = date.getSeconds();
  var preArr = Array.apply(null,Array(10)).map(function(elem, index) { return '0'+index; });////开个长度为10的数组 格式为 00 01 02 03
  var newTime = format.replace(/YYYY/g,year) .replace(/MM/g,preArr[month]||month) .replace(/DD/g,preArr[day]||day) .replace(/hh/g,preArr[hour]||hour) .replace(/mm/g,preArr[min]||min) .replace(/ss/g,preArr[sec]||sec);
  return newTime;
}


function Uint8ArrayToString(fileData) {
  var dataString = "";
  for (var i = 0; i < fileData.length; i++) {
    dataString += String.fromCharCode(fileData[i]);
  }

  return dataString

}
function Utf8ArrayToStr(array) {
  var out, i, len, c;
  var char2, char3;

  out = "";
  len = array.length;
  i = 0;
  while(i < len) {
    c = array[i++];
    switch(c >> 4)
    {
      case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
// 0xxxxxxx
      out += String.fromCharCode(c);
      break;
      case 12: case 13:
// 110x xxxx 10xx xxxx
      char2 = array[i++];
      out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
      break;
      case 14:
// 1110 xxxx 10xx xxxx 10xx xxxx
        char2 = array[i++];
        char3 = array[i++];
        out += String.fromCharCode(((c & 0x0F) << 12) |
            ((char2 & 0x3F) << 6) |
            ((char3 & 0x3F) << 0));
        break;
    }
  }

  return out;
}
/**
 * xml字符串转换xml对象数据
 * @param {Object} xmlStr
 */
function xmlStr2XmlObj(xmlStr) {
  var xmlObj = {};
  if (document.all) {
    var xmlDom = new ActiveXObject("Microsoft.XMLDOM");
    xmlDom.loadXML(xmlStr);
    xmlObj = xmlDom;
  } else {
    xmlObj = new DOMParser().parseFromString(xmlStr, "text/xml");
  }
  return xmlObj;
}

/**
 * xml直接转换json数据
 * @param {Object} xml
 */
function xmlObj2json(xml) {
  try {
    var obj = {};
    if (xml.children.length > 0) {
      for (var i = 0; i < xml.children.length; i++) {
        var item = xml.children.item(i);
        var nodeName = item.nodeName;
        if (typeof(obj[nodeName]) == "undefined") {
          obj[nodeName] = xmlObj2json(item);
        } else {
          if (typeof(obj[nodeName].push) == "undefined") {
            var old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          obj[nodeName].push(xmlObj2json(item));
        }
      }
    } else {
      obj = xml.textContent;
    }
    return obj;
  } catch (e) {
    console.log(e.message);
  }
}
function getDateString(){
  var date = new Date();

  var year = date.getFullYear();        //年 ,从 Date 对象以四位数字返回年份
  var month = date.getMonth() + 1;      //月 ,从 Date 对象返回月份 (0 ~ 11) ,date.getMonth()比实际月份少 1 个月
  var day = date.getDate();             //日 ,从 Date 对象返回一个月中的某一天 (1 ~ 31)

  var hours = date.getHours();          //小时 ,返回 Date 对象的小时 (0 ~ 23)
  var minutes = date.getMinutes();      //分钟 ,返回 Date 对象的分钟 (0 ~ 59)
  var seconds = date.getSeconds();      //秒 ,返回 Date 对象的秒数 (0 ~ 59)

  //获取当前系统时间
  var currentDate = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
  // alert(currentDate);


  //修改月份格式
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }

  //修改日期格式
  if (day >= 0 && day <= 9) {
    day = "0" + day;
  }

  //修改小时格式
  if (hours >= 0 && hours <= 9) {
    hours = "0" + hours;
  }

  //修改分钟格式
  if (minutes >= 0 && minutes <= 9) {
    minutes = "0" + minutes;
  }

  //修改秒格式
  if (seconds >= 0 && seconds <= 9) {
    seconds = "0" + seconds;
  }

  //获取当前系统时间  格式(yyyy-mm-dd hh:mm:ss)
  var currentFormatDate = year + "" + month + "" + day + "" + hours + "" + minutes + "" + seconds;
  console.log(currentFormatDate)
  return currentFormatDate;
}
/**
 * xml字符串转换json数据
 * @param {Object} xml
 */
function xmlStr2json(xml) {
  var xmlObj = xmlStr2XmlObj(xml);
  var jsonObj = {};
  if (xmlObj.childNodes.length > 0) {
    jsonObj = xmlObj2json(xmlObj);
  }
  return jsonObj;
}

export default {
  data() {
    return {
      scope: {
        row:{
          loading: false
        }
      },
      size: '',
      str: '',
      ruleForm: {

        name: '',
        nameLength: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',

        areaCode: '',
        payCode: '',
        channelSeq: '',
        channelDate: '',
        systemNo: '',
        ownerName: '',
        ownerCardNo: '',
        houseAddress: '',
        payMoney: '',
        monAccountNo: '',
        monAccountName: '',
        remark: '',
        jsonString: '',
        reqText: '',
        resText: '',
        lsh:'',

        ip: '127.0.0.1',
        port: '16111',
        fsbw: '',
        resXmlText: '',
        reqXmlText: '',
        options: [{
          value: '172.31.207.14',
          label: '开发环境-172.31.207.14'
        }, {
          value: '172.31.207.15',
          label: 'SIT环境-207.15'
        }, {
          value: '172.31.207.16',
          label: 'UAT环境-207.16'
        }, {
          value: '172.31.207.17',
          label: 'ZSC环境-207.17'
        },
          {
            value: '127.0.0.1',
            label: '本地-127.0.0.1'

          }]
      },
      rules: {
        channelSeq: [
          { required: true, message: '请输入原交易流水号', trigger: 'blur' }

        ],
        channelDate: [
          { required: true, message: '请输入原交易日期', trigger: 'change' }
        ],
        systemNo: [
          { required: true, message: '请输入终端号', trigger: 'blur' }

        ]

      }
    };
  },
  methods: {
    to(){
      var _this = this;
      if(_this.ruleForm.jsonString===''){
            alert('先查询')
      }else{

      }
      console.log('to method')
      this.$router.push({
        name: 'Pos002',
        params: {
          jsonString: _this.ruleForm.jsonString
        }
      })
    },
    submitForm(formName) {
      var _this = this;
      var encoding = require('encoding');
      this.$refs[formName].validate((valid) => {
        if (valid) {
          _this.resetResForm()
          //加载loading 图层
          _this.scope.row.loading =true;
          //验证表单后把返回结果清空，避免超时或者其他返回内容未清空造成使用者误解。
          _this.ruleForm.resText = '';
          _this.ruleForm.resXmlText = '';
          _this.ruleForm.reqXmlText = showXml(_this.ruleForm.reqText);
          var reqtxt2utf8 = encoding.convert(_this.ruleForm.reqText, "utf-8");
          var realReqTextLengths =getLength(_this.ruleForm.reqText);
          console.log("realReqTextLengths" +realReqTextLengths);
          var realReqUtf8TextLengths = getLength(reqtxt2utf8);
          console.log("realReqUtf8TextLengths" +realReqUtf8TextLengths);

          var reqHead = getRealLengthReqString(realReqTextLengths, 8);
          console.log("reqHeade的值：" + reqHead);



          var reqString = reqHead + reqtxt2utf8;
          console.log("请求字符串" )
          console.log(reqString);
          // Node.js中的http请求客户端示例(request client)
//https://www.jb51.net/article/112937.htm
          var request = require('request');
          var url ='http://'+_this.ruleForm.ip+':16111/ysjg';
          var reqJson ={}
          reqJson = JSON.parse('{"Message": {"Message_Header": {"externalReferenceNo": "1", "toServiceCode": "PYPOS0001"}, "Message_Body": {"request": {"channelSeq": "05", "channelDate": "0","systemNo": "0", "realFeeBank": "0", "realFeeCard": "0", "feeType": "0", "tradeTime": "0", "clientNo": "0", "systemNo": "0", "channelSeq": "0" } } } }')


          reqJson.Message.Message_Header.externalReferenceNo=getDateString()+randomNum(10000,99999)
          reqJson.Message.Message_Body.request.channelSeq=_this.ruleForm.channelSeq
          reqJson.Message.Message_Body.request.channelDate=_this.ruleForm.channelDate
          reqJson.Message.Message_Body.request.systemNo=_this.ruleForm.systemNo



            console.log('req ' +reqJson)
          var bodyChar=_this.$x2js.js2xml(reqJson)
          console.log('bodyChar ' +bodyChar)
          _this.ruleForm.fsbw = bodyChar;

          request({
            url: url,
            method: "POST",
            headers: {
              "content-type": "application/xml",
            },
            body: bodyChar,

          }, function(error, response, body) {
            if (!error && response.statusCode == 200) {
              _this.ruleForm.resXmlText =showXml(body);

              console.log(' ' + body) // 请求成功的处理逻辑
              var jsonObj=xmlObj2json(xmlStr2XmlObj(_this.ruleForm.resXmlText))
              _this.ruleForm.jsonString = jsonObj;
              console.log('json' + jsonObj)
              console.log('json ownerName    de ' + jsonObj.Message.Message_Body.response.ownerName)
              var returnCode = jsonObj.Message.Message_Body.response.returnCode
              var returnMsg = jsonObj.Message.Message_Body.response.returnMsg

              if(returnCode==='0000'){
                  _this.$alert('响应码' +returnCode+'\n响应信息:'+returnMsg+'\n响应流水:'+reqJson.Message.Message_Header.externalReferenceNo, '冲正成功\n', {
                      confirmButtonText: '确定'

                  })
                // _this.ruleForm.ownerName=jsonObj.Message.Message_Body.response.ownerName
                // _this.ruleForm.ownerCardNo=jsonObj.Message.Message_Body.response.ownerCardNo
                // _this.ruleForm.houseAddress=jsonObj.Message.Message_Body.response.houseAddress
                // _this.ruleForm.payMoney=jsonObj.Message.Message_Body.response.payMoney
                // _this.ruleForm.monAccountNo=jsonObj.Message.Message_Body.response.monAccountNo
                // _this.ruleForm.monAccountName=jsonObj.Message.Message_Body.response.monAccountName
                // _this.ruleForm.remark=jsonObj.Message.Message_Body.response.remark
              }else{
                  _this.$alert('响应码' +returnCode+'\n响应信息:'+returnMsg+'\n响应流水:'+reqJson.Message.Message_Header.externalReferenceNo, '冲正异常', {
                      confirmButtonText: '确定'

                  })
                // _this.$alert('响应码' +returnCode+'\n响应流水:'+reqJson.Message.Message_Header.externalReferenceNo, '响应信息'+returnMsg, {
                //   confirmButtonText: '确定'
                //
                // })
              }

            } else (
                    console.log('else' +body),

            _this.$alert('系统异常', '系统异常', {
                      confirmButtonText: '确定',
                      callback: action => {
                        _this.$message({
                          type: 'info',
                          message: `action: ${ action }`
                        });
                      }
                    })
            )
            // var reqjsonObj=xmlObj2json(xmlStr2XmlObj(bodyChar))
            // console.log('req request ' + reqjsonObj.Message.Message_Body.request)
            _this.scope.row.loading =false;
                _this.ruleForm.resText = body;





          });

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      var _this = this;
      _this.ruleForm.ownerName=''
      _this.ruleForm.ownerCardNo=''
      _this.ruleForm.houseAddress=''
      _this.ruleForm.payMoney=''
      _this.ruleForm.monAccountNo=''
      _this.ruleForm.monAccountName=''
      _this.ruleForm.remark=''

    },
    resetResForm(){
      var _this = this;
      _this.ruleForm.ownerName=''
      _this.ruleForm.ownerCardNo=''
      _this.ruleForm.houseAddress=''
      _this.ruleForm.payMoney=''
      _this.ruleForm.monAccountNo=''
      _this.ruleForm.monAccountName=''
      _this.ruleForm.remark=''
    }
  }
}
</script>
<style>
.bg-success {
  background: #67C23A;
}
</style>