<?php
namespace app\index\controller;

use think\Controller;

class Contact extends Common
{
    public function index()
    {
        $cate=db("cate")->where(["id"=>145])->find();
        $this->assign(
            array(
                "nav_index"=>5,
                "content"=>$cate["content"],
                "title"=>$cate["title"],
                "keywords"=>$cate["keywords"],
                "description"=>$cate["desc"],
            )
        );
        return view("page/contact");
    }
}
