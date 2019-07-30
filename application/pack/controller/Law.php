<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/6/30 0030
 * Time: 下午 7:43
 */

namespace app\pack\controller;

class Law extends Common
{
    public function _initialize(){
        parent::_initialize();
    }
    public function detail($id){
        $links=db("link")->select();
        $this->assign("links",$links);
        $law=db("law")->find($id);
        $next_law=db("law")->where(["id"=>["gt",$id]])->order("id asc")->limit(1)->find();
        $pre_law=db("law")->where(["id"=>["lt",$id]])->order("id desc")->limit(1)->find();
        $this->assign(array(
            "title"=>$law["title"],
            "keywords"=>$law["keywords"],
            "description"=>$law["description"],
            "law"=>$law,
            "next_law"=>$next_law,
            "pre_law"=>$pre_law
        ));
        return view();
    }
}