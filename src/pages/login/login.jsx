import React, { Component } from "react";
import {Redirect} from 'react-router-dom'
import { Form, Icon, Input, Button,message } from "antd";
import {reqLogin} from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'


import "./login.less";
import logo from "../../assets/images/logo.png";

//分别暴露 需要结构  统一暴露不需要解构



// 登录的路由组件
const Item = Form.Item;
class Login extends Component {
  handleSubmit = e => {
    e.preventDefault(); //阻止了事件的默认行为
    const form = this.props.form;
    form.validateFields(async (err, values) => {
      if (!err) {
        const {username, password} = values
        const result = await reqLogin(username, password) // {status: 0, data: user}  {status: 1, msg: 'xxx'}
        // console.log('请求成功', result)
        if (result.status===0) { // 登陆成功
          // 提示登陆成功
          message.success('登陆成功') 
          debugger
          // 保存user
          const user = result.data
          memoryUtils.user = user // 保存在内存中
          storageUtils.saveUser(user) // 保存到local中

          // 跳转到管理界面 (不需要再回退回到登陆)
          this.props.history.replace('/')

        } else { // 登陆失败
          // 提示错误信息
          message.error(result.msg)
        }
      }
      else{
        console.log('检验失败!')
      }
    });
  };

  validatePwd = (rule, value, callback) => {
    console.log('validatePwd()', rule, value)
    if(!value) {
      callback('密码必须输入')
    } else if (value.length<4) {
      callback('密码长度不能小于4位')
    } else if (value.length>12) {
      callback('密码长度不能大于12位')
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback('密码必须是英文、数字或下划线组成')
    } else {
      callback() // 验证通过
    }
    // callback('xxxx') // 验证失败, 并指定提示的文本
  }

  render() {
        // 如果用户已经登陆, 自动跳转到管理界面
        const user = memoryUtils.user
        if(user && user._id) {
          return <Redirect to='/'/>
        }
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo" />
          <h1>React项目: 后台管理系统</h1>
        </header>
        <section className="login-content">
          <h2>用户登陆</h2>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item>
              {/*
              用户名/密码的的合法性要求
                1). 必须输入
                2). 必须大于等于4位
                3). 必须小于等于12位
                4). 必须是英文、数字或下划线组成
               */}
              {getFieldDecorator("username", {
                rules: [
                  { required: true, message: "Please input your username!" },
                  { min: 4, message: "用户名至少4位" },
                  { max: 12, message: "用户名最多12位" },
                  {
                    pattern: /^[a-zA-Z0-9_]+$/,
                    message: "用户名必须是英文、数字或下划线组成"
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="用户名"
                />
              )}
            </Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  {  validator: this.validatePwd }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="密码"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登陆
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }
}
const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(Login);
export default WrappedNormalLoginForm;
