import {BrowserWindow} from "electron";
<template>
    <div>
        <el-button type="primary" disabled><router-link id ="limitReq" to="/">监管机构限制监管账户确认</router-link></el-button>
        <el-button type="success" disabled><router-link id ="balanceReq" to="/balanceReq">余额查询</router-link></el-button>
        <el-button type="primary" disabled><router-link id ="stateReq" to="/stateReq">监管状态告知</router-link></el-button>
        <el-button type="success" disabled><router-link id ="unfreezeReq" to="/unfreezeReq">监管机构解除监管账户限制确认</router-link></el-button>

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="交易名称" prop="name">
            <el-form-item v-model="ruleForm.name" >监管状态告知</el-form-item>

        </el-form-item>

        <el-form-item label="监管账户名称" prop="jgzhmc">
            <el-input v-model="ruleForm.jgzhmc"></el-input>
        </el-form-item>



        <el-form-item label="监管账户" prop="jgzh">
            <el-input  v-model="ruleForm.jgzh"></el-input>
        </el-form-item>
		<el-form-item label="监管状态" prop="jgzt">
            <el-input  v-model="ruleForm.jgzt"></el-input>
        </el-form-item>
        <el-form-item label="中心操作员" prop="zxczy">
            <el-input  v-model="ruleForm.zxczy"></el-input>
        </el-form-item>
<!--        <el-form-item label="流水号" prop="lsh">-->
<!--            <el-input  v-model="ruleForm.lsh"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="限制时间" prop="xzsj">-->
<!--            <el-input  v-model="ruleForm.xzsj"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="限制说明" prop="xzsm">
            <el-input  v-model="ruleForm.xzsm"></el-input>
        </el-form-item>

        <el-form-item label="返回" prop="desc">
            <el-input  v-model="ruleForm.desc"></el-input>
        </el-form-item>

        <el-form-item label="ip" prop="ip">
            <el-input  v-model="ruleForm.ip"></el-input>
        </el-form-item>

        <el-form-item label="端口" prop="port">
            <el-input  v-model="ruleForm.port"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">发送</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
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
            alert(str +"的值超长了！");
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

            export default {
        data() {
            return {
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
                    jgzh: '',
		            jgzt: '',
                    zxczy: '',
                    lsh:'',
                    xzsj: '',
                    xzsm: '',
                    ip: '172.31.249.81',
                    port: '46013',
                    fsbw: ''
                },
                rules: {
                    name: [
                        { required: false, message: '银行冻结监管账户确认', trigger: 'blur' },
                        { min: 0, max: 100, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    region: [
                        { required: false, message: '请选择活动区域', trigger: 'change' }
                    ],
                    jgzh: [
                        { required: true, message: '请输入监管账户', trigger: 'change' }
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
                        { required: false, message: '请填写活动形式', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                var _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {

                        // console.log("字符串的长度 +" +getLength(_this.ruleForm.name))
                        var bc= '   432';
                        var jydm = '15';
                        var yhdm = '3018';
                        var ywjym = getRealLengthReqString(randomNum(100000,999999),6);
                        console.log("业务校验码 ：" + ywjym);
                        var jmms = '10';
                        var realJgzhmc=getRealLengthReqString(_this.ruleForm.jgzhmc,100);
                        // console.log(rightPad(1022,6))
                        var realJgzh = getRealLengthReqString(_this.ruleForm.jgzh,30);

						var jgxyh = formatDate(new Date().getTime(),'YYYYMMDDhhmmss')+randomNum(100000,999999);
						console.log('监管协议号'+ jgxyh);
						
						var realJgzt = getRealLengthReqString(_this.ruleForm.jgzt,2);

                        var zxczy = getRealLengthReqString(_this.ruleForm.zxczy,20)
                        var lsh = formatDate(new Date().getTime(),'YYYYMMDDhhmmss')+randomNum(100000,999999);
                        var realLsh = getRealLengthReqString(lsh,20)
                        var xzsj =formatDate(new Date().getTime(),'YYYY/MM/DD hh:mm:ss') + ' ';
                        console.log(xzsj);
                        var realxzsm = getRealLengthReqString(_this.ruleForm.xzsm,200);

                        var reqString = bc + jydm + yhdm + ywjym + jmms + realJgzhmc + realJgzh
                                        + jgxyh+ realJgzt + zxczy + realLsh + xzsj + realxzsm;
                        _this.ruleForm.fsbw = reqString;

                        console.log("原请求长度" + getLength(reqString))

                        console.log("请求字符串" )
                        console.log(reqString);
                        var encoding = require('encoding')

                        var realReq = encoding.convert(reqString, "gbk");



                        // var iconv = require('iconv-lite');



                        // var iconvreqString = iconv.encode(reqString,'gbk');

                        // res.setHeader('Content-Type', 'text/html; charset=gbk')
                        // res.end(gbkBytes)




                        var net = require('net');
                        var HOST = _this.ruleForm.ip;
                        var PORT = _this.ruleForm.port;


                        var client = new net.Socket();
                        client.setDefaultEncoding('utf8')
                        client.connect(PORT, HOST, function() {

                            console.log('CONNECTED TO: ' + HOST + ':' + PORT);
                            // 建立连接后立即向服务器发送数据，服务器将收到这些数据
                            // client.write(iconvreqString);
                            client.write(realReq);
                            // console.log("转换后请求长度" + getLength(result))


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