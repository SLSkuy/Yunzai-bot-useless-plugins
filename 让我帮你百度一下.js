import plugin from '../../lib/plugins/plugin.js'
import fetch from "node-fetch";
import{segment}from'oicq'
import cfg from '../../lib/config/config.js'


let bot_at=false //是否需要艾特机器人才能触发
export class example extends plugin {
    constructor() {
        super({
            name: '让我帮你百度一下',
            dsc: '将提出的问题通过转码，结合让我帮你百度一下网站，返还给提出问题的人链接，打开链接便是让我帮你百度一下网站并会输入提出的问题',
            event: 'message',
            priority: 1, //优先级 数字越小越高
            rule: [
                {
                    reg: "^百度([^百度].*)$", //匹配关键词
                    fnc: 'cai'
                }
            ]
        })
    }

    async cai (e){
        if(e.user_id==cfg.qq || (e.at && e.at!=cfg.qq && bot_at)) {
            return;
        }
            var  input_list ;
            var url = 'https://btfy.ur1.fun/?q=';
            const encoder = new TextEncoder();     
            input_list = e.toString().split("百度");
            const utf8Array = encoder.encode(input_list[1]);       //这边输入通过QQ获取的聊天信息
            const input = btoa(String.fromCharCode(...utf8Array));
            e.reply([segment.at(e.user_id) ,`你百度的内容：${url}${input}`])
        


    }
}