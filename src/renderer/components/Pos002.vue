import {BrowserWindow} from "electron";
<template>
  <div>
    <el-button type="primary" disabled><router-link id ="Pos001" to="/">Pos应缴资金查询</router-link></el-button>
<!--    <el-button type="primary" disabled><router-link id ="Pos002" to="/Pos002">Pos缴存确认</router-link></el-button>-->

    <el-button type="success" disabled><router-link id ="tcpclientTool" to="/tcpclient">Http请求不含报文长度</router-link></el-button>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <!--        <el-form-item label="交易名称" prop="name">-->
      <!--            <el-form-item v-model="ruleForm.name" >Tcp</el-form-item>-->

      <!--        </el-form-item>-->


      <el-form-item label="交易名称" prop="name">
        <el-form-item  >Pos缴存</el-form-item>

      </el-form-item>
      <el-form-item label="地区编码" prop="reqText" >
        <el-input type="textarea" autosize v-model="ruleForm.areaCode"></el-input>
      </el-form-item>
      <el-form-item label="缴存编号" prop="reqText" >
        <el-input type="textarea" autosize v-model="ruleForm.payCode"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="scope.row.loading" @click="submitForm('ruleForm')">发送</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
<!--        <el-button type="primary" :loading="scope.row.loading" @click="submitForm('ruleForm')">缴费</el-button>-->

      </el-form-item>

      <el-descriptions class="margin-top" title="响应信息" :column="3" :size="size" border>
        <template slot="extra">
          <el-button type="primary" size="small">操作</el-button>
        </template>
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
<!--      <el-form-item label="业主姓名" prop="ownerName" class="" >-->
<!--        <pre v-highlight="ruleForm.ownerName"><code class="xml"></code></pre>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="业主证件号码" prop="ownerCardNo" class="" >-->
<!--        <pre v-highlight="ruleForm.ownerCardNo"><code class="xml"></code></pre>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="房屋坐落" prop="houseAddress" class="" >-->
<!--        <pre v-highlight="ruleForm.houseAddress"><code class="xml"></code></pre>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="计划缴款金额" prop="payMoney" class="" >-->
<!--        <pre v-highlight="ruleForm.payMoney"><code class="xml"></code></pre>-->
<!--      </el-form-item>-->

<!--      <el-form-item label="监管账户账号" prop="monAccountNo" class="" >-->
<!--        <pre v-highlight="ruleForm.monAccountNo"><code class="xml"></code></pre>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="监管账户户名" prop="monAccountName" class="" >-->
<!--        <pre v-highlight="ruleForm.monAccountName"><code class="xml"></code></pre>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="备注" prop="remark" class="" >-->
<!--        <pre v-highlight="ruleForm.remark"><code class="xml"></code></pre>-->
<!--      </el-form-item>-->



      <el-form-item label="返回不含头" prop="resXmlText" class="" >
        <pre v-highlight="ruleForm.resXmlText"><code class="xml"></code></pre>
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
      <el-form-item label="返回不含头" prop="resXmlText" class="" >
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
        // jydm: '',
        // jydmLength: '2',
        areaCode: '',
        payCode: '',
        ownerName: '',
        ownerCardNo: '',
        houseAddress: '',
        payMoney: '',
        monAccountNo: '',
        monAccountName: '',
        remark: '',
        reqText: '',
        resText: '',
        lsh:'',

        ip: '127.0.0.1',
        port: '16111',
        fsbw: '',
        resXmlText: '',
        reqXmlText: '',
        options: [{
          value: '172.31.210.18',
          label: '开发环境-172.31.210.18'
        }, {
          value: '172.31.210.19',
          label: 'SIT环境-210.19'
        }, {
          value: '172.31.210.20',
          label: 'UAT环境-210.20'
        }, {
          value: '172.31.210.21',
          label: 'ZSC环境-210.21'
        },
          {
            value: '127.0.0.1',
            label: '本地-127.0.0.1'

          }]
      },
      rules: {
        areaCode: [
          { required: true, message: '地区码不能为空', trigger: 'blur' }

        ],
        resource: [
          { required: false, message: '请选择活动资源', trigger: 'change' }
        ]
        // ,
        // desc: [
        //     { required: false, message: '请填写活动形式', trigger: 'blur' }
        // ]
      }
    };
  },
  props:['jsonString'],
  mounted(){
    console.log(this.$route.params.jsonString, this.jsonString)
    console.log(this.jsonString.Message.Message_Body.response.ownerName)
  },
  methods: {
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
          _this.ruleForm.fsbw = reqString;
          console.log("请求字符串" )
          console.log(reqString);
          // Node.js中的http请求客户端示例(request client)
//https://www.jb51.net/article/112937.htm
          var request = require('request');
          var url ='http://127.0.0.1:16111/ysjg';
          var bodyChar = '<Message> <Message_Body> <request>0000</request> <requestMsg>成功</requestMsg> </Message_Body> </Message>';

          request({
            url: url,
            method: "POST",
            headers: {
              "content-type": "application/xml",
            },
            body: bodyChar
          }, function(error, response, body) {
            if (!error && response.statusCode == 200) {
              console.log(' '+body) // 请求成功的处理逻辑
            } else (
                    console.log('else' +body)
            )
            var reqjsonObj=xmlObj2json(xmlStr2XmlObj(bodyChar))
            console.log('req request ' + reqjsonObj.Message.Message_Body.request)
            _this.scope.row.loading =false;
                _this.ruleForm.resText = body;
            _this.ruleForm.resXmlText =showXml(body);
            var jsonObj=xmlObj2json(xmlStr2XmlObj(_this.ruleForm.resXmlText))
            console.log('json' + jsonObj)
            console.log('json ownerName    de ' + jsonObj.Message.Message_Body.response.ownerName)
            _this.ruleForm.ownerName=jsonObj.Message.Message_Body.response.ownerName
            _this.ruleForm.ownerCardNo=jsonObj.Message.Message_Body.response.ownerCardNo
            _this.ruleForm.houseAddress=jsonObj.Message.Message_Body.response.houseAddress
            _this.ruleForm.payMoney=jsonObj.Message.Message_Body.response.payMoney
            _this.ruleForm.monAccountNo=jsonObj.Message.Message_Body.response.monAccountNo
            _this.ruleForm.monAccountName=jsonObj.Message.Message_Body.response.monAccountName
            _this.ruleForm.remark=jsonObj.Message.Message_Body.response.remark

          });

            // request('http://127.0.0.1:16111/ysjg', function (error, response, body) {
          //   if (!error && response.statusCode == 200) {
          //     console.log(body);
          //     _this.ruleForm.resText = body;
          //
          //     _this.scope.row.loading =false;
          //
          //   }else {
          //     console.log('else: '  + body);
          //   }
          // })


        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>
<style>
.bg-success {
  background: #67C23A;
}
</style>