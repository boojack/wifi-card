import React, { useState } from 'react'
import { Card, Form, Input, Layout, Space, Image, Button, Divider } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import qrcode from 'qrcode'
import './App.css'

interface AppProps {
  title: string
  desc: string
  wifiName: string
  wifiPasswd: string
  qrcode: string
}

const initialProps: AppProps = {
  title: '扫码连 WiFi',
  desc: '打开手机相机扫一扫，即可连上 WiFi',
  wifiName: '',
  wifiPasswd: '',
  qrcode: '',
}

function App() {
  const [props, setProps] = useState<AppProps>(initialProps)
  const [showEditor, setShowEditorStatus] = useState<Boolean>(true)

  const handleFormChange = async (values: AppProps) => {
    values = {
      ...props,
      ...values,
    }

    let url = ''
    if (values.wifiName.length > 0 && values.wifiPasswd.length >= 8) {
      url = await qrcode.toDataURL(
        `WIFI:T:WPA;S:${values.wifiName};P:${values.wifiPasswd};;`,
        {
          width: 360,
        }
      )
    }
    values.qrcode = url
    setProps(values)
  }

  const handlePrintBtnClick = () => {
    if (props.wifiName.length === 0 || props.wifiPasswd.length < 8) {
      window.alert('请输入正确的 WiFi 名称和密码！')
      return
    }

    setShowEditorStatus(false)
    setTimeout(() => {
      window.print()
      setShowEditorStatus(true)
    }, 0)
  }

  return (
    <>
      <Layout className="app-container" hasSider={false}>
        <h1>WiFi Card</h1>
        <Content>
          <Space
            className={`form-container ${showEditor ? '' : 'hidden'}`}
            align="center"
          >
            <Form onValuesChange={handleFormChange} initialValues={props}>
              <Form.Item label="标题" name="title">
                <Input placeholder="WiFi title"></Input>
              </Form.Item>
              <Form.Item label="描述" name="desc">
                <Input placeholder="WiFi description"></Input>
              </Form.Item>
              <Form.Item
                label="WiFi 名称"
                name="wifiName"
                rules={[{ required: true, message: '请输入 WiFi 名称！' }]}
              >
                <Input placeholder="WiFi name"></Input>
              </Form.Item>
              <Form.Item
                label="WiFi 密码"
                name="wifiPasswd"
                rules={[{ required: true, message: '请输入 WiFi 密码！' }]}
              >
                <Input placeholder="WiFi password"></Input>
              </Form.Item>
            </Form>
          </Space>
          <br />
          <Card title={props.title}>
            {props.qrcode ? (
              <Image src={props.qrcode} />
            ) : (
              <p>请输入正确的 WiFi 名称和密码！</p>
            )}
            <p>{props.desc}</p>
          </Card>
          <br />
          <Button
            type="primary"
            className={`${showEditor ? '' : 'hidden'}`}
            onClick={handlePrintBtnClick}
          >
            打印
          </Button>
        </Content>
      </Layout>
    </>
  )
}

export default App
