// 入口函数
$(function () {
    // 初始化滚动条
    resetui()

    // 1. 为发送消息的按钮绑定点击事件
    $('#sendBtn').eq(0).on('click', function () {
        // 2. 获取表单数据
        var text = $(this).prev().val().trim()
        if (text.length <= 0) {
            return
        }
        // console.log(text);
        // 3. 如果输入了内容的话, 将内容添加到页面当中
        var userTag = `
        <li class="right_word">
          <img src="img/person02.png" /> <span>${text}</span>
        </li>`
        $('#talk_list').append(userTag)
        // 点击过后清空表单域你内容
        $(this).prev().val('')

        // 重置滚动条位置
        resetui()

        // 4. 向服务端发起请求获取机器人聊天的数据
        $.get('http://www.liulongbin.top:3006/api/robot', { spoken: text },
            function (res) {
                if (res.message === 'success') {
                    // 5. 获取聊天机器人的对话数据 
                    var msg = res.data.info.text
                    // 6. 将获取到的数据添加到页面
                    $('#talk_list').append(`
                        <li class="left_word">
                            <img src="img/person01.png" /> <span>${msg}</span>
                        </li>
                    `)
                    // 重置滚动条位置
                    resetui()

                    // 7. 讲获取到的文字数据转为语音
                    $.get('http://www.liulongbin.top:3006/api/synthesize', {
                        text: msg
                    }, function (res) {
                        if (res.status === 200) {
                            // 调取成功播放声音 
                            $('#voice').prop('src', res.voiceUrl)
                        }
                    })
                }
            })
    })

    // 为表单绑定键盘事件
    $('#ipt').on('keyup', function (e) {
        if (e.keyCode === 13) {
            // 调用发送消息的点击事件
            $('#sendBtn').eq(0).trigger('click')
        }
    })

})