var g=Object.defineProperty;var l=a=>g(a,"__esModule",{value:!0});var i=(a,e)=>{for(var t in e)g(a,t,{get:e[t],enumerable:!0})};l(exports);i(exports,{EVENTS:()=>o,default:()=>r});var o={READY:"ready"},r=class{constructor(e){this.ready=()=>this.adapter.ready();this.adapter=e.adapter,this.strategy=e.strategy,this.isReady=!1,this.adapter.once(o.READY,()=>{this.isReady=!0})}isEnabled(e){var t;return((t=this.adapter.getFlag(e))==null?void 0:t.isEnabled)||!1}getFlag(e){return this.adapter.getFlag(e)}start(){return this.adapter.start(this.strategy)}stop(){return this.adapter.stop(this.strategy)}};
