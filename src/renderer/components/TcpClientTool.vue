import {BrowserWindow} from "electron";
<template>

    <div>
        <el-button type="primary" disabled><router-link id ="tcpclient" to="/">Tcp请求头含报文长度</router-link></el-button>
        <el-button type="success" disabled><router-link id ="tcpclientTool" to="/tcpclient">Tcp请求不含报文长度</router-link></el-button>

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="交易名称" prop="name">
                <el-form-item  >Tcp请求不含报文长度</el-form-item>

            </el-form-item>

            <el-form-item label="发送报文" prop="reqText" >
                <el-input type="textarea" autosize  v-model="ruleForm.reqText"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">发送</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>


            <el-form-item label="返回格式化" prop="resXmlText" class="" >
<!--                <div>-->
                    <!-- 如果是动态加载内容如变量 'sourcecode' 赋值再渲染，可用以下方式 -->

<!--                <pre v-highlight="ruleForm.resXmlText"><code class="xml"></code></pre>-->
<!--                </div>-->



                        <pre v-highlight="ruleForm.resXmlText"><code class="xml"></code></pre>

            </el-form-item>

            <el-form-item label="服务器返回" prop="resText" class="bg-success" >
                <el-input  v-model="ruleForm.resText" :disabled=true></el-input>
            </el-form-item>


            <el-row>
                <el-col :span="8">
                    <el-form-item label="端口" >
                        <el-input  v-model="ruleForm.ip"></el-input>
                    </el-form-item>

                </el-col>
                <el-col :span="8">
                    <el-form-item label="端口" >
                        <el-input  v-model="ruleForm.port"></el-input>
                    </el-form-item>
                </el-col>

            </el-row>
<!--            <el-form-item label="发送的报文" >-->
<!--                <el-input  v-model="ruleForm.fsbw"></el-input>-->
<!--            </el-form-item>-->

            <el-form-item label="发送格式化"  >
<!--                <el-input type="textarea" autosize-->
<!--                          v-model="ruleForm.reqXmlText" ></el-input>-->
                <pre v-highlight="ruleForm.reqXmlText"><code class="xml"></code></pre>
            </el-form-item>
<!--            <el-form-item label="发送不含头"  >-->
<!--                                <el-input type="textarea" autosize-->
<!--                                          v-model="ruleForm.reqXmlText" ></el-input>-->
<!--            </el-form-item>-->
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

    export default {
        data() {
            return {

                ruleForm: {
                    reqText: '',
                    resText: '',
                    ip: '127.0.0.1',
                    port: 14015,
                    resXmlText: '',
                    reqXmlText: ''
                },
                rules: {
                    reqText: [
                        { required: true, message: '发送报文不能为空', trigger: 'blur' }

                    ]
                }
            };
        },


        methods: {
            submitForm(formName) {
                var _this = this;
                var encoding = require('encoding')
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //验证表单后把返回结果清空，避免超时或者其他返回内容未清空造成使用者误解。
                        _this.ruleForm.resText = '';
                        _this.ruleForm.resXmlText = '';
                        _this.ruleForm.reqXmlText = showXml(_this.ruleForm.reqText);
                        var reqtxt2utf8 = encoding.convert(_this.ruleForm.reqText, "utf-8");
                        var realReqTextLengths =getLength(_this.ruleForm.reqText);
                        console.log("realReqTextLengths" +realReqTextLengths);

                        var reqString =  reqtxt2utf8;
                        _this.ruleForm.fsbw = reqString;
                        console.log("请求字符串" )
                        console.log(reqString);




                        // var realReq = reqString;

                        var net = require('net');
                        var HOST = _this.ruleForm.ip;
                        var PORT = _this.ruleForm.port;

                        var client = new net.Socket();
                        client.connect(PORT, HOST, function() {

                            console.log('CONNECTED TO: ' + HOST + ':' + PORT);
                            // 建立连接后立即向服务器发送数据，服务器将收到这些数据
                            client.write(reqString);

                        });

// 为客户端添加“data”事件处理函数
// data是服务器发回的数据
                        client.on('data', function(data) {
                            var iconv = require('iconv-lite')
                            var decodeResData =  iconv.decode(new Buffer(data), 'utf-8');
                            console.log("返回信息：")
                            console.log(decodeResData)
                            _this.ruleForm.resText = decodeResData;
                            // var resXmlTextString = decodeResData.toString().slice(8);
                            var resXmlTextString = decodeResData.toString();

                            _this.ruleForm.resXmlText =showXml(resXmlTextString);






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
                            _this.ruleForm.resText = exception.toString();
                            // _this.ruleForm.resXmlText = exception.toString().slice(3);

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
    .hljs {
        line-height: 20px;
    }
</style>