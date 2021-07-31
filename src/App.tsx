import React, { useState } from 'react'
import { Card, Form, Input, Layout, Image, Button, Switch, Divider } from 'antd'
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
  const [showEditor, setShowEditorStatus] = useState<boolean>(true)
  const [showWifiInfo, setShowWifiInfoStatus] = useState<boolean>(true)

  const handleFormChange = async (values: AppProps) => {
    values = {
      ...props,
      ...values,
    }

    let url = ''
    if (validWifiInfo()) {
      url = await qrcode.toDataURL(
        `WIFI:T:WPA;S:${values.wifiName};P:${values.wifiPasswd};;`,
        {
          width: window.innerWidth * 0.9,
        }
      )
    }
    values.qrcode = url
    setProps(values)
  }

  const handlePrintBtnClick = () => {
    if (!validWifiInfo()) {
      window.alert('请输入正确的 WiFi 名称和密码！')
      return
    }

    setShowEditorStatus(false)
    setTimeout(() => {
      window.print()
      setShowEditorStatus(true)
    }, 0)
  }

  const validWifiInfo = (): boolean => {
    if (props.wifiName.length === 0 || props.wifiPasswd.length < 8) {
      return false
    }
    return true
  }

  return (
    <>
      <Layout className="app-wrapper" hasSider={false}>
        <Content className="app-container">
          <Form
            className={`form-container ${showEditor ? '' : 'hidden'}`}
            onValuesChange={handleFormChange}
            initialValues={props}
            labelAlign="right"
            size="middle"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 20 }}
          >
            <h1>WiFi Card</h1>
            <Form.Item label="标题" name="title">
              <Input placeholder="WiFi title"></Input>
            </Form.Item>
            <Form.Item label="描述" name="desc">
              <Input.TextArea
                placeholder="WiFi description"
                autoSize={{ minRows: 3, maxRows: 5 }}
              />
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
            <Form.Item label="显示WiFi信息">
              <Switch
                checked={showWifiInfo}
                onChange={(checked: boolean) => setShowWifiInfoStatus(checked)}
              ></Switch>
            </Form.Item>
            <Form.Item label=" " colon={false}>
              <Button
                type="primary"
                className={`${showEditor ? '' : 'hidden'}`}
                onClick={handlePrintBtnClick}
                disabled={!validWifiInfo()}
              >
                打印
              </Button>
            </Form.Item>
          </Form>
          <Card className="wifi-card-container" title={props.title}>
            {props.qrcode ? (
              <Image src={props.qrcode} preview={false} />
            ) : (
              <p>请输入正确的 WiFi 名称和密码！</p>
            )}
            {showWifiInfo ? (
              <>
                <p>Wifi 名称：{props.wifiName}</p>
                <p>Wifi 密码：{props.wifiPasswd}</p>
                <Divider></Divider>
              </>
            ) : null}
            <p>{props.desc}</p>
          </Card>
          <br />
        </Content>
      </Layout>
    </>
  )
}

export default App
