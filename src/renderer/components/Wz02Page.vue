import {BrowserWindow} from "electron";
<template>
    <div>
      <el-button type="primary" disabled><router-link id ="Wz02Req" to="/">挡板——梧州应付资金查询响应</router-link></el-button>
      <el-button type="primary" disabled><router-link id ="Wz04Req" to="/Wz04">挡板——梧州应付资金查询响应</router-link></el-button>

      <el-button type="success" disabled><router-link id ="balanceReq" to="/balanceReq">余额查询</router-link></el-button>
        <el-button type="primary" disabled><router-link id ="stateReq" to="/stateReq">监管状态告知</router-link></el-button>
        <el-button type="success" disabled><router-link id ="unfreezeReq" to="/unfreezeReq">监管机构解除监管账户限制确认</router-link></el-button>

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="交易名称" prop="name">
            <el-form-item v-model="ruleForm.name" >挡板——梧州应缴资金查询响应</el-form-item>

        </el-form-item>

<!--        <el-form-item label="返回码" prop="fhm">-->
<!--            <el-input v-model="ruleForm.fhm"></el-input>-->
<!--        </el-form-item>-->


        <el-form-item label="缴款编号" prop="jkbh">
            <el-input  v-model="ruleForm.jkbh"></el-input>
        </el-form-item>
        <el-form-item label="缴款账号" prop="jkzh">
            <el-input  v-model="ruleForm.jkzh"></el-input>
        </el-form-item>

        <el-form-item label="监管银行名称" prop="jgyhmc">
            <el-input  v-model="ruleForm.jgyhmc"></el-input>
        </el-form-item>
          <el-form-item label="开发企业名称" prop="kfqymc">
            <el-input  v-model="ruleForm.kfqymc"></el-input>
          </el-form-item>
          <el-form-item label="缴款类型" prop="jklx">
            <el-input  v-model="ruleForm.jklx"></el-input>
          </el-form-item>
          <el-form-item label="缴款金额" prop="jkje">
            <el-input  v-model="ruleForm.jkje"></el-input>
          </el-form-item>
          <el-form-item label="购房人名称" prop="gfrmc">
            <el-input  v-model="ruleForm.gfrmc"></el-input>
          </el-form-item>
          <el-form-item label="购房人证件" prop="gfrzj">
            <el-input  v-model="ruleForm.gfrzj"></el-input>
          </el-form-item>
          <el-form-item label="合同编号" prop="htbh">
            <el-input  v-model="ruleForm.htbh"></el-input>
          </el-form-item>
          <el-form-item label="房屋坐落" prop="fwzl">
            <el-input  v-model="ruleForm.fwzl"></el-input>
          </el-form-item>




        <el-form-item label="服务器返回" prop="desc"  class="bg-success">
            <el-input  v-model="ruleForm.desc" :disabled=true></el-input>
        </el-form-item>

        <el-form-item>
<!--            <el-button type="primary" @click="submitForm('ruleForm')">发送</el-button>-->
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          <el-button :loading="scope.row.loading" type="primary" @click="upload('ruleForm')">发送到挡板</el-button>

        </el-form-item>

        <el-form-item label="发送的报文" prop="fsbw">
            <el-input  v-model="ruleForm.fsbw"></el-input>
        </el-form-item>
    </el-form>
    </div>
</template>
<script>
    function getLength(str) {
        ///<summary>获得字符串实际长度，中文2，英文1</summary>
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
                realLength += 2;
        }
        return realLength;
    };
    function getRealLengthReqString(str,length) {
        if (str.length > length||getLength(str)>length){
            alert(str +"的值超长了！注意1个中文占两个字节！");
          throw new Error(str +"的值超长了！注意1个中文占两个字节！");


          return
          // return str.subCHString(0,length)

        }else
        {
            var strlenth= getLength(str);

            var addLenth = length - strlenth;
            var addStr = ''.padEnd(addLenth, ' ')

            return str + addStr
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
        return str+ new Array(length-templenth).join(' ',  '') ;
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
    function rtrim(str){  //删除右边的空格
      return str.replace(/(\s*$)/g,"");
    }
    //判断某个字符是否是汉字
    String.prototype.isCHS = function(i){
      if (this.charCodeAt(i) > 255 || this.charCodeAt(i) < 0)
        return true;
      else
        return false;
    };

    //将字符串拆成字符，并存到数组中
    String.prototype.strToCharsCH = function(){
      var chars = new Array();
      for (var i = 0; i < this.length; i++){
        chars[i] = [this.substr(i, 1), this.isCHS(i)];
      }
      String.prototype.charsArray = chars;
      return chars;
    };

    //截取字符串（从start字节到end字节）
    String.prototype.subCHString = function(start, end){
      var len = 0;
      var str = "";
      this.strToCharsCH();
      for (var i = 0; i < this.length; i++) {
        if(this.charsArray[i][1])
          len += 2;
        else
          len++;
        if (end < len)
          return str;
        else if (start < len)
          str += this.charsArray[i][0];
      }
      return str;
    };


    export default {
        data() {
            return {
              scope: {
                row:{
                  loading: false
                }
              },
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
                    jgzhmc: '',
                    lsh:'',

                    ip: '172.31.207.11',
                    port: '46013',
                    fsbw: '',
                    fhm: '',
                    jkbh: '',
                    jkzh: '',
                    jgyhmc: '',
                    kfqymc: '',
                    jklx: '',
                    jkje: '',
                    gfrmc: '',
                    gfrzj: '',
                    htbh: '',
                    fwzl: '',
                    filecontent: '',
                  options: [{
                        value: '172.31.207.10',
                        label: '开发环境-172.31.207.10'
                    }, {
                        value: '172.31.207.11',
                        label: 'SIT环境-207.11'
                    }, {
                        value: '172.31.207.12',
                        label: 'UAT环境-207.12'
                    }, {
                        value: '172.31.207.13',
                        label: 'ZSC环境-207.13'
                    }]
                },
                rules: {
                    name: [
                        { required: false, message: '银行冻结监管账户确认', trigger: 'change' },
                        { min: 0, max: 100, message: '长度在 3 到 5 个字符', trigger: 'change' }
                    ],
                  fhm: [
                    { required: false, message: '返回码2位，00成功，其他失败', trigger: 'change' },
                    { min: 0, max: 2, message: '长度2个字符', trigger: 'change' }
                  ],
                  jkbh: [
                    { required: false, message: '缴款编号', trigger: 'change' },
                    { min: 0, max: 14, message: '长度14个字符', trigger: 'change' }
                  ],
                  jkzh: [
                    { required: false, message: '缴款账号（监管账号）', trigger: 'change' },
                    { min: 0, max: 30, message: '长度30个字符', trigger: 'change' }
                  ],
                  jgyhmc: [
                    { required: false, message: '监管银行名称', trigger: 'change' },
                    { min: 0, max: 100, message: '长度100个字符', trigger: 'change' }
                  ],
                  kfqymc: [
                    { required: false, message: '开发企业名称', trigger: 'change' },
                    { min: 0, max: 100, message: '长度100 个字符', trigger: 'change' }
                  ],
                  jklx: [
                    { required: false, message: '缴款类型', trigger: 'change' },
                    { min: 0, max: 2, message: '长度 2个字符', trigger: 'change' }
                  ],
                  jkje: [
                    { required: false, message: '缴款金额', trigger: 'change' },
                    { min: 0, max: 18, message: '长度18个字符', trigger: 'change' }
                  ],
                  gfrmc: [
                    { required: false, message: '购房人名称', trigger: 'change' },
                    { min: 0, max: 100, message: '长度100 个字符', trigger: 'change' }
                  ],
                  gfrzj: [
                    { required: false, message: '购房人证件', trigger: 'change' },
                    { min: 0, max: 50, message: '长度50 个字符', trigger: 'change' }
                  ],
                  htbh: [
                    { required: false, message: '合同编号', trigger: 'change' },
                    { min: 0, max: 50, message: '长度50 个字符', trigger: 'change' }
                  ],
                  fwzl: [
                    { required: false, message: '房屋坐落', trigger: 'change' },
                    { min: 0, max: 100, message: '长度100 个字符', trigger: 'change' }
                  ],


                    // date1: [
                    //     { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    // ],
                    // date2: [
                    //     { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                    // ],
                    // type: [
                    //     { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                    // ],
                    resource: [
                        { required: false, message: '请选择活动资源', trigger: 'change' }
                    ],
                    desc: [
                        { required: false, message: '请填写活动形式', trigger: 'change' }
                    ]
                }
            };
        },
        mounted() {
          var _this = this;

              // console.log("字符串的长度 +" +getLength(_this.ruleForm.name))


              var request = require('request');
              var qs = require('querystring');

              var content = _this.ruleForm.fhm;


              console.log("content:", content);
              // console.log("\n");


              var enurl = encodeURIComponent('中三ss4')
              console.log(enurl)
              request({
                url:  'http://172.31.210.195:9527/py/textReader?content=' + enurl+'&code=02&program=wz',
                method: "post"
                // ,
                // headers: {
                //   "content-type": "application/json",
                // }
                // ,
                // body: content

              }, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                  _this.ruleForm.filecontent=response.body
                  console.log('文件内容' + _this.ruleForm.filecontent)
                  var res = response.body
                  _this.ruleForm.desc =  response.body
                  // var iconv = require('iconv-lite')
                  // var res =  iconv.decode(new Buffer(resO), 'gbk');

                  _this.ruleForm.fhm=rtrim(res.subCHString(20,22))
                  _this.ruleForm.jkbh=rtrim(res.subCHString(22,36))
                  _this.ruleForm.jkzh=rtrim(res.subCHString(36,66))
                  _this.ruleForm.jgyhmc=rtrim(res.subCHString(66,166))
                  _this.ruleForm.kfqymc=rtrim(res.subCHString(166,266))
                  _this.ruleForm.jklx=rtrim(res.subCHString(266,268))
                  _this.ruleForm.jkje=rtrim(res.subCHString(268,286))

                  _this.ruleForm.gfrmc=rtrim(res.subCHString(286,386))
                  _this.ruleForm.gfrzj=rtrim(res.subCHString(386,436))
                  _this.ruleForm.htbh=rtrim(res.subCHString(436,486))
                  _this.ruleForm.fwzl=rtrim(res.subCHString(486,586))


                } else {
                  console.log('error了' + error)
                  alert('读取失败，请检查挡板主机pyService服务9527端口')
                }
              })

              if(_this.ruleForm.jkbh===''){
                _this.ruleForm.jkbh='读取失败，请检查挡板主机pyService服务9527端口'
              }





          // 用Nginx反向代理获取文件具体内容
          // var _this=this;
          // console.log('this http  ' + _this.$http)
          // _this.$http.get("http://www.ifreedom61.xyz/img/d.html").then(function (response){
          //   console.log(response.data)
          //   _this.ruleForm.jgzh=response.data
          //
          //   console.log("get请求",_this.ruleForm.jgzh);
          //   console.log('this.$fs '+_this.$fs)
          //   console.log('this.fs' + _this.fs)
          //   _this.$fs.writeFile('fs.txt', '我是新写入的内容', function (err) {
          //     if (err) console.error(err);
          //     console.log('数据写入的数据');
          //   });
          // }).catch(function(error){
          //   console.log('res error ' + error)
          //   // _this.ruleForm.jgzh=response.data
          //
          //   console.log(error);
          // });




        },
        methods: {
          upload(formName) {
            var _this = this;
            this.$refs[formName].validate((valid) => {
              if (valid) {
                // console.log("字符串的长度 +" +getLength(_this.ruleForm.name))

                console.log('传递的文件内容' + _this.ruleForm.filecontent)

                var request = require('request');
                var qs=require('querystring');

                var post_data={conent:123};//这是需要提交的数据
                var content= _this.ruleForm.filecontent.subCHString(0,20)
                            + '00' + getRealLengthReqString(_this.ruleForm.jkbh,14)
                            + getRealLengthReqString(_this.ruleForm.jkzh ,30)  + getRealLengthReqString(_this.ruleForm.jgyhmc ,100)
                    + getRealLengthReqString(_this.ruleForm.kfqymc ,100)  + getRealLengthReqString(_this.ruleForm.jklx ,2)
                    + getRealLengthReqString(_this.ruleForm.jkje ,18)  + getRealLengthReqString(_this.ruleForm.gfrmc ,100)
                    + getRealLengthReqString(_this.ruleForm.gfrzj ,50)  + getRealLengthReqString(_this.ruleForm.htbh ,50)
                    + getRealLengthReqString(_this.ruleForm.fwzl ,100)





                console.log("content:",content);
                // console.log("\n");


                var enurl= encodeURIComponent(content)
                console.log('enurl ' + enurl)
                request({
                  url: 'http://172.31.210.195:9527/py/textUpload?content='+enurl+'&code=02&program=wz',
                  method: "post",
                  headers: {
                    "content-type": "application/json",
                  }
                  // ,
                  // body: content

                }, function(error, response, body) {
                  if (!error && response.statusCode == 200) {
                    console.log('')
                    _this.ruleForm.desc =  response.body

                    alert('成功')
                  }else {
                    console.log('error了' + error)
                    alert('失败，检查挡板服务器9527端口')
                  }
                })








              }

            });

          },





            submitForm(formName) {
                var _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // console.log("字符串的长度 +" +getLength(_this.ruleForm.name))
                        var bc= '   410';
                        var jydm = '14';
                        var yhdm = '3018';
                        var ywjym = getRealLengthReqString(randomNum(100000,999999),6);
                        console.log("业务校验码 ：" + ywjym);
                        var jmms = '10';
                        var realJgzhmc=getRealLengthReqString(_this.ruleForm.jgzhmc,100);
                        // console.log(rightPad(1022,6))
                        var realJgzh = getRealLengthReqString(_this.ruleForm.jgzh,30);

                        var jkzh = getRealLengthReqString(_this.ruleForm.jkzh,20)
                        var lsh = formatDate(new Date().getTime(),'YYYYMMDDhhmmss')+randomNum(100000,999999);
                        var realLsh = lsh
                        var xzsj =formatDate(new Date().getTime(),'YYYY/MM/DD hh:mm:ss');
                        var realXzsj = getRealLengthReqString(xzsj,20)
                        var realjgyhmc = getRealLengthReqString(_this.ruleForm.jgyhmc,200);

                        var reqString = bc + jydm + yhdm + ywjym + jmms + realJgzhmc + realJgzh
                                         + jkzh + realLsh + realXzsj + realjgyhmc;
                        _this.ruleForm.fsbw = reqString;
                        console.log("请求字符串" )
                        console.log(reqString);

                        var encoding = require('encoding')

                        var realReq = encoding.convert(reqString, "gbk");

                        var net = require('net');
                        var HOST = _this.ruleForm.ip;
                        var PORT = _this.ruleForm.port;

                        var client = new net.Socket();
                        client.connect(PORT, HOST, function() {

                            console.log('CONNECTED TO: ' + HOST + ':' + PORT);
                            // 建立连接后立即向服务器发送数据，服务器将收到这些数据
                            client.write(realReq);

                        });

// 为客户端添加“data”事件处理函数
// data是服务器发回的数据
                        client.on('data', function(data) {
                            var iconv = require('iconv-lite')
                            var decodeResData =  iconv.decode(new Buffer(data), 'gbk');
                            console.log("返回信息：")
                            console.log(decodeResData)
                            _this.ruleForm.desc = decodeResData;
                            // console.log('DATA: ' + data);
                            // 完全关闭连接
                            client.destroy();
                        });

// 为客户端添加“close”事件处理函数
                        client.on('close', function() {
                            console.log('Connection closed');
                        });
//数据错误事件
                        client.on('error',function(exception){
                            console.log('服务端错误socket error:' + exception.toString());
                            _this.ruleForm.desc = exception.toString();

                            client.end();
                        });
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