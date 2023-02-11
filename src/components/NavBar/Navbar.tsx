import { IoLogOut, IoCloudUpload } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import "./navbar.css"

export const Navbar = () => {

  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 200);
    });
  }, []);


  const location = useLocation()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [POFmodalOpen, setPOFModalOpen] = useState(false);
  const [EditormodalOpen, setEditorModalOpen] = useState(false);
  const { Dragger } = Upload;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setEditorModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditorModalOpen(false);
  };

  const props: UploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (

    <header id="header" className={scroll ? "fixed-top d-flex align-items-center header-scrolled" : "fixed-top d-flex align-items-center header-transparent"}>
      <div className="container d-flex justify-content-between align-items-center">

        <div className="logo">
          <h1><a href="/"><span>WiJaMi</span></a></h1>
        </div>

        <nav className="navbar">
          <ul>
            <li><a href="/">Gallery</a></li>
            <li><a onClick={showModal}>Add Photo</a></li>
            <li><a onClick={() => setPOFModalOpen(true)}>Photo of the day</a></li>
            <li><a href="/login">Log In</a></li>
          </ul>
        </nav>

      </div>

      <Modal title="Upload your photo!" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Dragger {...props}>
            <p className="ant-upload-drag-icon"><InboxOutlined /></p>
            <p className="ant-upload-text">Click or drag file to this area to upload!</p>
            <p className="ant-upload-hint">Supported file extensions: .jpg and .png</p>
        </Dragger>
      </Modal>

      <Modal title="Edit your photo here!" open={EditormodalOpen} onOk={handleCancel} onCancel={handleCancel}>
            <p className="ant-upload-hint">tu bedzie jak sie dowiem co i jak</p>
      </Modal>

      <Modal
        centered
        open={POFmodalOpen}
        onCancel={() => setPOFModalOpen(false)}
        width={1000}
        footer={null}
        className="modalStyle"
      >
        <h2>This is your photo of the day ({new Date().toLocaleDateString()})!</h2>
        <img src="https://imgs.smoothradio.com/images/191589?width=1200&crop=16_9&signature=GRazrMVlAISqkcXrrNA6ku356R0="></img>
      </Modal>
      

    </header>

  )
}