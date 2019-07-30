<?php
namespace app\pack\controller;

use think\Controller;

class Contact extends Common
{
    public function _initialize(){
        parent::_initialize();
    }
    public function index()
    {
        $links=db("link")->select();
        $cate=db("cate")->where(["id"=>278])->find();
        $this->assign(
            array(
                "nav_index"=>5,
                "content"=>$cate["content"],
                "title"=>$cate["title"],
                "keywords"=>$cate["keywords"],
                "description"=>$cate["desc"],
            )
        );
        $this->assign("links",$links);
        return view();
    }
}
