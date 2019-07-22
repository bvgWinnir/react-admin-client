import React, { Component } from 'react'

import {
    Card,
    Table,
    Button,
    Icon,
    message,
    Modal
  } from 'antd'

import LinkButton from '../../components/link-button'
import ProductAdd from "../product/product-add-form";


export default class Product extends Component {

    state = { visible: false };

    showModal = () => {
        this.setState({
          visible: true,
        });
      };
    
      handleOk = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };
    
      handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };
    


      /*
  初始化Table所有列的数组
   */
  initColumns = () => {
    this.columns = [
      {
        title: '分类的名称',
        dataIndex: 'name', // 显示数据对应的属性名
      },
      {
        title: '操作',
        width: 300,
        render: (category) => ( // 返回需要显示的界面标签
          <span>
            <LinkButton 
            // onClick={() => this.showUpdate(category)}
            >修改分类</LinkButton>
            {/*如何向事件回调函数传递参数: 先定义一个匿名函数, 在函数调用处理的函数并传入数据*/}
            {/* {this.state.parentId==='0' ? <LinkButton onClick={() => this.showSubCategorys(category)}>查看子分类</LinkButton> : null} */}

          </span>
        )
      }
    ]
  }


  /*
  为第一次render()准备数据
   */
  componentWillMount () {
    this.initColumns()
  }


  showAdd=(event) =>{
       // </ProductAdd>
      /**
       * 点击时
       * 打开modal 对话框
       *    所以要传 值
       */
      console.log(event);
      
  }


    render() {
   // Card的右侧
   const extra = (
    <Button type='primary' onClick={(event)=>this.showAdd}>
      <Icon type='plus'/>
      添加
    </Button>
  )

        return (
            <div>
                <Card title='product_title' extra={extra}>
                    <Table
                    columns={this.columns} dataSource={data}
                    >
                        
                    </Table>
                    <Modal></Modal>
                </Card>
            </div>
        )
    }
}
const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
  