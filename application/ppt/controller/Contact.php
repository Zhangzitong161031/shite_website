<?php
namespace app\ppt\controller;


class Contact extends Common
{
    public function index()
    {
        $cate=db("cate")->where(["id"=>280])->find();
        $this->assign(
            array(
                "content"=>$cate["content"],
                "title"=>$cate["title"],
                "keywords"=>$cate["keywords"],
                "description"=>$cate["desc"],
            )
        );
        return view("page/contact");
    }
}