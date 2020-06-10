import React, { Component } from 'react';

import Modal from 'react-modal';
import './MyModal.css';


export default class MyModal extends Component<any,any> {
	constructor(props:any) {
		super(props);
		this.state = {
			isOpen: props.isOpen || false
		};
	}
	componentWillReceiveProps(nextProps:any) {
		if('isOpen' in nextProps) {
		  this.setState({
			isOpen: nextProps.isOpen
		  });
		}
  }
	render() {
		const {
			title,
			children,
			className,
			okText,
			cancelText,
			onOk,
			onCancel,
			maskClosable
		} = this.props;
		return (
			<div className={`mocal-container ${className}`}>
				<div className="modal-body">
					<div className={`modal-title`}>{title}</div>
                <div className="modal-content">{children}</div>
                <div className="modal-footer">
                  	<button className="ok-btn" onClick={onOk}>{okText}</button>
                  	<button className="cancel-btn" onClick={onCancel}>{cancelText}</button>
                </div>
				</div>
			</div>
		);
	}
}