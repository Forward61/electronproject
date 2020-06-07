import {BrowserWindow} from "electron";
<template>
    <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="交易名称" prop="name">
            <el-form-item v-model="ruleForm.name" >银行冻结监管账户确认</el-form-item>

        </el-form-item>

        <el-form-item label="监管账户名称" prop="jgzhmc">
            <el-input v-model="ruleForm.jgzhmc"></el-input>
        </el-form-item>


        <el-form-item label="监管账户" prop="jgzh">
            <el-input  v-model="ruleForm.jgzh"></el-input>
        </el-form-item>

        <el-form-item label="返回" prop="desc">
            <el-input  v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
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
        if (str.length > length){
            alert(str +"的值超长了！");
        }else
        {

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
        mainWindow.webContents.openDevTools()
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
                    jgzhLength: '30'
                },
                rules: {
                    name: [
                        { required: false, message: '银行冻结监管账户确认', trigger: 'blur' },
                        { min: 0, max: 100, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    region: [
                        { required: false, message: '请选择活动区域', trigger: 'change' }
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
                        var bc= '    30';
                        var jydm = '11';
                        var yhdm = '3018';
                        var ywjym = randomNum(10000,99999);
                        console.log("业务校验码 ：" + ywjym);
                        var jmms = '10';
                        var realJgzhmc=rightPad(_this.ruleForm.jgzhmc,200);
                        // console.log(rightPad(1022,6))
                        var realJgzh = rightPad(_this.ruleForm.jgzh,30);

                        var reqString = bc + jydm + yhdm + ywjym + jmms + realJgzhmc + realJgzh;
                        console.log("请求字符串" + reqString);
                        var net = require('net');
                        var HOST = '118.24.52.46';
                        var PORT = 8081;

                        var client = new net.Socket();
                        client.connect(PORT, HOST, function() {

                            console.log('CONNECTED TO: ' + HOST + ':' + PORT);
                            // 建立连接后立即向服务器发送数据，服务器将收到这些数据
                            client.write('Hello!');

                        });

// 为客户端添加“data”事件处理函数
// data是服务器发回的数据
                        client.on('data', function(data) {
                            var array = data.toString();
                            _this.ruleForm.desc = array;
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