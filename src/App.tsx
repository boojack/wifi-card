import React, { FormEvent, useState } from 'react'
import { Button, Form, Input, Row } from 'antd'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    console.log(e)
  }

  return (
    <div className="App">
      <Row>Wifi Card</Row>
      <Row>
        <Form onSubmitCapture={handleFormSubmit}>
          <Form.Item>
            <Input placeholder="WiFi name"></Input>
          </Form.Item>
          <Form.Item>
            <Input placeholder="WiFi password"></Input>
          </Form.Item>
          <Form.Item>
            <Button>确定</Button>
          </Form.Item>
        </Form>
      </Row>
      <p>
        <Button type="primary" onClick={() => setCount((count) => count + 1)}>
          count is: {count}
        </Button>
      </p>
    </div>
  )
}

export default App
