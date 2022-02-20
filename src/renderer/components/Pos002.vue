import {BrowserWindow} from "electron";
<template>
  <div>
    <el-button type="primary" disabled><router-link id ="Pos001" to="/">Pos应缴资金查询</router-link></el-button>
    <el-button type="primary" disabled><router-link id ="Pos003" to="/Pos003">Pos冲正确认</router-link></el-button>

    <el-form style=""  label-width="80px">
      <el-form-item label="交易名称" prop="name">
        <el-form-item  >Pos缴存确认</el-form-item>

      </el-form-item>
      <el-row>

        <el-col :span="6">
          <el-form-item label="ip" prop="ip">
            <el-select v-model="ruleForm.ip" placeholder="请选择" @change="changeIp()">
              <el-option
                      v-for="item in ruleForm.options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
              </el-option>
            </el-select>

          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="端口" prop="port">
            <el-input @blur="changePort()"  v-model="ruleForm.port"></el-input>
          </el-form-item>
        </el-col>

      </el-row>

    </el-form>


<!--    <el-form style="height:10px;margin:30px">-->
<!--      <el-form-item label="交易名称" prop="name">-->
<!--        <el-form-item  >Pos缴存确认</el-form-item>-->
<!--        <br/>-->
<!--      </el-form-item>-->
<!--    </el-form>-->
    <el-form  :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">

      <el-form-item label="渠道交易日期" prop="transactionDate" >
        <el-input type="textarea" autosize v-model="ruleForm.transactionDate"></el-input>
      </el-form-item>
      <el-form-item label="实际缴款人名称" prop="realFeeName" >
        <el-input type="text" autosize v-model="ruleForm.realFeeName"  size="medium" class="el-input002"></el-input>
      </el-form-item>
      <el-form-item label="实际缴款人开户行" prop="realFeeBank" >
        <el-input type="textarea" autosize v-model="ruleForm.realFeeBank"></el-input>
      </el-form-item>
      <el-form-item label="实际缴款人账号" prop="realFeeCard" >
        <el-input type="textarea" autosize v-model="ruleForm.realFeeCard"></el-input>
      </el-form-item>
      <el-form-item label="缴款方式" prop="feeType" >
        <el-input type="textarea" autosize v-model="ruleForm.feeType"></el-input>
      </el-form-item>
      <el-form-item label="交易请求时间" prop="tradeTime" >
        <el-input type="textarea" autosize v-model="ruleForm.tradeTime"></el-input>
      </el-form-item>
      <el-form-item label="商户号" prop="clientNo" >
        <el-input type="textarea" autosize v-model="ruleForm.clientNo"></el-input>
      </el-form-item>
      <el-form-item label="终端号" prop="systemNo" >
        <el-input type="textarea" autosize v-model="ruleForm.systemNo"></el-input>
      </el-form-item>
      <el-form-item label="渠道流水号" prop="channelSeq" >
        <el-input type="textarea" autosize v-model="ruleForm.channelSeq"></el-input>
      </el-form-item>
      <el-form-item style="margin-left:50px">
        <el-button type="primary" :loading="scope.row.loading" @click="submitForm('ruleForm')">缴费</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
<!--        <el-button type="primary" :loading="scope.row.loading" @click="to()">缴费</el-button>-->

      </el-form-item>

      <el-descriptions class="margin-top" title="房屋信息" :column="3" :size="size" border>
        <template slot="extra">
          <!--          <el-button type="primary" size="small">操作</el-button>-->
        </template>
        <el-descriptions-item>
          <template slot="label" v-highlight="ruleForm.resXmlText">
            <i class="el-icon-user"></i>
            地区编码
          </template>

          <span>{{ ruleForm.areaCode}}</span>

        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            缴款编号
          </template>
          <!--          <el-input  v-model="ruleForm.ownerName"  ></el-input>-->
          <span>{{ ruleForm.payCode}}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label" v-highlight="ruleForm.resXmlText">
            <i class="el-icon-user"></i>
            业主姓名
          </template>

          <span>{{ ruleForm.ownerName}}</span>

        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            业主证件号码
          </template>
          <!--          <el-input  v-model="ruleForm.ownerName"  ></el-input>-->
          <span>{{ ruleForm.ownerCardNo}}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            房屋地址
          </template>
          <span>{{ ruleForm.houseAddress}}</span>

        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            业主证件号码
          </template>
          <!--          <el-input  v-model="ruleForm.ownerName"  ></el-input>-->
          <span>{{ ruleForm.ownerCardNo}}</span>
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            计划缴款金额
          </template>
          <!--          <el-input  v-model="ruleForm.ownerName"  ></el-input>-->
          <span>{{ ruleForm.payMoney}}</span>
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            监管账户账号
          </template>
          <!--          <el-input  v-model="ruleForm.ownerName"  ></el-input>-->
          <span>{{ ruleForm.monAccountNo}}</span>
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-tickets"></i>
            备注
          </template>
          <span>{{ ruleForm.remark}}</span>

          <!--          <el-tag size="small">学校</el-tag>-->
        </el-descriptions-item>

      </el-descriptions>
    </el-form>


    <el-form style="margin-top:20px">
      <!--      <el-form-item label="返回不含头" prop="resXmlText" class="" >-->
      <!--        <pre v-highlight="ruleForm.resXmlText"><code class="xml"></code></pre>-->
      <!--      </el-form-item>-->
      <el-form-item label="服务器返回" prop="resText" class="bg-success" >
        <el-input  v-model="ruleForm.resText" :disabled=true></el-input>
      </el-form-item>

      <el-row>
        <el-col :span="6">
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

          ip: '172.31.207.15',
          port: '16111',
          fsbw: '',
          resXmlText: '',
          reqXmlText: '',
          realFeeName:'',
          realFeeBank:'',
          realFeeCard:'',
          feeType:'',
          tradeTime:'',
          clientNo:'',
          systemNo:'',
          channelSeq:'',
          transactionDate: '',
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

            },
            {
              value: '118.24.52.46',
              label: '自己测试用'

            }]
        },
        rules: {
          transactionDate: [
            { required: true, message: '请输入渠道交易日期', trigger: 'blur' }

          ],
          realFeeName: [
            { required: false, message: '实际缴款人不能为空', trigger: 'blur' }

          ],
          realFeeBank: [
            { required: false, message: '请输入实际缴款人开户行', trigger: 'change' }
          ],
          realFeeCard: [
            { required: false, message: '请输入实际缴款人账号', trigger: 'blur' }

          ],
          feeType: [
            { required: true, message: '请输入缴款方式', trigger: 'change' }
          ],
          tradeTime: [
            { required: true, message: '请输入交易请求时间', trigger: 'blur' }
          ],
          clientNo: [
            { required: true, message: '请输入商户号', trigger: 'change' }
          ],
          systemNo: [
            { required: true, message: '请输入终端号', trigger: 'blur' }
          ],
          channelSeq: [
            { required: true, message: '请输入渠道流水号', trigger: 'change' }
          ]

        }
      };
    },
    props:['jsonString'],
    mounted(){
      console.log(this.$route.params.jsonString, this.jsonString)
      console.log(this.jsonString.Message.Message_Body.response.ownerName)
      var _this = this;
      if(this.GLOBAL.ipoptions.ip===''||this.GLOBAL.ipoptions.ip===undefined){
        console.log('我是空')
      }else{
        console.log('我是值 '+ this.GLOBAL.ipoptions.ip + this.GLOBAL.ipoptions.port)
        _this.ruleForm.ip = this.GLOBAL.ipoptions.ip
        _this.ruleForm.port = this.GLOBAL.ipoptions.port
      }
      // _this.ruleForm.ip = this.GLOBAL.ipoptions.ip
      // _this.ruleForm.port = this.GLOBAL.ipoptions.port

      console.log('_this.ruleForm.ip '+ _this.ruleForm.ip)

      console.log('xml2json  ' + _this.$x2js.js2xml(this.jsonString))
      var jsonObj = this.jsonString
      console.log('ip   :' + jsonObj.ip)

      _this.ruleForm.areaCode=jsonObj.Message.Message_Body.response.areaCode
      _this.ruleForm.payCode=jsonObj.Message.Message_Body.response.payCode

      _this.ruleForm.ownerName=jsonObj.Message.Message_Body.response.ownerName
      _this.ruleForm.ownerCardNo=jsonObj.Message.Message_Body.response.ownerCardNo
      _this.ruleForm.houseAddress=jsonObj.Message.Message_Body.response.houseAddress
      _this.ruleForm.payMoney=jsonObj.Message.Message_Body.response.payMoney
      _this.ruleForm.monAccountNo=jsonObj.Message.Message_Body.response.monAccountNo
      _this.ruleForm.monAccountName=jsonObj.Message.Message_Body.response.monAccountName
      _this.ruleForm.remark=jsonObj.Message.Message_Body.response.remark
    },
    methods: {
      to(){
        var _this = this;
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
            // var url ='http://127.0.0.1:16111/ysjg';
            var url ='http://'+_this.ruleForm.ip+':16111/ysjg';

            var reqJson ={}
            // reqJson = JSON.parse('{"Message": {"Message_Header": {"externalReferenceNo": "1", "toServiceCode": "PYPOS0001"}, "Message_Body": {"request": {"areaCode": "05", "payCode": "0"} } } }')
            reqJson = JSON.parse('{"Message": {"Message_Header": {"externalReferenceNo": "1", "toServiceCode": "PYPOS0003","transactionDate": "0"}, "Message_Body": {"request": {"areaCode": "05", "payCode": "0","realFeeName": "0", "realFeeBank": "0", "realFeeCard": "0", "feeType": "0", "tradeTime": "0", "clientNo": "0", "systemNo": "0", "channelSeq": "0" } } } }')

            reqJson.Message.Message_Header.transactionDate=_this.ruleForm.transactionDate
            reqJson.Message.Message_Header.externalReferenceNo=getDateString()+randomNum(10000,99999)
            reqJson.Message.Message_Body.request.areaCode=_this.ruleForm.areaCode
            reqJson.Message.Message_Body.request.payCode=_this.ruleForm.payCode
            reqJson.Message.Message_Body.request.realFeeName=_this.ruleForm.realFeeName
            reqJson.Message.Message_Body.request.realFeeBank=_this.ruleForm.realFeeBank
            reqJson.Message.Message_Body.request.realFeeCard=_this.ruleForm.realFeeCard
            reqJson.Message.Message_Body.request.feeType=_this.ruleForm.feeType
            reqJson.Message.Message_Body.request.tradeTime=_this.ruleForm.tradeTime
            reqJson.Message.Message_Body.request.clientNo=_this.ruleForm.clientNo
            reqJson.Message.Message_Body.request.systemNo=_this.ruleForm.systemNo
            reqJson.Message.Message_Body.request.channelSeq=_this.ruleForm.channelSeq

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
                  _this.$alert('响应码' +returnCode+'\n响应信息'+returnMsg+'\n响应流水:'+reqJson.Message.Message_Header.externalReferenceNo, '缴费成功\n', {
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
                  _this.$alert('响应码' +returnCode+'\n响应信息'+returnMsg+'\n响应流水:'+reqJson.Message.Message_Header.externalReferenceNo, '缴费异常', {
                    confirmButtonText: '确定'

                  })
                }

              } else (
                      console.log('else' +body),

                              _this.$alert('系统异常', '系统异常', {
                                confirmButtonText: '确定',
                                callback: action => {
                                  // _this.$message({
                                  //   type: 'info',
                                  //   message: `action: ${ action }`
                                  // });
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


      },
      resetResForm(){
        var _this = this;
        _this.ruleForm.realFeeName=''
        _this.ruleForm.realFeeBank=''
        _this.ruleForm.realFeeCard=''
        _this.ruleForm.feeType=''
        _this.ruleForm.tradeTime=''
        _this.ruleForm.clientNo=''
        _this.ruleForm.systemNo=''
        _this.ruleForm.channelSeq=''

      },
      changeIp(){

        var _this = this;
        this.GLOBAL.ipoptions.ip = _this.ruleForm.ip
        this.GLOBAL.ipoptions.port = _this.ruleForm.port
        console.log('gb ip ' +  this.GLOBAL.ipoptions.ip)
        console.log('gb port ' + this.GLOBAL.ipoptions.port)
      },
      changePort(){
        var _this = this;
        this.GLOBAL.ipoptions.ip = _this.ruleForm.ip
        this.GLOBAL.ipoptions.port = _this.ruleForm.port
        console.log('gb ip ' +  this.GLOBAL.ipoptions.ip)
        console.log('gb port ' + this.GLOBAL.ipoptions.port)
      }
    }
  }
</script>
<style>
  .bg-success {
    background: #67C23A;
  }
  .el-input002 {
    width: 20%
  }
  .el-textarea{
    width: 30%
  }
  .el-textarea{
    position:relative;display:inline-block;width:50%;vertical-align:bottom;font-size:14px
  }

  .el-textarea__inner{display:block;resize:vertical;padding:5px 15px;line-height:1.5;-webkit-box-sizing:border-box;box-sizing:border-box;width:100%;font-size:inherit;color:#606266;background-color:#FFF;background-image:none;border:1px solid #DCDFE6;border-radius:4px;-webkit-transition:border-color .2s cubic-bezier(.645,.045,.355,1);transition:border-color .2s cubic-bezier(.645,.045,.355,1)}
  .el-textarea__inner::-webkit-input-placeholder{color:#C0C4CC}
  .el-textarea__inner:-ms-input-placeholder{color:#C0C4CC}.el-textarea__inner::-ms-input-placeholder{color:#C0C4CC}
  .el-textarea__inner::placeholder{color:#C0C4CC}
  .el-textarea__inner:hover{border-color:#C0C4CC}
  .el-textarea__inner:focus{outline:0;border-color:#409EFF}
  .el-textarea .el-input__count{color:#909399;background:#FFF;position:absolute;font-size:12px;bottom:5px;right:10px}.el-textarea.is-disabled .el-textarea__inner{background-color:#F5F7FA;border-color:#E4E7ED;color:#C0C4CC;cursor:not-allowed}.el-textarea.is-disabled .el-textarea__inner::-webkit-input-placeholder{color:#C0C4CC}.el-textarea.is-disabled .el-textarea__inner:-ms-input-placeholder{color:#C0C4CC}.el-textarea.is-disabled .el-textarea__inner::-ms-input-placeholder{color:#C0C4CC}.el-textarea.is-disabled .el-textarea__inner::placeholder{color:#C0C4CC}.el-textarea.is-exceed .el-textarea__inner{border-color:#F56C6C}.el-textarea.is-exceed .el-input__count{color:#F56C6C}.el-input{position:relative;font-size:14px;display:inline-block;width:100%}.el-input::-webkit-scrollbar{z-index:11;width:6px}.el-input::-webkit-scrollbar:horizontal{height:6px}.el-input::-webkit-scrollbar-thumb{border-radius:5px;width:6px;background:#b4bccc}.el-input::-webkit-scrollbar-corner{background:#fff}.el-input::-webkit-scrollbar-track{background:#fff}.el-input::-webkit-scrollbar-track-piece{background:#fff;width:6px}.el-input .el-input__clear{color:#C0C4CC;font-size:14px;cursor:pointer;-webkit-transition:color .2s cubic-bezier(.645,.045,.355,1);transition:color .2s cubic-bezier(.645,.045,.355,1)}.el-input .el-input__clear:hover{color:#909399}.el-input .el-input__count{height:100%;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;color:#909399;font-size:12px}.el-input .el-input__count .el-input__count-inner{background:#FFF;line-height:initial;display:inline-block;padding:0 5px}.el-input__inner{-webkit-appearance:none;background-color:#FFF;background-image:none;border-radius:4px;border:1px solid #DCDFE6;-webkit-box-sizing:border-box;box-sizing:border-box;color:#606266;display:inline-block;font-size:inherit;height:40px;line-height:40px;outline:0;padding:0 15px;-webkit-transition:border-color .2s cubic-bezier(.645,.045,.355,1);transition:border-color .2s cubic-bezier(.645,.045,.355,1);width:100%}.el-input__prefix,.el-input__suffix{position:absolute;top:0;-webkit-transition:all .3s;height:100%;color:#C0C4CC;text-align:center}.el-input__inner::-ms-reveal{display:none}.el-input__inner::-webkit-input-placeholder{color:#C0C4CC}.el-input__inner:-ms-input-placeholder{color:#C0C4CC}.el-input__inner::-ms-input-placeholder{color:#C0C4CC}.el-input__inner::placeholder{color:#C0C4CC}.el-input__inner:hover{border-color:#C0C4CC}.el-input.is-active .el-input__inner,.el-input__inner:focus{border-color:#409EFF;outline:0}.el-input__suffix{right:5px;transition:all .3s;pointer-events:none}.el-input__suffix-inner{pointer-events:all}.el-input__prefix{left:5px;transition:all .3s}.el-input__icon{height:100%;width:25px;text-align:center;-webkit-transition:all .3s;transition:all .3s;line-height:40px}.el-input__icon:after{content:'';height:100%;width:0;display:inline-block;vertical-align:middle}.el-input__validateIcon{pointer-events:none}.el-input.is-disabled .el-input__inner{background-color:#F5F7FA;border-color:#E4E7ED;color:#C0C4CC;cursor:not-allowed}.el-input.is-disabled .el-input__inner::-webkit-input-placeholder{color:#C0C4CC}.el-input.is-disabled .el-input__inner:-ms-input-placeholder{color:#C0C4CC}.el-input.is-disabled .el-input__inner::-ms-input-placeholder{color:#C0C4CC}.el-input.is-disabled .el-input__inner::placeholder{color:#C0C4CC}.el-input.is-disabled .el-input__icon{cursor:not-allowed}.el-input.is-exceed .el-input__inner{border-color:#F56C6C}.el-input.is-exceed .el-input__suffix .el-input__count{color:#F56C6C}.el-input--suffix .el-input__inner{padding-right:30px}.el-input--prefix .el-input__inner{padding-left:30px}.el-input--medium{font-size:14px}.el-input--medium .el-input__inner{height:36px;line-height:36px}.el-input--medium .el-input__icon{line-height:36px}.el-input--small{font-size:13px}.el-input--small .el-input__inner{height:32px;line-height:32px}.el-input--small .el-input__icon{line-height:32px}.el-input--mini{font-size:12px}.el-input--mini .el-input__inner{height:28px;line-height:28px}.el-input--mini .el-input__icon{line-height:28px}.el-input-group{line-height:normal;display:inline-table;width:100%;border-collapse:separate;border-spacing:0}.el-input-group>.el-input__inner{vertical-align:middle;display:table-cell}.el-input-group__append,.el-input-group__prepend{background-color:#F5F7FA;color:#909399;vertical-align:middle;display:table-cell;position:relative;border:1px solid #DCDFE6;border-radius:4px;padding:0 20px;width:1px;white-space:nowrap}.el-input-group--prepend .el-input__inner,.el-input-group__append{border-top-left-radius:0;border-bottom-left-radius:0}.el-input-group--append .el-input__inner,.el-input-group__prepend{border-top-right-radius:0;border-bottom-right-radius:0}.el-input-group__append:focus,.el-input-group__prepend:focus{outline:0}.el-input-group__append .el-button,.el-input-group__append .el-select,.el-input-group__prepend .el-button,.el-input-group__prepend .el-select{display:inline-block;margin:-10px -20px}.el-input-group__append button.el-button,.el-input-group__append div.el-select .el-input__inner,.el-input-group__append div.el-select:hover .el-input__inner,.el-input-group__prepend button.el-button,.el-input-group__prepend div.el-select .el-input__inner,.el-input-group__prepend div.el-select:hover .el-input__inner{border-color:transparent;background-color:transparent;color:inherit;border-top:0;border-bottom:0}.el-input-group__append .el-button,.el-input-group__append .el-input,.el-input-group__prepend .el-button,.el-input-group__prepend .el-input{font-size:inherit}.el-input-group__prepend{border-right:0}.el-input-group__append{border-left:0}.el-input-group--append .el-select .el-input.is-focus .el-input__inner,.el-input-group--prepend .el-select .el-input.is-focus .el-input__inner{border-color:transparent}.el-input__inner::-ms-clear{display:none;width:0;height:0}.el-input-number{position:relative;display:inline-block;width:180px;line-height:38px}.el-input-number .el-input{display:block}.el-input-number .el-input__inner{-webkit-appearance:none;padding-left:50px;padding-right:50px;text-align:center}.el-input-number__decrease,.el-input-number__increase{position:absolute;z-index:1;top:1px;width:40px;height:auto;text-align:center;background:#F5F7FA;color:#606266;cursor:pointer;font-size:13px}.el-input-number__decrease:hover,.el-input-number__increase:hover{color:#409EFF}.el-input-number__decrease:hover:not(.is-disabled)~.el-input .el-input__inner:not(.is-disabled),.el-input-number__increase:hover:not(.is-disabled)~.el-input .el-input__inner:not(.is-disabled){border-color:#409EFF}.el-input-number__decrease.is-disabled,.el-input-number__increase.is-disabled{color:#C0C4CC;cursor:not-allowed}.el-input-number__increase{right:1px;border-radius:0 4px 4px 0;border-left:1px solid #DCDFE6}.el-input-number__decrease{left:1px;border-radius:4px 0 0 4px;border-right:1px solid #DCDFE6}.el-input-number.is-disabled .el-input-number__decrease,.el-input-number.is-disabled .el-input-number__increase{border-color:#E4E7ED;color:#E4E7ED}.el-input-number.is-disabled .el-input-number__decrease:hover,.el-input-number.is-disabled .el-input-number__increase:hover{color:#E4E7ED;cursor:not-allowed}.el-input-number--medium{width:200px;line-height:34px}.el-input-number--medium .el-input-number__decrease,.el-input-number--medium .el-input-number__increase{width:36px;font-size:14px}.el-input-number--medium .el-input__inner{padding-left:43px;padding-right:43px}.el-input-number--small{width:130px;line-height:30px}.el-input-number--small .el-input-number__decrease,.el-input-number--small .el-input-number__increase{width:32px;font-size:13px}.el-input-number--small .el-input-number__decrease [class*=el-icon],.el-input-number--small .el-input-number__increase [class*=el-icon]{-webkit-transform:scale(.9);transform:scale(.9)}.el-input-number--small .el-input__inner{padding-left:39px;padding-right:39px}.el-input-number--mini{width:130px;line-height:26px}.el-input-number--mini .el-input-number__decrease,.el-input-number--mini .el-input-number__increase{width:28px;font-size:12px}.el-input-number--mini .el-input-number__decrease [class*=el-icon],.el-input-number--mini .el-input-number__increase [class*=el-icon]{-webkit-transform:scale(.8);transform:scale(.8)}.el-input-number--mini .el-input__inner{padding-left:35px;padding-right:35px}.el-input-number.is-without-controls .el-input__inner{padding-left:15px;padding-right:15px}.el-input-number.is-controls-right .el-input__inner{padding-left:15px;padding-right:50px}.el-input-number.is-controls-right .el-input-number__decrease,.el-input-number.is-controls-right .el-input-number__increase{height:auto;line-height:19px}.el-input-number.is-controls-right .el-input-number__decrease [class*=el-icon],.el-input-number.is-controls-right .el-input-number__increase [class*=el-icon]{-webkit-transform:scale(.8);transform:scale(.8)}.el-input-number.is-controls-right .el-input-number__increase{border-radius:0 4px 0 0;border-bottom:1px solid #DCDFE6}.el-input-number.is-controls-right .el-input-number__decrease{right:1px;bottom:1px;top:auto;left:auto;border-right:none;border-left:1px solid #DCDFE6;border-radius:0 0 4px}.el-input-number.is-controls-right[class*=medium] [class*=decrease],.el-input-number.is-controls-right[class*=medium] [class*=increase]{line-height:17px}.el-input-number.is-controls-right[class*=small] [class*=decrease],.el-input-number.is-controls-right[class*=small] [class*=increase]{line-height:15px}.el-input-number.is-controls-right[class*=mini] [class*=decrease],.el-input-number.is-controls-right[class*=mini] [class*=increase]{line-height:13px}
</style>