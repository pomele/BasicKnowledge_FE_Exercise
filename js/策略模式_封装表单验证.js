//
// 将验证逻辑封装成策略对象，这是关键，之后就通过-对象.属性的方式调用
//
var strategies = {
    isNonEmpty: function(value, errorMsg) {
        if (value === '') {
            return errorMsg
        }
    },
    minLength: function(value, length, errorMsg) {
        if (value.length < length) {
            return errorMsg
        }
    },
    isMobile: function(value, errorMsg) {
        if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
            return errorMsg
        }
    }
}

//
// 实现Validator类,负责接受用户的请求并委托给strategies
//
var Validator = function() {
    //保存校验规则
    this.cache = []
}

// 添加校验
Validator.prototype.add = function(dom, rules) {
    var self = this
    // 遍历校验规则
    for(var i = 0, rule; rule = rules[i++];) {
        (function(rule){
            //把strategy和参数分开
            var strategyAry = rule.strategy.split(':')
            var errorMsg = rule.errorMsg
            // 把校验的步骤用空函数包装起来，并且放入cache
            self.cache.push(function(){
                // 挑选出校验规则
                var strategy = strategyAry.shift()
                // 把input的value添加进参数列表
                strategyAry.unshift(dom.value)
                // 把errorMsg添加进参数列表
                strategyAry.push(errorMsg)
                return strategies[strategy].apply(dom, strategyAry)
            })
        })(rule)
    }
}

// 启动校验
Validator.prototype.start = function() {
    for (var i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
        // 开始校验，并取得校验后的结果
        var errorMsg = validatorFunc()
        if (errorMsg) {
            return errorMsg
        }
    }
}

//
// 调用
//
var registerForm = document.getElementById('registerForm')

var validataFunc = function() {
    var validator = new Validator()
    validator.add(registerForm.username, [
            {
                strategy: 'isNonEmpty',
                errorMsg: '用户名不能为空'
            },
            {
                strategy: 'minLength:10',
                errorMsg: '用户名长度不能小于10位'
            }
        ]
    )
    validator.add(registerForm.password, [
            {
                strategy: 'minLength:6',
                errorMsg: '密码长度不能小于6位'
            }
        ]
    )
    validator.add(registerForm.phonenumber, [
            {
                strategy: 'isMobile',
                errorMsg: '手机号码格式不正确'
            }
        ]
    )
    var errorMsg = validator.start()
    return errorMsg
}

var sub = document.querySelector('input[type="submit"]')
sub.onclick = function() {
    var errorMsg = validataFunc()
    if (errorMsg) {
        console.error(errorMsg)
        return false
    }
}


