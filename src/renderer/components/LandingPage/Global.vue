<script type="text/javascript">
    const ipoptions= [{
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
    const colorList = [
        // '#F9F900',
        // '#6FB7B7',
        // '#9999CC',

    ]
    const colorListLength = 20
    function getRandColor () {
        var tem = Math.round(Math.random() * colorListLength)
        return colorList[tem]
    }
    export default
    {
        ipoptions,
        colorList,
        colorListLength,
        getRandColor
    }
</script>
