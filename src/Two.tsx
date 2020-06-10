import React, { Component } from 'react';
 
import MyAlert from "./MyAlert";
 
class Two extends Component<any,any> {
	constructor(props: any){
		super(props);
		this.state = {
			num:1
		};
	}
	
 
	open=()=>{
		MyAlert.open({
			alertTip:"这是一个测试弹框",
			closeMyAlert:function(){
				console.log("关闭了...");
			}
		});
	}
  render() {
    return (
       <div className="Two">
        	Two
		<button onClick={this.open}>
			 开启宝藏
		</button>
        	<div>{this.state.num}</div>
       </div>
    );
  }
}
 
export default Two;