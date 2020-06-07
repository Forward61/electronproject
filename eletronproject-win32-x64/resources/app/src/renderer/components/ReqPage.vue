import {BrowserWindow} from "electron";
<template>
    <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="活动名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" prop="region">
            <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>
<!--        <el-form-item label="活动时间" required>-->
<!--            <el-col :span="11">-->
<!--                <el-form-item prop="date1">-->
<!--                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>-->
<!--                </el-form-item>-->
<!--            </el-col>-->
<!--            <el-col class="line" :span="2">-</el-col>-->
<!--            <el-col :span="11">-->
<!--                <el-form-item prop="date2">-->
<!--                    <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>-->
<!--                </el-form-item>-->
<!--            </el-col>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="即时配送" prop="delivery">-->
<!--            <el-switch v-model="ruleForm.delivery"></el-switch>-->
<!--        </el-form-item>-->
        <el-form-item label="活动性质" prop="type">
            <el-checkbox-group v-model="ruleForm.type">
                <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                <el-checkbox label="地推活动" name="type"></el-checkbox>
                <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item label="特殊资源" prop="resource">
            <el-radio-group v-model="ruleForm.resource">
                <el-radio label="线上品牌商赞助"></el-radio>
                <el-radio label="线下场地免费"></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="活动形式" prop="desc">
            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
    </div>
</template>
<script>
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
    export default {
        data() {
            return {
                ruleForm: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 0, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
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
                            _this.ruleForm.desc = data;
                            console.log('DATA: ' + data);
                            // 完全关闭连接
                            client.destroy();
                        });

// 为客户端添加“close”事件处理函数
                        client.on('close', function() {
                            console.log('Connection closed');
                        });                    } else {
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